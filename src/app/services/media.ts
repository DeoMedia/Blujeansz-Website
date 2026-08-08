import { supabase } from "../lib/supabase";
import { unwrap, ServiceError } from "./shared";
import type { MediaAsset } from "../types/database";

const BUCKET = "media";
const MAX_BYTES = 10 * 1024 * 1024; // Must match the bucket's file_size_limit.
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const;

export const ACCEPT_ATTRIBUTE = ALLOWED_TYPES.join(",");

/**
 * Validates before uploading so the user gets an immediate, specific message
 * rather than a generic storage rejection after a slow upload.
 */
export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    return `${file.name}: only JPG, PNG and WebP images are allowed.`;
  }
  if (file.size > MAX_BYTES) {
    return `${file.name}: file is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 10 MB.`;
  }
  return null;
}

/** Reads pixel dimensions client-side so they can be stored alongside the file. */
function readDimensions(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };

    image.src = url;
  });
}

/** Collision-proof object key that keeps the original name readable. */
function buildStoragePath(fileName: string): string {
  const cleaned = fileName
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-");

  const now = new Date();
  const folder = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`;

  return `${folder}/${crypto.randomUUID()}-${cleaned}`;
}

/**
 * Uploads to Storage, then records the asset. If the metadata insert fails
 * (e.g. RLS), the uploaded object is removed so Storage does not accumulate
 * files with no corresponding row.
 */
export async function uploadMedia(
  file: File,
  profileId: string,
  meta?: { altText?: string; caption?: string },
): Promise<MediaAsset> {
  const validationError = validateFile(file);
  if (validationError) throw new ServiceError(validationError);

  const storagePath = buildStoragePath(file.name);
  const dimensions = await readDimensions(file);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    throw new ServiceError(`Upload failed: ${uploadError.message}`, uploadError);
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

  try {
    return unwrap(
      await supabase
        .from("media_assets")
        .insert({
          file_name: file.name,
          storage_path: storagePath,
          public_url: urlData.publicUrl,
          mime_type: file.type,
          file_size: file.size,
          width: dimensions?.width ?? null,
          height: dimensions?.height ?? null,
          alt_text: meta?.altText ?? null,
          caption: meta?.caption ?? null,
          uploaded_by: profileId,
        })
        .select()
        .single(),
      "uploadMedia",
    );
  } catch (error) {
    await supabase.storage.from(BUCKET).remove([storagePath]);
    throw error;
  }
}

export async function listMedia(limit = 100): Promise<MediaAsset[]> {
  const result = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return unwrap(result, "listMedia");
}

export async function updateMedia(
  id: string,
  changes: Pick<Partial<MediaAsset>, "alt_text" | "caption">,
): Promise<MediaAsset> {
  return unwrap(
    await supabase.from("media_assets").update(changes).eq("id", id).select().single(),
    "updateMedia",
  );
}

/** Removes the row and the underlying object together. */
export async function deleteMedia(asset: Pick<MediaAsset, "id" | "storage_path">): Promise<void> {
  const { error: rowError } = await supabase.from("media_assets").delete().eq("id", asset.id);
  if (rowError) throw new ServiceError(`deleteMedia: ${rowError.message}`, rowError);

  const { error: objectError } = await supabase.storage.from(BUCKET).remove([asset.storage_path]);
  if (objectError) {
    // The row is already gone; surface it but do not fail the caller's flow.
    console.warn("[media] row deleted but object remains:", objectError.message);
  }
}

/**
 * Structured article content.
 *
 * Article bodies are stored as a JSON array of blocks rather than raw HTML, so
 * nothing user-supplied is ever passed to dangerouslySetInnerHTML. Each block
 * maps to a fixed set of BLUJEANSZ typography classes in <ContentBlocks />,
 * which is what keeps database-driven articles visually identical to the
 * original hand-built pages.
 */

export type BlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "quote"
  | "pull_quote"
  | "bullet_list"
  | "numbered_list"
  | "divider"
  | "cta";

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
  /** "lead" renders the larger opening paragraph used at the top of articles. */
  variant?: "lead" | "default";
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
}

export interface ImageBlock {
  type: "image";
  url: string;
  alt: string;
  caption?: string;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

export interface PullQuoteBlock {
  type: "pull_quote";
  text: string;
}

export interface ListBlock {
  type: "bullet_list" | "numbered_list";
  items: string[];
}

export interface DividerBlock {
  type: "divider";
}

export interface CtaBlock {
  type: "cta";
  label: string;
  href: string;
  description?: string;
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | QuoteBlock
  | PullQuoteBlock
  | ListBlock
  | DividerBlock
  | CtaBlock;

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

/**
 * Narrows one unvalidated JSON value to a ContentBlock, or null if it does not
 * describe a block we know how to render.
 *
 * The database column is `jsonb` and editable by CMS users, so its shape is not
 * guaranteed by the type system — everything read out of it is checked here.
 */
function parseBlock(value: unknown): ContentBlock | null {
  if (!isRecord(value) || typeof value.type !== "string") return null;

  switch (value.type) {
    case "paragraph":
      if (!isNonEmptyString(value.text)) return null;
      return {
        type: "paragraph",
        text: value.text,
        variant: value.variant === "lead" ? "lead" : "default",
      };

    case "heading": {
      if (!isNonEmptyString(value.text)) return null;
      const level = value.level === 3 ? 3 : 2;
      return { type: "heading", level, text: value.text };
    }

    case "image":
      if (!isNonEmptyString(value.url)) return null;
      return {
        type: "image",
        url: value.url,
        alt: typeof value.alt === "string" ? value.alt : "",
        caption: isNonEmptyString(value.caption) ? value.caption : undefined,
      };

    case "quote":
      if (!isNonEmptyString(value.text)) return null;
      return {
        type: "quote",
        text: value.text,
        attribution: isNonEmptyString(value.attribution) ? value.attribution : undefined,
      };

    case "pull_quote":
      if (!isNonEmptyString(value.text)) return null;
      return { type: "pull_quote", text: value.text };

    case "bullet_list":
    case "numbered_list": {
      if (!Array.isArray(value.items)) return null;
      const items = value.items.filter(isNonEmptyString);
      if (items.length === 0) return null;
      return { type: value.type, items };
    }

    case "divider":
      return { type: "divider" };

    case "cta":
      if (!isNonEmptyString(value.label) || !isNonEmptyString(value.href)) return null;
      return {
        type: "cta",
        label: value.label,
        href: value.href,
        description: isNonEmptyString(value.description) ? value.description : undefined,
      };

    default:
      return null;
  }
}

/**
 * Converts a raw `jsonb` column into renderable blocks, dropping anything
 * malformed. A single bad block never takes down the page.
 */
export function parseContentBlocks(raw: unknown): ContentBlock[] {
  if (!Array.isArray(raw)) return [];

  const blocks: ContentBlock[] = [];
  for (const entry of raw) {
    const block = parseBlock(entry);
    if (block) blocks.push(block);
  }
  return blocks;
}

/** Rough reading time, used when an editor has not set one explicitly. */
export function estimateReadTime(blocks: ContentBlock[]): number {
  const WORDS_PER_MINUTE = 220;

  const words = blocks.reduce((total, block) => {
    switch (block.type) {
      case "paragraph":
      case "pull_quote":
        return total + block.text.split(/\s+/).length;
      case "heading":
        return total + block.text.split(/\s+/).length;
      case "quote":
        return total + block.text.split(/\s+/).length;
      case "bullet_list":
      case "numbered_list":
        return total + block.items.join(" ").split(/\s+/).length;
      default:
        return total;
    }
  }, 0);

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

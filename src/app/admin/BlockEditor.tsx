import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";
import type { BlockType, ContentBlock } from "../types/content";
import { inputClass } from "./components";

/**
 * Editor for structured article content.
 *
 * Blocks are edited as data, never as markup — the same shape the API stores
 * and the public renderer consumes, so what an editor builds here is exactly
 * what ships.
 */

const BLOCK_LABELS: Record<BlockType, string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  image: "Image",
  quote: "Quote",
  pull_quote: "Pull quote",
  bullet_list: "Bullet list",
  numbered_list: "Numbered list",
  divider: "Divider",
  cta: "Call to action",
};

function emptyBlock(type: BlockType): ContentBlock {
  switch (type) {
    case "heading":
      return { type: "heading", level: 2, text: "" };
    case "image":
      return { type: "image", url: "", alt: "" };
    case "quote":
      return { type: "quote", text: "" };
    case "pull_quote":
      return { type: "pull_quote", text: "" };
    case "bullet_list":
    case "numbered_list":
      return { type, items: [""] };
    case "divider":
      return { type: "divider" };
    case "cta":
      return { type: "cta", label: "", href: "" };
    default:
      return { type: "paragraph", text: "", variant: "default" };
  }
}

export function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}) {
  const update = (index: number, block: ContentBlock) => {
    const next = [...blocks];
    next[index] = block;
    onChange(next);
  };

  const remove = (index: number) => onChange(blocks.filter((_, i) => i !== index));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;

    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => (
        <div key={index} className="border border-gray-200 rounded-sm bg-white">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {BLOCK_LABELS[block.type]}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === blocks.length - 1}
                aria-label="Move down"
                className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Delete block"
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-3 space-y-2">
            <BlockFields block={block} onChange={(next) => update(index, next)} />
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-2 pt-2">
        {(Object.keys(BLOCK_LABELS) as BlockType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange([...blocks, emptyBlock(type)])}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-sm text-gray-600 hover:border-[#0B1C2C] hover:text-[#0B1C2C] transition-colors"
          >
            <Plus className="w-3 h-3" />
            {BLOCK_LABELS[type]}
          </button>
        ))}
      </div>
    </div>
  );
}

function BlockFields({
  block,
  onChange,
}: {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <>
          <textarea
            rows={4}
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            className={inputClass}
            placeholder="Paragraph text…"
          />
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={block.variant === "lead"}
              onChange={(e) =>
                onChange({ ...block, variant: e.target.checked ? "lead" : "default" })
              }
            />
            Lead paragraph (larger opening text)
          </label>
        </>
      );

    case "heading":
      return (
        <div className="flex gap-2">
          <select
            value={block.level}
            onChange={(e) =>
              onChange({ ...block, level: Number(e.target.value) === 3 ? 3 : 2 })
            }
            className={`${inputClass} w-24`}
          >
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
          <input
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            className={inputClass}
            placeholder="Heading text…"
          />
        </div>
      );

    case "pull_quote":
      return (
        <textarea
          rows={2}
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          className={inputClass}
          placeholder="Pull quote…"
        />
      );

    case "quote":
      return (
        <>
          <textarea
            rows={3}
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            className={inputClass}
            placeholder="Quote…"
          />
          <input
            value={block.attribution ?? ""}
            onChange={(e) => onChange({ ...block, attribution: e.target.value })}
            className={inputClass}
            placeholder="Attribution (optional)"
          />
        </>
      );

    case "image":
      return (
        <>
          <input
            value={block.url}
            onChange={(e) => onChange({ ...block, url: e.target.value })}
            className={inputClass}
            placeholder="Image URL, upload in Media, then paste the URL"
          />
          <input
            value={block.alt}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            className={inputClass}
            placeholder="Alt text (describe the image for screen readers)"
          />
          <input
            value={block.caption ?? ""}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            className={inputClass}
            placeholder="Caption (optional)"
          />
        </>
      );

    case "bullet_list":
    case "numbered_list":
      return (
        <>
          {block.items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => {
                  const items = [...block.items];
                  items[index] = e.target.value;
                  onChange({ ...block, items });
                }}
                className={inputClass}
                placeholder={`Item ${index + 1}`}
              />
              <button
                type="button"
                onClick={() =>
                  onChange({ ...block, items: block.items.filter((_, i) => i !== index) })
                }
                disabled={block.items.length === 1}
                aria-label="Remove item"
                className="px-2 text-gray-400 hover:text-red-600 disabled:opacity-30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({ ...block, items: [...block.items, ""] })}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            + Add item
          </button>
        </>
      );

    case "cta":
      return (
        <>
          <input
            value={block.label}
            onChange={(e) => onChange({ ...block, label: e.target.value })}
            className={inputClass}
            placeholder="Button label"
          />
          <input
            value={block.href}
            onChange={(e) => onChange({ ...block, href: e.target.value })}
            className={inputClass}
            placeholder="Link (e.g. /contact)"
          />
          <input
            value={block.description ?? ""}
            onChange={(e) => onChange({ ...block, description: e.target.value })}
            className={inputClass}
            placeholder="Supporting text (optional)"
          />
        </>
      );

    case "divider":
      return <p className="text-xs text-gray-400 italic">A horizontal rule. Nothing to set.</p>;

    default:
      return null;
  }
}

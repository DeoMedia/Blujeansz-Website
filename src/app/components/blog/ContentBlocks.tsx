import type { ContentBlock } from "../../types/content";

/**
 * Renders structured article content.
 *
 * Every class here is lifted verbatim from the hand-built article pages
 * (CulturalTrends2026.tsx and siblings) so a database-driven article is
 * visually identical to the originals. If the article typography changes,
 * change it here — this is now the single definition of it.
 *
 * Nothing is rendered as HTML: blocks are validated data, so there is no
 * dangerouslySetInnerHTML anywhere in this path.
 */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph":
            return block.variant === "lead" ? (
              <p
                key={key}
                className="text-[22px] lg:text-[24px] leading-[1.6] text-gray-700 font-normal mb-8"
              >
                {block.text}
              </p>
            ) : (
              <p key={key} className="text-[18px] leading-[1.7] text-gray-700 mb-6">
                {block.text}
              </p>
            );

          case "heading":
            return block.level === 3 ? (
              <h3
                key={key}
                className="text-[22px] lg:text-[24px] font-bold text-[#0B1C2C] mt-12 mb-4"
              >
                {block.text}
              </h3>
            ) : (
              <h2
                key={key}
                className="text-[28px] lg:text-[32px] font-bold text-[#0B1C2C] mt-16 mb-6"
              >
                {block.text}
              </h2>
            );

          case "pull_quote":
            return (
              // Class string preserved from the original pages. Note that
              // `border-gradient-to-b` is not a real Tailwind utility and has
              // never had any effect — kept as-is so the rule renders in the
              // same default colour it always has.
              <div
                key={key}
                className="border-l-2 border-gradient-to-b from-blue-400 to-cyan-400 pl-6 my-12"
              >
                <p className="text-[20px] leading-[1.6] text-[#0B1C2C] font-medium">
                  {block.text}
                </p>
              </div>
            );

          case "quote":
            return (
              <blockquote key={key} className="border-l-2 border-gray-200 pl-6 my-12">
                <p className="text-[20px] leading-[1.6] text-[#0B1C2C] font-medium">
                  {block.text}
                </p>
                {block.attribution && (
                  <footer className="mt-3 text-sm text-gray-500">— {block.attribution}</footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure key={key} className="my-12">
                <img
                  src={block.url}
                  alt={block.alt}
                  loading="lazy"
                  className="w-full rounded-sm"
                />
                {block.caption && (
                  <figcaption className="mt-3 text-sm text-gray-500">{block.caption}</figcaption>
                )}
              </figure>
            );

          case "bullet_list":
            return (
              <ul key={key} className="list-disc pl-6 mb-6 space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[18px] leading-[1.7] text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "numbered_list":
            return (
              <ol key={key} className="list-decimal pl-6 mb-6 space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[18px] leading-[1.7] text-gray-700">
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "divider":
            return <div key={key} className="h-[1px] bg-black/5 my-16" />;

          case "cta":
            return (
              <div key={key} className="my-12 p-8 bg-gray-50 rounded-sm">
                {block.description && (
                  <p className="text-[18px] leading-[1.7] text-gray-700 mb-4">
                    {block.description}
                  </p>
                )}
                <a
                  href={block.href}
                  className="inline-flex items-center gap-2 bg-[#0B1C2C] text-white px-6 py-3 rounded-sm hover:bg-[#1a3a52] transition-colors"
                >
                  {block.label}
                </a>
              </div>
            );

          default:
            // parseContentBlocks drops unknown types, so this is unreachable —
            // it exists so adding a block type without a renderer is a compile
            // error rather than a blank space on the page.
            return null;
        }
      })}
    </>
  );
}

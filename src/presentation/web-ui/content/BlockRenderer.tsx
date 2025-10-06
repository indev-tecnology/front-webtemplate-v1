import { FileText, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; style: "ul" | "ol"; items: string[] }
  | { type: "image"; attachmentId: string; alt?: string; caption?: string }
  | { type: "attachment"; attachmentId: string; label?: string }
  | { type: "cta"; label: string; href: string };

interface BlockRendererProps {
  blocks: Block[];
  attachments?: Array<{ id: string; url: string; filename: string; contentType?: string }>;
}

export const BlockRenderer = ({ blocks, attachments = [] }: BlockRendererProps) => {
  const getAttachment = (id: string) => attachments.find((a) => String(a.id) === id);

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
            const styles = {
              1: "text-3xl font-bold text-neutral-900 mt-8 mb-4",
              2: "text-2xl font-semibold text-neutral-800 mt-6 mb-3",
              3: "text-xl font-medium text-neutral-700 mt-4 mb-2",
            };
            return (
              <Tag key={idx} className={styles[block.level]}>
                {block.text}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p key={idx} className="text-neutral-700 leading-relaxed">
                {block.text}
              </p>
            );

          case "list": {
            const ListTag = block.style === "ol" ? "ol" : "ul";
            const listClass = block.style === "ol"
              ? "list-decimal list-inside space-y-2 text-neutral-700"
              : "list-disc list-inside space-y-2 text-neutral-700";

            return (
              <ListTag key={idx} className={listClass}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ListTag>
            );
          }

          case "image": {
            const attachment = getAttachment(block.attachmentId);
            if (!attachment) return null;

            return (
              <figure key={idx} className="my-6">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-neutral-200">
                  <Image
                    src={attachment.url}
                    alt={block.alt || attachment.filename}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-sm text-neutral-600 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "attachment": {
            const attachment = getAttachment(block.attachmentId);
            if (!attachment) return null;

            return (
              <a
                key={idx}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border-2 border-neutral-200 hover:border-primary-500 hover:bg-primary-50/50 transition-all group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-neutral-900 group-hover:text-primary-700 transition-colors">
                    {block.label || attachment.filename}
                  </p>
                  {attachment.contentType && (
                    <p className="text-sm text-neutral-600">
                      {attachment.contentType}
                    </p>
                  )}
                </div>
                <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colors" />
              </a>
            );
          }

          case "cta":
            return (
              <Link
                key={idx}
                href={block.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
              >
                {block.label}
                <ExternalLink className="w-4 h-4" />
              </Link>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

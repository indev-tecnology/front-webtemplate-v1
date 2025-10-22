// presentation/web-ui/content/BlockRenderer.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Block } from '@/domain/shared/Block.type';
import type { Attachment } from '@/domain/shared/Attachment.interface';
import { cn } from '@/shared/cn';

interface BlockRendererProps {
  blocks: Block[];
  attachments?: Attachment[];
}

export function BlockRenderer({ blocks, attachments = [] }: BlockRendererProps) {
  const getAttachment = (attachmentId: string): Attachment | undefined => {
    return attachments.find((a) => a.id === attachmentId);
  };

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        switch (block.type) {
          case 'heading':
            const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
            return (
              <Tag key={key} className="font-bold text-neutral-900 mt-6 mb-3">
                {block.text}
              </Tag>
            );

          case 'paragraph':
            return (
              <p key={key} className="text-neutral-700 leading-relaxed mb-4">
                {block.text}
              </p>
            );

          case 'list':
            const ListTag = block.style === 'ul' ? 'ul' : 'ol';
            return (
              <ListTag key={key} className="mb-4 space-y-2 pl-6 list-disc">
                {block.items.map((item, i) => (
                  <li key={i} className="text-neutral-700">{item}</li>
                ))}
              </ListTag>
            );

          case 'image':
            const imgAttachment = getAttachment(block.attachmentId);
            if (!imgAttachment) return null;
            return (
              <figure key={key} className="my-8">
                <Image
                  src={imgAttachment.url}
                  alt={block.alt || 'Imagen'}
                  width={block.width || 1200}
                  height={block.height || 630}
                  className="rounded-lg"
                />
              </figure>
            );

          case 'attachment':
            const fileAttachment = getAttachment(block.attachmentId);
            if (!fileAttachment) return null;
            return (
              <a
                key={key}
                href={fileAttachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                {block.label || fileAttachment.name}
              </a>
            );

          case 'cta':
            return (
              <Link
                key={key}
                href={block.href}
                className="inline-block px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
              >
                {block.label}
              </Link>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

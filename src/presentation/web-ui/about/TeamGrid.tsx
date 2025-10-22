// presentation/web-ui/about/TeamGrid.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, Linkedin } from 'lucide-react';
import type { TeamMember } from '@/domain/entities/About';

interface TeamGridProps {
  title: string;
  description?: string;
  members: TeamMember[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function TeamGrid({ title, description, members }: TeamGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Grid de miembros */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200">
                {/* Foto */}
                <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                  {member.photo ? (
                    <Image
                      src={member.photo.url}
                      alt={member.photo.alt || member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200">
                      <span className="text-6xl font-bold text-brand-500">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Overlay con contacto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                          aria-label={`Email de ${member.name}`}
                        >
                          <Mail className="w-5 h-5 text-brand-600" />
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                          aria-label={`Teléfono de ${member.name}`}
                        >
                          <Phone className="w-5 h-5 text-brand-600" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                          aria-label={`LinkedIn de ${member.name}`}
                        >
                          <Linkedin className="w-5 h-5 text-brand-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-600 font-medium mb-3">
                    {member.position}
                  </p>
                  {member.bio && (
                    <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

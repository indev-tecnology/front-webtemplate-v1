"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FolderOpen } from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import type { AttachmentItem } from "@/presentation/web-ui/AttachmentGroup";

export interface DocumentGroupProps {
  title: string;
  documents: AttachmentItem[];
  defaultExpanded?: boolean;
  index?: number;
}

export const DocumentGroup = ({
  title,
  documents,
  defaultExpanded = true,
  index = 0,
}: DocumentGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border border-brand-100 bg-white rounded-lg overflow-hidden shadow-sm"
    >
      {/* Header desplegable con acento de color */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between gap-4 p-4 transition-all duration-200 ${
          isExpanded
            ? "bg-gradient-to-r from-brand-50 via-brand-50/50 to-transparent border-b border-brand-100"
            : "hover:bg-brand-50/30"
        }`}
        aria-expanded={isExpanded}
        aria-controls={`group-${title}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
            isExpanded
              ? "bg-brand-100 border-brand-200"
              : "bg-neutral-50 border-brand-100"
          }`}>
            <FolderOpen className={`w-5 h-5 transition-colors ${
              isExpanded ? "text-brand-700" : "text-brand-600"
            }`} />
          </div>
          <div className="text-left">
            <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {documents.length} documento{documents.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${
            isExpanded ? "text-brand-600" : "text-neutral-400"
          }`} />
        </motion.div>
      </button>

      {/* Contenido desplegable */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`group-${title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-b from-brand-50/10 to-transparent space-y-3">
              {documents.map((doc, docIndex) => (
                <DocumentCard key={doc.id} document={doc} index={docIndex} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default DocumentGroup;

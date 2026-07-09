"use client";

import { useState } from "react";

type Item = {
  name: string;
  role: string;
  detail: string;
};

export default function AccordionList({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    //border-y applies the border to both the top and bottom (y axis).
    // border-b applies the border only to the bottom.
    /*<div className="divide-y divide-neutral-800 border-y border-neutral-800">*/
    <div className="divide-y divide-neutral-800 border-b border-neutral-800">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.name}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left group"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-display text-base text-paper group-hover:text-gold transition-colors duration-200">
                  {item.name}
                </span>
                <span className="font-mono text-[11px] tracking-wide text-muted">
                  {item.role}
                </span>
              </span>
              <span
                className={`font-mono text-base text-goldDim transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>

            <div
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="pb-4 text-sm leading-relaxed text-muted max-w-[54ch]">
                  {item.detail}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

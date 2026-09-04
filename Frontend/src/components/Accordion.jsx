import { useId, useState } from "react";
import { PlusIcon, MinusIcon } from "./Icons";

/**
 * Accessible disclosure. Used for product Details / Shipping / Care and the FAQ.
 * The panel is height-animated via grid-template-rows, which avoids the jump
 * that max-height transitions produce on variable content.
 */
export function AccordionItem({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-espresso-100">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="text-[0.6875rem] uppercase tracking-label text-espresso-700">
            {title}
          </span>

          <span className="shrink-0 text-espresso-400 transition-colors duration-400 group-hover:text-champagne-dark">
            {isOpen ? <MinusIcon className="h-3.5 w-3.5" /> : <PlusIcon className="h-3.5 w-3.5" />}
          </span>
        </button>
      </h3>

      {/* grid-template-rows animates cleanly on variable-height content, and
          `visibility` keeps collapsed copy out of the tab order and the
          accessibility tree without cancelling the transition. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          visibility: isOpen ? "visible" : "hidden",
          transitionDelay: isOpen ? "0ms, 0ms" : "0ms, 600ms",
        }}
        className="grid transition-[grid-template-rows,visibility] duration-600 ease-editorial"
      >
        <div className="overflow-hidden">
          <div className="pb-6 pr-8 text-base leading-relaxed text-espresso-500">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** Renders a list of strings as the quiet bulleted copy used inside accordions. */
export function AccordionList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-champagne" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Accordion({ children, className = "" }) {
  return <div className={`border-t border-espresso-100 ${className}`}>{children}</div>;
}

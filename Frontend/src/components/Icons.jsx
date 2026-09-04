/**
 * Thin-stroke icon set. Every icon inherits `currentColor` and takes a
 * className so size and colour stay in the caller's control.
 *
 * Icons are decorative here — the interactive elements that wrap them carry
 * the accessible name (aria-label), so each svg is aria-hidden.
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="10.75" cy="10.75" r="6.75" />
      <path d="M15.8 15.8 L21 21" />
    </svg>
  );
}

export function UserIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c0-4.1 3.4-6.5 7.5-6.5s7.5 2.4 7.5 6.5" />
    </svg>
  );
}

export function BagIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M4.75 7.5h14.5l-1.1 12.25a1.5 1.5 0 0 1-1.5 1.25H7.35a1.5 1.5 0 0 1-1.5-1.25Z" />
      <path d="M9 7.5V6a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

export function HeartIcon({ className = "h-5 w-5", filled = false }) {
  return (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20.5C12 20.5 3.5 15.4 3.5 9.65A4.65 4.65 0 0 1 12 7.1a4.65 4.65 0 0 1 8.5 2.55C20.5 15.4 12 20.5 12 20.5Z" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 8h17M3.5 16h17" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h15.5M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12H4.5M10.5 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 9l7 7 7-7" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function MinusIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function PlusIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function StarIcon({ className = "h-3.5 w-3.5", filled = true }) {
  return (
    <svg {...base} className={className} fill={filled ? "currentColor" : "none"}>
      <path d="M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.9l6-.8Z" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function FilterIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 7h17M6.5 12h11M10 17h4" />
    </svg>
  );
}

export function TruckIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 10h4l3 3v2.5h-7z" />
      <circle cx="6.5" cy="18" r="1.75" />
      <circle cx="17" cy="18" r="1.75" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7 2.5v6c0 4.3-3 7.6-7 9.5-4-1.9-7-5.2-7-9.5v-6Z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

export function CertificateIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="M9 14.5L8 21l4-2 4 2-1-6.5" />
    </svg>
  );
}

export function SpinnerIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={`${className} animate-spin-slow`}>
      <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 20l2.2-7.4" />
      <path d="M8.9 11.2c0-2 1.6-3.6 3.6-3.6s3.2 1.3 3.2 3.1c0 2.2-1.3 3.9-3 3.9-.9 0-1.6-.6-1.4-1.4" />
    </svg>
  );
}

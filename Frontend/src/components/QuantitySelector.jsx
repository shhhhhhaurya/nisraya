import { MinusIcon, PlusIcon } from "./Icons";

/**
 * Quantity stepper. Bounded 1–10 because every piece is made by hand and we do
 * not want the interface implying unlimited stock.
 */
export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  label = "Quantity",
  className = "",
}) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className={`inline-flex items-center border border-espresso-100 ${className}`}>
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="flex h-11 w-11 items-center justify-center text-espresso-600 transition-colors duration-400 hover:bg-cream disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <MinusIcon />
      </button>

      <span
        className="min-w-[2.5rem] text-center text-sm tabular-nums text-espresso-700"
        aria-live="polite"
        aria-label={`${label}: ${value}`}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="flex h-11 w-11 items-center justify-center text-espresso-600 transition-colors duration-400 hover:bg-cream disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <PlusIcon />
      </button>
    </div>
  );
}

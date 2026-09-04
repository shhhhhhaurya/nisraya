import { useState } from "react";
import { LotusMark } from "./BrandMark";

export default function Image({
  src,
  alt = "",
  ratio = "aspect-editorial",
  className = "",
  imgClassName = "",
  position = "center",
  sizes,
  eager = false,
  hoverZoom = false,
  overlay = null,
  children,
}) {
  const [status, setStatus] = useState(src ? "loading" : "error");

  

  const failed = status === "error";

  return (
    <div
      className={`relative overflow-hidden bg-cream ${ratio} ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          draggable="false"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          style={{ objectPosition: position }}
          className={[
            "h-full w-full object-cover",
            "transition-all duration-1200 ease-editorial",
            status === "loaded"
              ? "opacity-100 scale-100"
              : "opacity-100 scale-100",
            hoverZoom ? "group-hover:scale-[1.06]" : "",
            imgClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-espresso-700 text-champagne/45"
          role="img"
          aria-label={alt || "Image unavailable"}
        >
          <LotusMark className="h-10 w-10" strokeWidth={4} />

          <span className="px-6 text-center text-2xs tracking-label text-ivory/35">
            NISRAYA
          </span>
        </div>
      )}

      {overlay}
      {children}
    </div>
  );
}
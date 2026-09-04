import useInView from "../hooks/useInView";

/**
 * Wraps content so it rises gently into place the first time it is scrolled to.
 *
 * Kept deliberately plain: opacity + a short translate, ~1.2s, and only ever
 * once per element. Nesting these with staggered `delay` values is how the
 * editorial sections sequence themselves.
 */
export default function ScrollReveal({
  as: Tag = "div",
  children,
  className = "",
  delay = 0,
  y = 28,
  threshold = 0.15,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold });

  return (
    <Tag
      ref={ref}
      className={`reveal-base ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transitionDelay: `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

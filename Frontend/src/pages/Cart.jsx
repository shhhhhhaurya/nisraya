import Image from "../components/Image";
import PageHeader from "../components/PageHeader";
import QuantitySelector from "../components/QuantitySelector";
import ScrollReveal from "../components/ScrollReveal";
import { CertificateIcon, ShieldIcon, TruckIcon } from "../components/Icons";
import { EmptyState } from "../components/StateBlocks";
import { Link } from "../lib/router";
import { formatINR } from "../lib/format";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function Cart() {
  const { items, count, subtotal, shipping, total, isEmpty, removeItem, updateQuantity } = useCart();
  const toast = useToast();

  const handleRemove = (item) => {
    removeItem(item.lineId);
    toast.push(`${item.name} removed from your bag.`);
  };

  if (isEmpty) {
    return (
      <>
        <PageHeader
          trail={[{ label: "Home", to: "/" }, { label: "Bag" }]}
          eyebrow="Your bag"
          title="Your bag."
        />

        <section className="bg-ivory pb-section">
          <div className="shell">
            <EmptyState
              title="Your bag is empty."
              description="Nothing here yet. The collections are a good place to start."
              actionLabel="Explore the collection"
              actionTo="/collections"
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        trail={[{ label: "Home", to: "/" }, { label: "Bag" }]}
        eyebrow="Your bag"
        title="Your bag."
        meta={`${count} ${count === 1 ? "piece" : "pieces"}`}
      />

      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Lines */}
            <div className="lg:col-span-7">
              <ul className="border-t border-espresso-100">
                {items.map((item) => (
                  <li
                    key={item.lineId}
                    className="grid grid-cols-[5.5rem_1fr] gap-5 border-b border-espresso-100 py-8 sm:grid-cols-[7.5rem_1fr] sm:gap-7"
                  >
                    <Link
                      to={`/product/${item.slug}`}
                      aria-label={item.name}
                      className="block transition-opacity duration-600 hover:opacity-85"
                    >
                      <Image src={item.image} alt={item.name} ratio="aspect-editorial" sizes="120px" />
                    </Link>

                    <div className="flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-2xs uppercase tracking-label text-taupe">
                            {item.categoryLabel}
                          </p>

                          <h2 className="mt-2 font-display text-xl leading-snug text-espresso-800">
                            <Link
                              to={`/product/${item.slug}`}
                              className="transition-colors duration-400 hover:text-champagne-dark"
                            >
                              {item.name}
                            </Link>
                          </h2>

                          <p className="mt-2 text-xs text-espresso-500">
                            {item.metal}
                            {item.size ? ` · Size ${item.size}` : ""}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm tabular-nums text-espresso-800">
                          {formatINR(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(next) => updateQuantity(item.lineId, next)}
                          label={`Quantity for ${item.name}`}
                        />

                        <button
                          type="button"
                          onClick={() => handleRemove(item)}
                          className="text-2xs uppercase tracking-label text-taupe transition-colors duration-400 hover:text-wine"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                to="/collections"
                className="mt-8 inline-block text-2xs uppercase tracking-label text-espresso-700"
              >
                <span className="link-draw">Continue shopping</span>
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5 lg:col-start-9">
              <ScrollReveal className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
                <div className="border border-espresso-100 bg-cream/50 px-7 py-8 sm:px-9">
                  <h2 className="text-2xs uppercase tracking-label text-espresso-700">
                    Order summary
                  </h2>

                  <dl className="mt-7 space-y-4 text-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-espresso-500">Subtotal</dt>
                      <dd className="tabular-nums text-espresso-800">{formatINR(subtotal)}</dd>
                    </div>

                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-espresso-500">Shipping</dt>
                      <dd className="tabular-nums text-espresso-800">
                        {shipping === 0 ? "Complimentary" : formatINR(shipping)}
                      </dd>
                    </div>

                    <div className="flex items-baseline justify-between gap-4 border-t border-espresso-100 pt-5">
                      <dt className="text-2xs uppercase tracking-label text-espresso-700">Total</dt>
                      <dd className="text-lg tabular-nums text-espresso-800">{formatINR(total)}</dd>
                    </div>
                  </dl>

                  <p className="mt-3 text-xs text-taupe">Inclusive of all taxes</p>

                  <Link to="/checkout" className="btn btn-dark mt-8 w-full">
                    Proceed to checkout
                  </Link>
                </div>

                <ul className="mt-8 space-y-3.5">
                  {[
                    { Icon: TruckIcon, text: "Complimentary insured shipping across India" },
                    { Icon: CertificateIcon, text: "Hallmarked with a certificate of authenticity" },
                    { Icon: ShieldIcon, text: "15-day returns on unworn pieces" },
                  ].map(({ Icon, text }) => (
                    <li key={text} className="flex items-center gap-3.5 text-xs text-espresso-500">
                      <Icon className="h-4 w-4 shrink-0 text-champagne-dark" />
                      {text}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

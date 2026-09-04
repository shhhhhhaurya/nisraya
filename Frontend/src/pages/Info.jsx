import Accordion, { AccordionItem } from "../components/Accordion";
import Image from "../components/Image";
import Newsletter from "../components/Newsletter";
import PageHeader from "../components/PageHeader";
import ScrollReveal from "../components/ScrollReveal";
import { LotusMark } from "../components/BrandMark";
import { InstagramIcon, } from "../components/Icons";
import { EmptyState } from "../components/StateBlocks";
import { Link, useParams } from "../lib/router";
import { IMAGES } from "../data/products";
import niyatiImage from "../assets/niyati.PNG";
import wbagImage from "../assets/wbag.png";
/**
 * /info/:topic — the pages the footer links to. Every footer link resolves to
 * real content here; nothing is a placeholder.
 */

const CONTACT_CHANNELS = [
  {
    label: "Write to us",
    value: "nisrayabyniyati@gmail.com",
    href: "mailto:nisrayabyniyati@gmail.com",
    note: "Answered within one working day.",
  },
  {
    label: "Call or WhatsApp",
    value: "+91 8115092479",
    href: "tel:+918115092479",
    note: "Monday to Saturday, 10am – 7pm IST.",
  },
];

const FAQS = [
  {
    q: "How long does a piece take to make?",
    a: "Ten to fourteen days for anything in the collections, because each piece is made after it is ordered. Bespoke commissions take four to six weeks. If you need something sooner, tell us the date and we will say honestly whether it is possible.",
  },
  {
    q: "Is the gold hallmarked?",
    a: "Yes. Every gold piece is 18K, BIS hallmarked, and stamped with the karatage and our maker's mark. Each order ships with a certificate stating metal weight, stone weight and clarity.",
  },
  {
    q: "Can I have a ring resized?",
    a: "Once, free, within the first year — most designs can move up or down two sizes. Eternity settings and hollow-formed bangles cannot be resized, and the product page says so before you buy.",
  },
  {
    q: "Do you take commissions?",
    a: "We take a small number each month, usually reworking inherited pieces. Send photographs and roughly what you have in mind, and we will tell you whether it is something we can do well.",
  },
  {
    q: "What if it does not suit me?",
    a: "Return it unworn within fifteen days for a full refund. Made-to-order and engraved pieces are the exception, which is noted at checkout.",
  },
  {
    q: "Do you ship outside India?",
    a: "Not yet. We ship across India with insured, signature-on-delivery courier. International shipping is planned; join the journal and we will say when it opens.",
  },
];

const CARE_SECTIONS = [
  {
    title: "Gold",
    lines: [
      "Warm water, a drop of unscented soap, a soft brush at the back of the setting where oils collect.",
      "Dry with a lint-free cloth before putting it away. Trapped moisture is what dulls a polish.",
      "Take it off before swimming — chlorine attacks the alloys, not the gold itself.",
    ],
  },
  {
    title: "Silver",
    lines: [
      "Tarnish is normal and reversible. A silver cloth restores the surface in a minute.",
      "Store in the pouch it arrived in, away from air. Silver darkens fastest in an open dish.",
      "Do not use tissue paper, which is abrasive enough to scratch a mirror finish.",
    ],
  },
  {
    title: "Pearls and soft stones",
    lines: [
      "Last on, first off. Perfume, hairspray and sunscreen all dull a pearl's lustre permanently.",
      "Wipe with a barely damp cloth after wearing. Never soak a strung piece — it weakens the silk.",
      "Have strands restrung every two years if you wear them often.",
    ],
  },
  {
    title: "Everyday",
    lines: [
      "Put jewellery on after moisturiser, not before.",
      "Take rings off before the gym. Most damage we repair is from weights, not accidents.",
      "Store pieces separately so nothing harder scratches something softer.",
    ],
  },
];

const SHIPPING_ROWS = [
  ["Made-to-order dispatch", "10–14 working days"],
  ["Metro delivery", "1–2 days after dispatch"],
  ["Rest of India", "3–5 days after dispatch"],
  ["Shipping cost", "Complimentary, fully insured"],
  ["Packaging", "Cloth pouch, lacquered box, unbranded outer carton"],
];

const RETURN_STEPS = [
  {
    step: "Tell us within 15 days",
    body: "Email hello@nisraya.com with your order number. No reason needed. The window runs from the day the piece is delivered, not the day it shipped.",
  },
  {
    step: "We arrange the pickup",
    body: "A courier collects from the delivery address at no cost to you, usually within two working days. Send the piece back in its box with the certificate.",
  },
  {
    step: "Refunded in 5–7 days",
    body: "Once the piece is inspected — we are checking it is unworn, nothing more — the full amount goes back to the original payment method.",
  },
];

const CRAFT_FIGURES = [
  ["01", "Handcrafted Piece"],
  ["1", "Original Design"],
  ["HUNDREDS", "OF HAND-SET BEADS"],
];

export default function Info() {
  const { topic } = useParams();

  const page = PAGES[topic];

  if (!page) {
    return (
      <div className="shell py-section">
        <EmptyState
          title="That page does not exist."
          description="The link may be out of date. Everything is reachable from the collections."
          actionLabel="Explore the collection"
          actionTo="/collections"
        />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        trail={[{ label: "Home", to: "/" }, { label: page.title }]}
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
      />

      {page.render()}
    </>
  );
}

/* ------------------------------------------------------------------- sections */

function Prose({ children, className = "" }) {
  return (
    <section className={`bg-ivory pb-section pt-12 lg:pt-16 ${className}`}>
      <div className="shell">
        <div className="max-w-prose">{children}</div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <>
      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <dl className="space-y-10">
                {CONTACT_CHANNELS.map((channel) => (
                  <div
                    key={channel.label}
                    className="border-t border-espresso-100 pt-6"
                  >
                    <dt className="text-2xs uppercase tracking-label text-taupe">
                      {channel.label}
                    </dt>

                    <dd className="mt-4">
                      <a
                        href={channel.href}
                        className="font-display text-2xl text-espresso-800 transition-colors duration-400 hover:text-champagne-dark"
                      >
                        {channel.value}
                      </a>

                      <p className="mt-3 text-xs text-espresso-500">
                        {channel.note}
                      </p>
                    </dd>
                  </div>
                ))}

                

                <div className="border-t border-espresso-100 pt-6">
                  <dt className="text-2xs uppercase tracking-label text-taupe">
                    Elsewhere
                  </dt>

                  <dd className="mt-5 flex items-center gap-6">
                    <a
                      href="https://www.instagram.com/shop.nisraya/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2.5 text-xs text-espresso-600 transition-colors duration-400 hover:text-champagne-dark"
                    >
                      <InstagramIcon className="h-4 w-4" />
                      Instagram
                    </a>

                   
                  </dd>
                </div>
              </dl>

              {/* No contact form: there is no endpoint to post one to, and a
                  form that silently goes nowhere is worse than an address. */}
              
            </div>

            <ScrollReveal
              delay={120}
              className="lg:col-span-6 lg:col-start-7"
            >
              <Image
                src={niyatiImage}
                alt="Niyati"
                ratio="aspect-editorial"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />

              <p className="mt-5 text-xs leading-relaxed text-taupe">
                
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

function CraftsmanshipPage() {
  return (
    <>
      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          <ScrollReveal>
            <Image
  src={wbagImage}
  alt="NISRAYA handcrafted bag"
  ratio="aspect-campaign"
  sizes="100vw"
/>
          </ScrollReveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-4">
              <dl className="space-y-8 lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
                {CRAFT_FIGURES.map(([figure, label]) => (
                  <div
                    key={label}
                    className="border-t border-espresso-100 pt-5"
                  >
                    <dt className="font-display text-4xl tabular-nums text-champagne-dark">
                      {figure}
                    </dt>
                    <dd className="mt-2 text-2xs uppercase tracking-label text-taupe">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>

            <ScrollReveal
              delay={120}
              className="space-y-6 text-base leading-loose text-espresso-500 lg:col-span-7 lg:col-start-6"
            >
              <p>
                This piece is made entirely by hand, with every surface 
                built slowly rather than produced as a uniform print.
                 Tiny beads are placed individually across the body, 
                 creating a richly textured field of colour that changes
                  subtly with the light.
              </p>

              <p>
                The design brings together jewel-toned beads in ruby, emerald,
                 sapphire and amber shades, framed by antique-gold detailing. 
                 Circular motifs and floral forms are worked into the surface,
                  giving the piece the character of something collected rather
                   than manufactured.
              </p>

              <p>
                The border is finished with rows of aged-gold metal discs and
                 fine beadwork, while the structured flap carries a delicate
                  arrangement of traditional-inspired motifs. Every small element
                   contributes to the sense of depth — nothing is completely flat,
                    and nothing feels overly polished.
              </p>

              <p>
                A fine gold-toned chain allows the piece to be carried as a shoulder
                 or crossbody bag. Its darker antique finish was chosen deliberately,
                  allowing the brighter beads to remain the focus while giving the 
                  entire piece a more heritage character.
              </p>

              <p>
                The result is deliberately expressive. It sits somewhere between
                 an accessory and a small piece of Indian craft — colourful, tactile
                  and slightly unexpected, designed to become more interesting the closer
                   you look.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-section">
        <div className="shell text-center">
          <ScrollReveal>
            <LotusMark className="mx-auto h-9 w-9 text-champagne" />

            <h2 className="mx-auto mt-8 max-w-xl font-display text-display-sm text-espresso-800">
              Have something reworked.
            </h2>

            <p className="mx-auto mt-6 max-w-md text-base leading-loose text-espresso-500">
              We take a few commissions each month, most often turning inherited
              pieces into something that gets worn.
            </p>

            <Link to="/info/contact" className="btn btn-dark mt-10">
              Talk to the atelier
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function JournalPage() {
  return (
    <>
      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-6">
              <Image
                src={IMAGES.philosophy}
                alt="A ring on a folded page in morning light"
                ratio="aspect-editorial"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </ScrollReveal>

            <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
              <ScrollReveal>
                <p className="eyebrow">The Journal</p>

                <h2 className="mt-6 font-display text-display-sm text-espresso-800">
                  Sent, not published.
                </h2>

                <div className="mt-7 space-y-5 text-base leading-loose text-espresso-500">
                  <p>
                    The journal goes out by email roughly once a month. It is
                    short: what came off the bench, where the stones came from,
                    and occasionally a piece of care advice that saves a
                    repair.
                  </p>

                  <p>
                    There is no archive to browse yet — the first issue reaches
                    subscribers before it reaches this page, and we would
                    rather say that than fill the space with articles we have
                    not written.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Newsletter tone="light" />
    </>
  );
}

function ShippingPage() {
  return (
    <>
      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          <div className="max-w-2xl">
            <dl className="divide-y divide-espresso-100 border-y border-espresso-100">
              {SHIPPING_ROWS.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 py-5 sm:grid-cols-2 sm:gap-6"
                >
                  <dt className="text-2xs uppercase tracking-label text-taupe">
                    {label}
                  </dt>
                  <dd className="text-sm text-espresso-700">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 space-y-5 text-base leading-loose text-espresso-500">
              <p>
                Every order ships insured for its full value and requires a
                signature. You will get a tracking link the moment it leaves
                the atelier, and a note from us the day before it is due.
              </p>

              <p>
                The outer carton is unbranded and does not state the contents,
                so a delivery left with a neighbour does not announce itself.
                Inside is a cloth pouch and a lacquered box.
              </p>

              <p>
                If a delivery goes wrong — delayed, damaged, refused — write to
                us before contacting the courier. The insurance is ours to
                claim, and it is faster if we do it.
              </p>
            </div>

            <div className="mt-12 border-t border-espresso-100 pt-8">
              <h2 className="text-2xs uppercase tracking-label text-espresso-700">
                Returns in short
              </h2>

              <p className="mt-4 text-base leading-loose text-espresso-500">
                Fifteen days, unworn, free pickup, full refund.{" "}
                <Link
                  to="/info/returns"
                  className="link-draw text-espresso-800"
                >
                  The full returns policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReturnsPage() {
  return (
    <>
      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          <ol className="max-w-2xl space-y-10">
            {RETURN_STEPS.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 110}>
                <li className="grid gap-4 border-t border-espresso-100 pt-6 sm:grid-cols-[3rem_1fr] sm:gap-8">
                  <span className="text-2xs tabular-nums tracking-label text-champagne-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="font-display text-2xl text-espresso-800">
                      {item.step}
                    </h2>
                    <p className="mt-3 text-base leading-loose text-espresso-500">
                      {item.body}
                    </p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>

          <div className="mt-16 max-w-2xl border-t border-espresso-100 pt-8">
            <h2 className="text-2xs uppercase tracking-label text-espresso-700">
              What cannot be returned
            </h2>

            <p className="mt-4 text-base leading-loose text-espresso-500">
              Engraved pieces, resized rings, and bespoke commissions, because
              none of them can be sold to anyone else. This is stated on the
              product page and again at checkout, before you pay — never after.
            </p>

            <h2 className="mt-10 text-2xs uppercase tracking-label text-espresso-700">
              Repairs and re-polishing
            </h2>

            <p className="mt-4 text-base leading-loose text-espresso-500">
              Separate from returns, and permanent. We re-polish, re-string
              and re-tip claws for as long as you own the piece. Manufacturing
              faults are free. Accidental damage is charged at cost, quoted
              before we start.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function CareGuidePage() {
  return (
    <>
      <section className="bg-ivory pb-section pt-12 lg:pt-16">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {CARE_SECTIONS.map((section, index) => (
                  <ScrollReveal
                    key={section.title}
                    delay={(index % 2) * 100}
                  >
                    <div className="border-t border-espresso-100 pt-6">
                      <h2 className="font-display text-2xl text-espresso-800">
                        {section.title}
                      </h2>

                      <ul className="mt-5 space-y-3.5">
                        {section.lines.map((line) => (
                          <li
                            key={line}
                            className="flex gap-3 text-base leading-relaxed text-espresso-500"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 h-px w-3 shrink-0 bg-champagne"
                            />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-14 border-t border-espresso-100 pt-8">
                <h2 className="text-2xs uppercase tracking-label text-espresso-700">
                  Ring sizing
                </h2>

                <p className="mt-4 max-w-prose text-base leading-loose text-espresso-500">
                  Measure at the end of the day, when fingers are at their
                  largest, and measure the same finger on the same hand three
                  times. If you land between two sizes, take the larger — a
                  ring that spins is comfortable, a ring that sticks is not.
                  We resize once free within the first year on any design that
                  can take it.
                </p>
              </div>
            </div>

            <ScrollReveal
              delay={140}
              className="lg:col-span-5 lg:col-start-9"
            >
              <Image
                src={IMAGES.signatureSmall}
                alt="A cloth and polishing tools beside a gold bangle"
                ratio="aspect-portrait"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />

              <p className="mt-5 text-xs leading-relaxed text-taupe">
                Every order arrives with a polishing cloth. Use it before you
                think you need to.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqsPage() {
  return (
    <Prose>
      <Accordion>
        {FAQS.map((item, index) => (
          <AccordionItem
            key={item.q}
            title={item.q}
            defaultOpen={index === 0}
          >
            <p>{item.a}</p>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="mt-12 text-base leading-loose text-espresso-500">
        Anything else,{" "}
        <Link
          to="/info/contact"
          className="link-draw text-espresso-800"
        >
          write to us
        </Link>
        . A person reads every email.
      </p>
    </Prose>
  );
}

/* --------------------------------------------------------------------- routes */

const PAGES = {
  craftsmanship: {
    eyebrow: "Craftsmanship",
    title: "How is it made.",
    intro:
      "Forty pieces a month, eight people, one bench in Jaipur. What that actually involves.",
    render: () => <CraftsmanshipPage />,
  },

  journal: {
    eyebrow: "The Journal",
    title: "The NISRAYA Journal.",
    intro: "What came off the bench, once a month, by email.",
    render: () => <JournalPage />,
  },

  contact: {
    eyebrow: "Contact",
    title: "Talk to us.",
   
    render: () => <ContactPage />,
  },

  shipping: {
    eyebrow: "Shipping",
    title: "Shipping.",
    intro:
      "Insured, signature on delivery, complimentary across India.",
    render: () => <ShippingPage />,
  },

  returns: {
    eyebrow: "Returns",
    title: "Returns.",
    intro:
      "Fifteen days, unworn, no reason needed, free pickup.",
    render: () => <ReturnsPage />,
  },

  "care-guide": {
    eyebrow: "Care",
    title: "Care guide.",
    intro:
      "Jewellery is meant to be worn. A few minutes of care is what lets it be worn for decades.",
    render: () => <CareGuidePage />,
  },

  faqs: {
    eyebrow: "Help",
    title: "Frequently asked.",
    intro: "Making, metal, sizing, returns and shipping.",
    render: () => <FaqsPage />,
  },
};
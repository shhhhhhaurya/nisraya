import Image from "../components/Image";
import ScrollReveal from "../components/ScrollReveal";
import { LotusMark } from "../components/BrandMark";
import { Link } from "../lib/router";
import { IMAGES } from "../data/products";

const VALUES = [
  {
    title: "Made to order",
    body: "Nothing is mass produced. Each piece begins after it is ordered, which is slower, and the reason the finish holds.",
  },
  {
    title: "Honest metal",
    body: "18K gold, platinum and sterling silver, hallmarked and stamped. The weight on the label is the weight in your hand.",
  },
  {
    title: "One atelier",
    body: "Every piece is cut, set and polished by the same eight people in Jaipur. We know who made yours.",
  },
  {
    title: "Kept, not replaced",
    body: "We re-polish, re-size and restring for as long as you own the piece. Bring it back in ten years.",
  },
];

const CRAFT_STEPS = [
  {
    step: "Drawing",
    body: "Niyati draws by hand before anything is modelled. A piece earns its way to wax only if it still reads well at actual size.",
  },
  {
    step: "Setting",
    body: "Stones are chosen in daylight, in pairs, for how they sit beside each other rather than how they grade on paper.",
  },
  {
    step: "Finishing",
    body: "Three stages of polish, the last one by thumb. It is the step nobody sees and the only one you can feel.",
  },
];

export default function OurStory() {
  return (
    <>
      {/* Editorial opening — image first, no masthead, so the page reads as a story */}
      <section className="relative">
        <div className="relative h-[68vh] min-h-[26rem] w-full overflow-hidden lg:h-[82vh]">
          <div className="absolute inset-0">
            <Image
              src={IMAGES.storyHero}
              alt="A necklace resting on linen in afternoon light"
              ratio="h-full w-full"
              position="center"
              eager
              sizes="100vw"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/10"
          />

          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-14 lg:pb-20">
              <ScrollReveal>
                <p className="eyebrow eyebrow-light">Our story</p>

                <h1 className="mt-7 max-w-3xl font-display text-display-lg text-ivory">
                  It started with one <em className="text-champagne">unworn</em> necklace.
                </h1>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* The story */}
      <section className="bg-ivory py-section">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-4">
              <p className="text-lg leading-relaxed text-espresso-700 lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
                Niyati grew up around jewellery that was too precious to wear. It lived in a
                locker, came out twice a year, and went back in.
              </p>
            </ScrollReveal>

            <ScrollReveal
              delay={120}
              className="space-y-6 text-base leading-loose text-espresso-500 lg:col-span-7 lg:col-start-6"
            >
              <p>
                NISRAYA began as an argument with that idea. If a piece is beautiful, it should be
                in daylight, on a wrist, at a desk, at dinner — not waiting for an occasion that
                keeps getting postponed. So the brief was narrow from the start: make jewellery
                light enough to forget you are wearing, and considered enough that you notice it
                again a year later.
              </p>

              <p>
                That constraint shaped everything. Settings sit lower. Clasps are flat so a
                necklace lies properly under a collar. Hoops are hollow-formed, which is harder to
                make and the reason you can wear them all day. The gold is 18K rather than 22K, not
                to save cost but because it holds a shape that thinner, softer alloys give up.
              </p>

              <p>
                The forms borrow from Indian jewellery without quoting it. A jhumka becomes a
                weighted drop with the fringe taken away. A kada loses its ornament and keeps its
                proportion. What remains is recognisably ours and quiet enough to belong to whoever
                is wearing it, which is the point.
              </p>

              <p className="border-l border-champagne pl-6 font-display text-xl italic leading-relaxed text-espresso-700">
                “I wanted to make the piece someone reaches for on an ordinary Tuesday.”
              </p>

              <p className="text-2xs uppercase tracking-label text-taupe">
                Niyati — founder
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-cream py-section">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-6">
              <Image
                src={IMAGES.storyCraft}
                alt="A jeweller setting a stone at the bench"
                ratio="aspect-editorial"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
            </ScrollReveal>

            <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
              <ScrollReveal>
                <p className="eyebrow">Craftsmanship</p>

                <h2 className="mt-6 font-display text-display-md text-espresso-800">
                  Eight people, <br />
                  one bench.
                </h2>

                <p className="mt-7 text-base leading-loose text-espresso-500">
                  Our atelier in Jaipur makes roughly forty pieces a month. That number is a
                  decision, not a limitation — it is how many pieces can pass through the same
                  hands without the finish slipping.
                </p>
              </ScrollReveal>

              <dl className="mt-11 space-y-9">
                {CRAFT_STEPS.map((item, index) => (
                  <ScrollReveal key={item.step} delay={index * 110}>
                    <div className="border-t border-espresso-100 pt-6">
                      <dt className="text-2xs uppercase tracking-label text-espresso-700">
                        {item.step}
                      </dt>
                      <dd className="mt-3 text-base leading-loose text-espresso-500">{item.body}</dd>
                    </div>
                  </ScrollReveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory py-section">
        <div className="shell">
          <ScrollReveal className="max-w-2xl">
            <LotusMark className="h-9 w-9 text-champagne" />

            <h2 className="mt-8 font-display text-display-md text-espresso-800">
              What we hold to.
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:gap-x-16">
            {VALUES.map((value, index) => (
              <ScrollReveal key={value.title} delay={(index % 2) * 100}>
                <div className="border-t border-espresso-100 pt-7">
                  <span className="text-2xs tabular-nums tracking-label text-champagne-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-5 font-display text-2xl text-espresso-800">{value.title}</h3>

                  <p className="mt-4 max-w-sm text-base leading-loose text-espresso-500">
                    {value.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.storyValues}
            alt=""
            ratio="h-full w-full"
            position="center"
            sizes="100vw"
          />
        </div>

        <div aria-hidden="true" className="absolute inset-0 bg-ink/70" />

        <div className="relative shell py-section-lg text-center">
          <ScrollReveal>
            <h2 className="mx-auto max-w-2xl font-display text-display-md text-ivory">
              Come and see them in daylight.
            </h2>

            <p className="mx-auto mt-7 max-w-md text-base leading-loose text-sand">
              The atelier is open by appointment, Tuesday to Saturday. Or write to us and we will
              send photographs the same day.
            </p>

            <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
              <Link to="/collections" className="btn btn-gold">
                Explore the collection
              </Link>

              <Link to="/info/contact" className="btn btn-outline-light">
                Book an appointment
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

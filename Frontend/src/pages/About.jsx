import { Link } from "../lib/router";
import aboutHero from "../assets/product-4.png";
import aboutPhilosophy from "../assets/product-3.png";
import aboutLucknow from "../assets/product-2.png";

export default function About() {
  return (
    <main className="min-h-screen bg-ivory text-espresso-900">

      {/* HERO */}
      <section className="relative flex min-h-[85svh] items-end overflow-hidden bg-espresso-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${aboutHero})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-900 via-espresso-900/55 to-transparent" />
        </div>

        <div className="relative z-10 shell pb-20 pt-40 lg:pb-28">
          <p className="eyebrow eyebrow-light">
            About NISRAYA
          </p>

          <h1 className="mt-6 max-w-4xl font-display text-display-xl font-light leading-[0.92] text-ivory">
            Jewelry that becomes
            <br />
            <em className="text-champagne">part of you.</em>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-loose text-ivory/70">
            Born in Lucknow. Created by Niyati.
            A contemporary jewellery house shaped by Indian sensibility,
            quiet elegance, and the beauty of things made with intention.
          </p>
        </div>
      </section>


      {/* INTRODUCTION */}
      <section className="shell py-24 sm:py-32 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

          <div>
            <p className="eyebrow">
              The beginning
            </p>

            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-espresso-900/45">
              NISRAYA — BY NIYATI
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl font-display text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              A quiet expression of
              <em className="text-champagne-dark"> Indian elegance.</em>
            </h2>

            <div className="mt-10 max-w-2xl space-y-6 text-base leading-loose text-espresso-900/65">
              <p>
                NISRAYA was created by Niyati from a love for jewellery
                that feels personal — pieces that don't simply complete
                an outfit, but quietly become part of the moments we remember.
              </p>

              <p>
                Born in Lucknow, NISRAYA draws from the city's understated
                elegance, its appreciation for detail, and the beauty of
                things made with intention.
              </p>

              <p>
                The brand brings that sensibility into contemporary jewellery,
                creating pieces that feel refined yet effortless, modern yet
                deeply connected to the spirit of India.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* IMAGE + PHILOSOPHY */}
      <section className="bg-espresso-900 text-ivory">
        <div className="grid lg:grid-cols-2">

          <div className="relative min-h-[65vh] overflow-hidden">
            <img
              src={aboutPhilosophy}
              alt="NISRAYA jewellery"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 to-transparent" />
          </div>

          <div className="flex items-center px-8 py-24 sm:px-14 lg:px-20 xl:px-28">
            <div className="max-w-xl">

              <p className="eyebrow eyebrow-light">
                Our philosophy
              </p>

              <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl">
                Less noise.
                <br />
                <em className="text-champagne">More meaning.</em>
              </h2>

              <div className="mt-10 space-y-6 text-base leading-loose text-ivory/65">
                <p>
                  We believe jewellery doesn't always need to be bold
                  to be memorable.
                </p>

                <p>
                  Sometimes, it is the delicate necklace worn every day,
                  the ring chosen for a meaningful occasion, or the earrings
                  that become yours over time.
                </p>

                <p>
                  Each NISRAYA piece is designed with this thought in mind —
                  to be worn, lived in, and remembered.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* NIYATI STORY */}
      <section className="shell py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-5xl text-center">

          <p className="eyebrow">
            The Niyati story
          </p>

          <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
            A vision built around
            <br />
            <em className="text-champagne-dark">beautiful details.</em>
          </h2>

          <div className="mx-auto mt-10 max-w-3xl space-y-6 text-base leading-loose text-espresso-900/65">
            <p>
              NISRAYA is, at its heart, Niyati's vision.
            </p>

            <p>
              What began with an appreciation for beautiful details grew
              into a desire to create jewellery that carries emotion without
              feeling excessive.
            </p>

            <p>
              Her approach is simple: thoughtful design, timeless silhouettes,
              and pieces that allow the person wearing them to remain at the centre.
            </p>

            <p>
              From Lucknow, Niyati is building NISRAYA as a jewellery house
              where Indian inspiration meets contemporary elegance —
              quietly, intentionally, and one piece at a time.
            </p>
          </div>

        </div>
      </section>


      {/* VALUES */}
      <section className="border-y border-espresso-900/10 bg-[#f4eee6]">
        <div className="shell py-20 sm:py-28">

          <div className="mb-14 max-w-xl">
            <p className="eyebrow">
              What guides us
            </p>

            <h2 className="mt-5 font-display text-4xl font-light sm:text-5xl">
              Made for the moments
              <br />
              <em className="text-champagne-dark">that matter.</em>
            </h2>
          </div>

          <div className="grid border-t border-espresso-900/10 sm:grid-cols-3">

            <div className="border-b border-espresso-900/10 py-10 sm:border-b-0 sm:border-r sm:pr-10">
              <span className="font-display text-3xl text-champagne-dark">
                01
              </span>

              <h3 className="mt-6 font-display text-2xl">
                Thoughtful
              </h3>

              <p className="mt-4 text-base leading-loose text-espresso-900/55">
                Every detail has a reason. We design pieces with intention,
                keeping the focus on what truly matters.
              </p>
            </div>

            <div className="border-b border-espresso-900/10 py-10 sm:border-b-0 sm:border-r sm:px-10">
              <span className="font-display text-3xl text-champagne-dark">
                02
              </span>

              <h3 className="mt-6 font-display text-2xl">
                Timeless
              </h3>

              <p className="mt-4 text-base leading-loose text-espresso-900/55">
                Trends pass. Personal pieces stay. Our silhouettes are
                designed to feel relevant today and meaningful years from now.
              </p>
            </div>

            <div className="py-10 sm:pl-10">
              <span className="font-display text-3xl text-champagne-dark">
                03
              </span>

              <h3 className="mt-6 font-display text-2xl">
                Personal
              </h3>

              <p className="mt-4 text-base leading-loose text-espresso-900/55">
                Jewellery should feel like yours. Pieces that become part
                of your everyday life, your celebrations, and your memories.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* LUCKNOW */}
      <section className="shell py-24 sm:py-32 lg:py-40">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">

          <div>
            <p className="eyebrow">
              From Lucknow
            </p>

            <h2 className="mt-6 font-display text-4xl font-light leading-tight sm:text-5xl">
              Rooted in a city
              <br />
              of <em className="text-champagne-dark">quiet grace.</em>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-loose text-espresso-900/65">
              Lucknow has always carried a certain softness — an appreciation
              for craftsmanship, detail, restraint, and timeless beauty.
              It is from this environment that NISRAYA takes its first steps.
            </p>

            <p className="mt-6 max-w-xl text-base leading-loose text-espresso-900/65">
              We carry that spirit forward through jewellery that feels
              contemporary without losing its connection to where it began.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={aboutLucknow}
              alt="NISRAYA jewellery"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
            />
          </div>

        </div>
      </section>


      {/* FINAL STATEMENT */}
      <section className="bg-espresso-900 px-6 py-28 text-center text-ivory sm:py-36 lg:py-44">

        <p className="eyebrow eyebrow-light">
          NISRAYA — BY NIYATI
        </p>

        <h2 className="mx-auto mt-7 max-w-4xl font-display text-4xl font-light leading-tight sm:text-5xl lg:text-7xl">
          Jewellery doesn't have to
          <br />
          <em className="text-champagne">say everything.</em>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-base leading-loose text-ivory/60">
          Sometimes, the pieces we treasure most are the ones
          that quietly stay with us.
        </p>

        <Link
          to="/collections"
          className="btn btn-gold mt-10 inline-flex"
        >
          Explore the collection
        </Link>

      </section>

    </main>
  );
}
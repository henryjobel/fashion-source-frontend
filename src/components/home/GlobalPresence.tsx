import { WorldMap } from "@/components/premium/world-map";
import { SectionEyebrow, SectionHeading } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export function GlobalPresence() {
  const page = useCmsPage("/");

  return (
    <section className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>Global Presence</SectionEyebrow>
          <SectionHeading className="mt-5">
            {getField(
              page,
              "global-presence",
              "heading",
              "Four offices. Every major export market.",
            )}
          </SectionHeading>
          <p className="mt-6 text-sm leading-7 text-neutral-600">
            {getField(
              page,
              "global-presence",
              "body",
              "From our Dhaka headquarters to sourcing and finance offices across Asia, the Middle East and Europe, we stay close to both production and the buyers we serve.",
            )}
          </p>
        </div>

        <div className="mt-14">
          <div className="rounded-[var(--radius-premium)] bg-[var(--brand-dark)] p-2">
            <WorldMap />
          </div>
        </div>
      </div>
    </section>
  );
}

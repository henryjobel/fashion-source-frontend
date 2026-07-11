import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Briefcase, GraduationCap, Heart, PartyPopper, TrendingUp, Utensils } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/premium/motion";
import { SectionEyebrow } from "@/components/premium/ui";
import { getField, useCmsPage } from "@/lib/cms";

export const Route = createFileRoute("/our-culture")({
  head: () => ({
    meta: [
      { title: "Our Culture - Fashion Source BD" },
      {
        name: "description",
        content:
          "Working environment, care, development, food, atmosphere and education at Fashion Source BD.",
      },
    ],
  }),
  component: Page,
});

const cardIcons = [Briefcase, Heart, TrendingUp, Utensils, PartyPopper, GraduationCap] as const;

function Page() {
  const page = useCmsPage("/our-culture");
  const introHeading = getField(
    page,
    "culture-intro",
    "heading",
    "Strong sourcing work starts with a stable team.",
  );
  const introBody = getField(
    page,
    "culture-intro",
    "body",
    "Our culture focuses on practical care, professional responsibility and continuous improvement. A strong internal team helps buyers receive better communication, faster follow-up and cleaner execution.",
  );

  const cards = [
    [
      cardIcons[0],
      getField(page, "culture-cards", "card1Title", "Working Environment"),
      getField(
        page,
        "culture-cards",
        "card1Body",
        "Clean, healthy and professional workplaces for daily sourcing and merchandising work.",
      ),
    ],
    [
      cardIcons[1],
      getField(page, "culture-cards", "card2Title", "Care"),
      getField(
        page,
        "culture-cards",
        "card2Body",
        "Respect for people, health awareness and support for long-term team wellbeing.",
      ),
    ],
    [
      cardIcons[2],
      getField(page, "culture-cards", "card3Title", "Development"),
      getField(
        page,
        "culture-cards",
        "card3Body",
        "Skill growth through product learning, technical exposure and team leadership.",
      ),
    ],
    [
      cardIcons[3],
      getField(page, "culture-cards", "card4Title", "Complimentary Food"),
      getField(
        page,
        "culture-cards",
        "card4Body",
        "A workplace culture that values practical care and team connection.",
      ),
    ],
    [
      cardIcons[4],
      getField(page, "culture-cards", "card5Title", "Atmosphere"),
      getField(
        page,
        "culture-cards",
        "card5Body",
        "Internal celebrations and shared moments that keep the team connected.",
      ),
    ],
    [
      cardIcons[5],
      getField(page, "culture-cards", "card6Title", "Education"),
      getField(
        page,
        "culture-cards",
        "card6Body",
        "Support for learning, community improvement and the next generation.",
      ),
    ],
  ] as const;

  const values = [
    getField(page, "culture-values", "value1", "Respect"),
    getField(page, "culture-values", "value2", "Responsibility"),
    getField(page, "culture-values", "value3", "Discipline"),
    getField(page, "culture-values", "value4", "Teamwork"),
  ];

  return (
    <>
      <PageHero
        subtitle="OUR CULTURE"
        title="A workplace culture shaped by care, discipline and growth."
        breadcrumb="Fashion Source BD / Our Culture"
      />
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionEyebrow>Our People</SectionEyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--brand-dark)] md:text-4xl">
                {introHeading}
              </h2>
            </div>
            <p className="text-sm leading-7 text-neutral-600">{introBody}</p>
          </div>

          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.08}>
            {cards.map(([Icon, title, body]) => (
              <article
                key={title}
                className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)]"
              >
                <Icon className="mb-5 h-10 w-10 text-[var(--brand-primary)]" strokeWidth={1.5} />
                <h3 className="font-display text-lg font-semibold text-[var(--brand-dark)]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{body}</p>
              </article>
            ))}
          </RevealGroup>

          <Reveal className="mt-12 rounded-[var(--radius-premium)] bg-neutral-50 p-8 ring-1 ring-neutral-200">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
              <h2 className="font-display text-2xl font-semibold text-[var(--brand-dark)]">
                Values we keep visible
              </h2>
              <div className="grid gap-3 sm:grid-cols-4">
                {values.map((value) => (
                  <div
                    key={value}
                    className="rounded-[var(--radius-premium)] bg-white px-4 py-5 text-center text-sm font-bold text-neutral-800 shadow-sm"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

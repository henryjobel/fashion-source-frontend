import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import {
  History,
  HeartHandshake,
  Palette,
  PackageSearch,
  RefreshCw,
  Users2,
  Wrench,
  ClipboardCheck,
} from "lucide-react";
import { RevealGroup } from "@/components/premium/motion";
import { getField, useCmsPage } from "@/lib/cms";

export const Route = createFileRoute("/why-work-with-us")({
  head: () => ({
    meta: [
      { title: "Why Work With Us — Fashion Source BD" },
      {
        name: "description",
        content:
          "Long history, strong CSR team, in-house design, China sourcing office, real-time ERP order updates and a highly skilled merchandising team.",
      },
      { property: "og:title", content: "Why Choose Fashion Source BD?" },
      {
        property: "og:description",
        content:
          "Eight reasons buyers choose Fashion Source BD as their long-term sourcing partner.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const page = useCmsPage("/why-work-with-us");

  const items = [
    {
      icon: History,
      title: getField(page, "why-us-items", "item1Title", "Long History"),
      body: getField(
        page,
        "why-us-items",
        "item1Body",
        "Fashion Source BD has a long and rich history and knows the Bangladesh market thoroughly through trusted relationships with local apparel manufacturers.",
      ),
    },
    {
      icon: HeartHandshake,
      title: "Reasonable Price",
      body: "We are committed to providing the best value by sourcing high-quality products at competitive and reasonable prices. Through our strong supplier network and efficient sourcing process, we help our clients reduce costs without compromising on quality, compliance, or timely delivery.",
    },
    {
      icon: Palette,
      title: getField(page, "why-us-items", "item3Title", "Own Design Team"),
      body: getField(
        page,
        "why-us-items",
        "item3Body",
        "Our design team presents new trends in demand. Samples are shared with customers and a dedicated R&D team supports new fabrics and samples.",
      ),
    },
    {
      icon: PackageSearch,
      title: getField(page, "why-us-items", "item4Title", "Import Fabric & Trims Sourcing"),
      body: getField(
        page,
        "why-us-items",
        "item4Body",
        "Our own office in China supports customers with imported fabrics and trims, giving access to new materials with extra support.",
      ),
    },
    {
      icon: RefreshCw,
      title: getField(page, "why-us-items", "item5Title", "Real Order Update"),
      body: getField(
        page,
        "why-us-items",
        "item5Body",
        "Fashion Source BD has its own ERP software where customers get real-time order updates throughout the production cycle.",
      ),
    },
    {
      icon: Users2,
      title: getField(page, "why-us-items", "item6Title", "Highly Skilled Merchandising Team"),
      body: getField(
        page,
        "why-us-items",
        "item6Body",
        "Specialists and experts for different products and categories — buyers get proper, product-specific support.",
      ),
    },
    {
      icon: Wrench,
      title: getField(page, "why-us-items", "item7Title", "Skilled Technical Team"),
      body: getField(
        page,
        "why-us-items",
        "item7Body",
        "Our team gives customers utmost quality and support throughout the whole process — from sampling until shipment.",
      ),
    },
    {
      icon: ClipboardCheck,
      title: getField(page, "why-us-items", "item8Title", "Special QA Team"),
      body: getField(
        page,
        "why-us-items",
        "item8Body",
        "A highly trained Quality Assurance Team ensures 100% quality as per customer demand.",
      ),
    },
  ];

  return (
    <>
      <PageHero
        subtitle="WHY CHOOSE FASHION SOURCE BD?"
        title="Unique features that make us a trusted long-term sourcing partner."
        breadcrumb="Fashion Source BD / Why Choose Fashion Source BD?"
      />
      <section className="bg-white px-4 py-16">
        <RevealGroup
          className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-24px_rgba(16,20,24,0.28)]"
            >
              <Icon
                className="mx-auto mb-4 h-12 w-12 text-[var(--brand-primary)]"
                strokeWidth={1.5}
              />
              <h3 className="font-display font-semibold text-[var(--brand-dark)] mb-3">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-600">{body}</p>
            </div>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}

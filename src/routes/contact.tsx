import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useRef, useState } from "react";

import { Reveal, RevealGroup } from "@/components/premium/motion";
import { PremiumButton } from "@/components/premium/ui";
import { useSubmitInquiry } from "@/lib/queries";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Fashion Source BD" },
      {
        name: "description",
        content:
          "Get in touch with Fashion Source BD headquarters, sourcing offices and support team.",
      },
      { property: "og:title", content: "Contact Fashion Source BD" },
      { property: "og:description", content: "Contact information for all offices." },
    ],
  }),
  component: Contact,
});

const inputCls =
  "w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-primary)]";

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={className}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submitInquiry = useSubmitInquiry();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await submitInquiry.mutateAsync({
        type: "contact",
        name: nameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        phone: phoneRef.current?.value ?? "",
        subject: "Contact Form Inquiry",
        message: messageRef.current?.value ?? "",
      });
      setSent(true);
    } catch {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <PageHero
        subtitle="Contact"
        title="Talk to our sourcing and operations team."
        breadcrumb="Fashion Source BD / Contact"
      />
      <section className="bg-neutral-50 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            <div className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm">
              <Phone className="mb-5 h-7 w-7 text-[var(--brand-primary)]" />
              <h2 className="font-display text-lg font-semibold text-[var(--brand-dark)]">Call</h2>
              <div className="mt-4 space-y-1 text-sm font-semibold text-neutral-600">
                <div>+8801613341001</div>
                <div>+8801686841325</div>
              </div>
            </div>
            <div className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm">
              <Mail className="mb-5 h-7 w-7 text-[var(--brand-primary)]" />
              <h2 className="font-display text-lg font-semibold text-[var(--brand-dark)]">Email</h2>
              <a
                href="mailto:info@fashionsource-bd.com"
                className="mt-4 block text-sm font-semibold text-neutral-600 hover:text-[var(--brand-primary)]"
              >
                info@fashionsource-bd.com
              </a>
            </div>
            <div className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm">
              <Clock className="mb-5 h-7 w-7 text-[var(--brand-primary)]" />
              <h2 className="font-display text-lg font-semibold text-[var(--brand-dark)]">
                Office Hours
              </h2>
              <div className="mt-4 space-y-1 text-sm font-semibold text-neutral-600">
                <div>Sun - Thu: 10:00 am - 07:00 pm</div>
                <div>Fri: 04:00 pm - 08:00 pm</div>
                <div>Sat: Weekly Holiday</div>
              </div>
            </div>
            <div className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-7 shadow-sm">
              <MapPin className="mb-5 h-7 w-7 text-[var(--brand-primary)]" />
              <h2 className="font-display text-lg font-semibold text-[var(--brand-dark)]">
                Address
              </h2>
              <div className="mt-4 text-sm font-semibold leading-6 text-neutral-600">
                Zila Parishad, Fatullah, Narayanganj-1400, Dhaka, Bangladesh
              </div>
            </div>
          </RevealGroup>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="overflow-hidden rounded-[var(--radius-premium)] border border-neutral-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7310.122457263409!2d90.47996114538938!3d23.637978193670747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b11ae306e62b%3A0x19c5b2c74c042c45!2sZila%20Parishad%20Karjalay!5e0!3m2!1sen!2sbd!4v1783420506027!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 420 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Fashion Source BD - Corporate Headquarters location"
              />
            </Reveal>

            <Reveal
              delay={0.1}
              className="rounded-[var(--radius-premium)] border border-neutral-200 bg-white p-8 shadow-sm"
            >
              <h2 className="font-display text-2xl font-semibold text-[var(--brand-dark)]">
                Send a message
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                For product, supplier, buyer or partnership queries.
              </p>
              {sent ? (
                <div className="mt-8 flex items-center gap-3 rounded-[var(--radius-premium)] bg-[var(--brand-primary)]/10 p-5 text-sm font-bold text-[var(--brand-primary)]">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  Thank you. We will be in touch shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Field label="Your Name" htmlFor="contact-name">
                    <input id="contact-name" ref={nameRef} required className={inputCls} />
                  </Field>
                  <Field label="Email" htmlFor="contact-email">
                    <input
                      id="contact-email"
                      ref={emailRef}
                      required
                      type="email"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone" htmlFor="contact-phone" className="sm:col-span-2">
                    <input id="contact-phone" ref={phoneRef} className={inputCls} />
                  </Field>
                  <Field label="Message" htmlFor="contact-message" className="sm:col-span-2">
                    <textarea
                      id="contact-message"
                      ref={messageRef}
                      required
                      rows={6}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                  {error && (
                    <p className="text-sm font-semibold text-red-600 sm:col-span-2">{error}</p>
                  )}
                  <PremiumButton
                    type="submit"
                    variant="primary"
                    disabled={submitInquiry.isPending}
                    className="sm:col-span-2 sm:w-fit"
                  >
                    {submitInquiry.isPending ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4" />
                  </PremiumButton>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

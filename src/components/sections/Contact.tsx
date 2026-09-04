import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";
import { contactChannels } from "@/constants/data";
import { useContactForm } from "@/hooks/useContactForm";
import { fadeLeft, fadeRight, viewport } from "@/hooks/useScrollAnimation";

export default function Contact() {
  const { values, errors, status, handleChange, handleSubmit } = useContactForm();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="rail">
          <div className="rail-head">
            <SectionHeading
              id="contact-heading"
              title="Get in touch"
              note="open to roles, freelance, and collaborations"
            />
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <motion.form
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              noValidate
              onSubmit={handleSubmit}
              className="card p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-tiny text-mist">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`field ${errors.name ? "field-error" : ""}`}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" role="alert" className="mt-1.5 text-tiny text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-tiny text-mist">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`field ${errors.email ? "field-error" : ""}`}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" role="alert" className="mt-1.5 text-tiny text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-subject" className="mb-1.5 block text-tiny text-mist">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Let’s work together"
                  value={values.subject}
                  onChange={handleChange}
                  aria-invalid={errors.subject ? "true" : undefined}
                  aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  className={`field ${errors.subject ? "field-error" : ""}`}
                />
                {errors.subject ? (
                  <p id="contact-subject-error" role="alert" className="mt-1.5 text-tiny text-red-400">
                    {errors.subject}
                  </p>
                ) : null}
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="mb-1.5 block text-tiny text-mist">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`field resize-y ${errors.message ? "field-error" : ""}`}
                />
                {errors.message ? (
                  <p id="contact-message-error" role="alert" className="mt-1.5 text-tiny text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <GlowButton
                type="submit"
                className="mt-7 w-full sm:w-auto"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-night/40 border-t-night"
                    />
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </GlowButton>
            </motion.form>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewport}>
              <h3 className="font-serif text-xl text-paper">
                Prefer direct? Reach me any of these ways.
              </h3>
              <ul className="mt-6 space-y-1">
                {contactChannels.map(({ label, value, href, icon: Icon }) => {
                  const content = (
                    <>
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite text-glow">
                        <Icon aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-tiny text-faint">{label}</span>
                        <span className="block text-paper">{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noreferrer" : undefined}
                          className="flex items-center gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-raised/70"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 px-3 py-2.5">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-[15px] leading-relaxed text-mist">
                Based in Matara, Sri Lanka — working with teams anywhere. I usually reply within a
                day.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

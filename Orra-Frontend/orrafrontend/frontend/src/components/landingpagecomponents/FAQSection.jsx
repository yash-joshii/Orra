// components/landingpagecomponents/FAQSection.jsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What happens if a device gets damaged?",
    answer:
      "Every rental is covered by our protection policy. If a device is damaged during a booking, the renter is responsible for repair or replacement costs, assessed through our claims process.",
  },
  {
    question: "How do I get paid as an owner?",
    answer:
      "Payouts are sent to your linked bank account automatically after each completed rental, minus ORRA's service fee.",
  },
  {
    question: "Are renters verified?",
    answer:
      "Yes. Every renter completes ID verification before their first booking, and repeat renters build a visible trust score based on rental history.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes, you can cancel up to 24 hours before the rental starts for a full refund. Cancellations within 24 hours may be subject to a fee.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 px-6 bg-[#F8FAFC]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-gray-500">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-3"
        className="max-w-3xl mx-auto space-y-3"
      >
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="bg-white rounded-xl border border-gray-100 px-5 data-[state=open]:shadow-sm"
          >
            <AccordionTrigger className="text-sm font-semibold text-gray-900 hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-gray-500 leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
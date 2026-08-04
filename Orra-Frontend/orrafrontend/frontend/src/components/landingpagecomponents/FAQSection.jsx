// components/landingpagecomponents/FAQSection.jsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

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
    <section className="relative bg-slate-50/60 py-20 lg:py-28 px-6 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-100/30 blur-3xl rounded-full -z-10 pointer-events-none" />

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 mb-4 shadow-sm">
          <HelpCircle className="w-3.5 h-3.5 text-[#5046E5]" />
          <span className="text-[#5046E5] text-xs font-semibold uppercase tracking-wider">
            Got Questions?
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Frequently Asked Questions
        </h2>
        
        <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Everything you need to know about the product and billing.
        </p>
      </div>

      {/* Accordion Component */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-3"
        className="max-w-3xl mx-auto space-y-4"
      >
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="bg-white rounded-2xl border border-slate-200/80 px-6 sm:px-7 transition-all duration-300 hover:border-indigo-200 data-[state=open]:border-[#5046E5]/40 data-[state=open]:shadow-lg data-[state=open]:shadow-indigo-500/5 overflow-hidden"
          >
            <AccordionTrigger className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#5046E5] hover:no-underline py-5 transition-colors duration-200 data-[state=open]:text-[#5046E5] text-left cursor-pointer">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 leading-relaxed pb-6 pr-2 sm:pr-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </section>
  );
};

export default FAQSection;
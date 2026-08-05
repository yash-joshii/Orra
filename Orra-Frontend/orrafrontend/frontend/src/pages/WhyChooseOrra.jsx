import FeatureCard from "../components/common/FeatureCard";

import {
  Shield,
  CircleCheck,
  CreditCard,
  Zap,
  RotateCcw,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Shield size={22} className="text-white" />,
    title: "Damage Protection",
    description:
      "Every rental is covered by our comprehensive $5,000 protection guarantee.",
  },

  {
    icon: <CircleCheck size={22} className="text-white" />,
    title: "Verified Users",
    description:
      "Every user undergoes strict ID verification before they can rent or list.",
  },

  {
    icon: <CreditCard size={22} className="text-white" />,
    title: "Secure Payments",
    description:
      "Payments are held securely and released only after a successful handoff.",
  },

  {
    icon: <Zap size={22} className="text-white" />,
    title: "Instant Booking",
    description:
      "Skip the back-and-forth. Book instantly with highly-rated owners.",
  },

  {
    icon: <RotateCcw size={22} className="text-white" />,
    title: "Easy Returns",
    description:
      "Clear return policies and flexible extensions if you need more time.",
  },

  {
    icon: <HeartHandshake size={22} className="text-white" />,
    title: "24/7 Support",
    description:
      "Our dedicated team is always here to resolve any issues immediately.",
  },
];

const WhyChooseOrra = () => {
  return (
    <div className="why-choose-orra-section relative bg-[#071428] text-white min-h-screen py-20 lg:py-28 overflow-hidden font-sans">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-0" />

      <div className="section-container relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-semibold mb-6 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#5046E5]" />
            <span>Built For Peace Of Mind</span>
          </div>

          <h1 className="section-heading text-[#FFFFFF] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Why Choose ORRA?
          </h1>

          <p className="section-description text-slate-400 max-w-2xl mx-auto mt-4 text-base sm:text-lg leading-relaxed">
            We've built a platform that prioritizes trust, safety, and
            convenience for both owners and renters.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="feature-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="transition-transform duration-300 hover:-translate-y-1.5"
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default WhyChooseOrra;
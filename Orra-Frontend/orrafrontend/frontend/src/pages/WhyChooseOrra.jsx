
import FeatureCard from "../components/common/FeatureCard";

import {
  Shield,
  CircleCheck,
  CreditCard,
  Zap,
  RotateCcw,
  HeartHandshake,
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
    <div className="why-choose-orra-section bg-[#071428] min-h-screen py-24">
      
      <div className="section-container max-w-7xl mx-auto px-6">

        <h1 className=" section-heading text-center text-white text-5xl font-bold ">
            Why Choose ORRA?
        </h1>

        <p className=" section-description text-center text-gray-400 max-w-3xl mx-auto mt-6 text-lg ">
            We've built a platform that prioritizes trust, safety,
            and convenience for both owners and renters.
        </p>

        <div className=" feature-cards-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 ">
            {features.map((feature, index) => (
                <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                />
            ))}
        </div>

      </div>

    </div>
  );
};

export default WhyChooseOrra;

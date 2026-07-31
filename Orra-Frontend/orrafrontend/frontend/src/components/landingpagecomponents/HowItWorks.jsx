import { Search, PlaySquare, Camera, RotateCcw } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Devices",
    description: "Browse locally available premium gear.",
  },
  {
    number: "02",
    icon: PlaySquare,
    title: "Book Instantly",
    description: "Select your dates and book securely.",
  },
  {
    number: "03",
    icon: Camera,
    title: "Use & Enjoy",
    description: "Meet the owner, pick up, and create.",
  },
  {
    number: "04",
    icon: RotateCcw,
    title: "Return Securely",
    description: "Return the device and leave a review.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#F8FAFC] py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
          How It Works
        </h2>
        <p className="text-sm text-gray-500">
          Getting the gear you need is as easy as 1-2-3-4.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
        {/* connecting line, sits behind the icons */}
        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gray-300 -z-0" />

        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-800" strokeWidth={1.8} />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 text-[15px] mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-gray-500 max-w-[160px]">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
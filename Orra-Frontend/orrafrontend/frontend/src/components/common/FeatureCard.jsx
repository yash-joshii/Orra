const FeatureCard = ({ icon, title, description }) => {
  return (
    <div
      className="
      feature-card
      bg-[#0d1c38]
      border
      border-white/10
      rounded-3xl
      p-8
      "
    >
      <div
        className="
        feature-icon-container
        w-12
        h-12
        rounded-2xl
        bg-white/10
        flex
        items-center
        justify-center
        "
      >
        {icon}
      </div>

      <h3
        className="
        feature-title
        text-white
        text-xl
        font-semibold
        mt-6
        "
      >
        {title}
      </h3>

      <p
        className="
        feature-description
        text-gray-400
        mt-3
        leading-7
        "
      >
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
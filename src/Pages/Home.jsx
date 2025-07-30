import { FaLightbulb, FaUsers, FaSeedling, FaHandHoldingUsd, FaRocket } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CountUp from "react-countup";
import { NavLink, useLoaderData } from "react-router-dom";
import CampaignCard from "../Components/CampaignCard";

// Example slide data
const slides = [
  {
    title: "Fund Your Dreams Together",
    desc: "Join thousands of creators and backers making innovative projects a reality through the power of crowdfunding.",
    icon: <FaUsers className="text-5xl text-accent-purple" />,
    image: "/src/assets/crowdfunding.webp",
    cta: { label: "Start Your Campaign", link: "/add-campaign" },
    gradientStyle: {
      background: `linear-gradient(135deg, var(--color-banner-gradient-left), var(--color-banner-gradient-right))`
    },
  },
  {
    title: "Empower Innovation",
    desc: "Support groundbreaking ideas and help bring new technologies, art, and community projects to life.",
    icon: <FaLightbulb className="text-5xl text-accent-yellow" />,
    image: "/src/assets/empower-removebg-preview.png",
    cta: { label: "Explore Campaigns", link: "/all-campaigns" },
    gradientStyle: {
      background: `linear-gradient(135deg, var(--color-accent-purple), var(--color-primary))`
    },
  },
  {
    title: "Grow a Better Tomorrow",
    desc: "Contribute to environmental and social projects. Every small action has a big impact on the world.",
    icon: <FaSeedling className="text-5xl text-accent-green" />,
    image: "/src/assets/treeplantation.png",
    cta: { label: "See Impact Stories", link: "/all-campaigns" },
    gradientStyle: {
      background: `linear-gradient(135deg, var(--color-accent-green), var(--color-primary))`
    },
  },
];

const Home = () => {
 const campaigns = useLoaderData();
  return (
    <>
      {/* Hero Slider */}
      <div className="w-full font-poppins">
        <Carousel
          infiniteLoop
          autoPlay
          interval={5500}
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          emulateTouch
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="min-h-[480px] md:min-h-[520px] flex items-stretch"
              style={slide.gradientStyle}
            >
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-20 p-6 md:p-20 max-w-7xl mx-auto w-full min-h-[480px] md:min-h-[520px]">
                {/* Text/Content */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left text-button-text">
                  <div className="mb-6 animate-fade-in">
                    {slide.icon}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight font-poppins text-button-text drop-shadow-xl tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 max-w-xl leading-relaxed opacity-95 font-inter text-button-text">
                    {slide.desc}
                  </p>
                  <button
                    onClick={() => window.location.href = slide.cta.link}
                    className="px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white bg-button-text text-primary font-poppins tracking-wide"
                  >
                    {slide.cta.label}
                  </button>
                </div>
                {/* Image */}
                <div className="flex-1 flex justify-center items-center animate-float">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-64 md:max-h-96 object-contain drop-shadow-2xl rounded-2xl"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Amazing Stats */}
      <div className="w-full py-16 bg-section-bg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="flex flex-col items-center bg-card-bg rounded-2xl shadow-lg p-8 daisyui-card hover:scale-105 transition-transform duration-300">
              <FaUsers className="text-5xl mb-4 text-accent-purple" />
              <div className="text-5xl font-extrabold mb-2 font-poppins text-primary drop-shadow-xl">
                <CountUp end={12000} duration={2.4} separator="," />+
              </div>
              <div className="text-lg text-text-secondary font-inter tracking-wide mt-1">Active Backers</div>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center bg-card-bg rounded-2xl shadow-lg p-8 daisyui-card hover:scale-105 transition-transform duration-300">
              <FaHandHoldingUsd className="text-5xl mb-4 text-accent-green" />
              <div className="text-5xl font-extrabold mb-2 font-poppins text-accent-green drop-shadow-xl">
                $<CountUp end={2.5} decimals={1} duration={2.4} />M+
              </div>
              <div className="text-lg text-text-secondary font-inter tracking-wide mt-1">Funds Raised</div>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center bg-card-bg rounded-2xl shadow-lg p-8 daisyui-card hover:scale-105 transition-transform duration-300">
              <FaRocket className="text-5xl mb-4 text-accent-yellow" />
              <div className="text-5xl font-extrabold mb-2 font-poppins text-accent-yellow drop-shadow-xl">
                <CountUp end={350} duration={2.4} />+
              </div>
              <div className="text-lg text-text-secondary font-inter tracking-wide mt-1">Campaigns Launched</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Campaigns Section*/}
      <section className="w-full py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center font-poppins text-primary tracking-tight">
            Active Campaigns
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-center max-w-2xl mx-auto font-inter text-text-secondary">
            Discover and support ongoing campaigns from passionate creators. Explore projects making a difference and help bring their visions to life.
          </p>
          {/* Cards will go here */}
          <div className="grid grid-cols-3 gap-10">
            {/* Map campaign cards here */}
                  {campaigns.length > 0 ? (
                    campaigns.slice(0, 6).map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                    ))
                  ) : (
                    <div className="w-full text-center text-lg text-text-secondary">
                    No active campaigns found.
                    </div>
                  )}
                  </div>
                  <div className="flex justify-center mt-10">
                  <NavLink
                    to="/all-campaigns"
                    className="inline-block px-8 py-3 rounded-full font-bold bg-accent-purple text-white shadow-xl hover:bg-primary transition-colors duration-200 font-poppins text-lg tracking-wide"
                  >
                    View All Campaigns
                  </NavLink>
                  </div>
                </div>
                </section>
                <section className="py-20 bg-section-bg">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-primary font-poppins mb-5 tracking-tight">
                  Why Crowdfunding Works
                </h2>
                <p className="text-lg md:text-xl font-inter text-text-secondary text-center mb-14 max-w-2xl mx-auto">
                  The power of many can achieve what individuals alone cannot. Discover how Crowdcube makes collective impact possible.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
                  {/* Card 1 */}
          <div className="flex-1 flex flex-col items-center text-center px-3 py-8 bg-card-bg rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <span className="bg-accent-yellow/20 rounded-full p-5 mb-4">
              <FaUsers className="text-4xl text-accent-yellow" />
            </span>
            <h3 className="font-semibold text-xl text-text-primary font-poppins mb-2">Many Contributors, Big Impact</h3>
            <p className="text-base md:text-lg text-text-secondary font-inter">
              Small contributions from many add up to significant funding, making seemingly impossible projects possible through collective action.
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex-1 flex flex-col items-center text-center px-3 py-8 bg-card-bg rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <span className="bg-primary/20 rounded-full p-5 mb-4">
              <FaHandHoldingUsd className="text-4xl text-primary" />
            </span>
            <h3 className="font-semibold text-xl text-text-primary font-poppins mb-2">Secure & Transparent</h3>
            <p className="text-base md:text-lg text-text-secondary font-inter">
              Our platform ensures all transactions are secure and campaign progress is transparent, building trust between creators and backers.
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex-1 flex flex-col items-center text-center px-3 py-8 bg-card-bg rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <span className="bg-accent-green/20 rounded-full p-5 mb-4">
              <FaSeedling className="text-4xl text-accent-green" />
            </span>
            <h3 className="font-semibold text-xl text-text-primary font-poppins mb-2">Real Stories, Real Change</h3>
            <p className="text-base md:text-lg text-text-secondary font-inter">
              Behind every campaign is a passionate team with a meaningful story. Connect directly with creators and see the impact of your support.
            </p>
          </div>
        </div>
      </section>

      {/* How to Contribute */}
      <section className="py-20 bg-background">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-primary font-poppins mb-5 tracking-tight">
          How to Contribute
        </h2>
        <p className="text-lg md:text-xl font-inter text-text-secondary text-center mb-14 max-w-2xl mx-auto">
          Supporting a campaign is easy. Follow these simple steps to make a difference today.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center text-center bg-card-bg rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-primary text-white font-bold rounded-full mb-4 text-2xl shadow">
              1
            </div>
            <h4 className="font-semibold text-lg text-text-primary font-poppins mb-2">Browse Campaigns</h4>
            <p className="text-base text-text-secondary font-inter">
              Explore projects across categories that resonate with your interests and values.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center text-center bg-card-bg rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-accent-purple text-white font-bold rounded-full mb-4 text-2xl shadow">
              2
            </div>
            <h4 className="font-semibold text-lg text-text-primary font-poppins mb-2">Choose a Project</h4>
            <p className="text-base text-text-secondary font-inter">
              Select a campaign that aligns with your passion and review their goals and needs.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center text-center bg-card-bg rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-accent-green text-white font-bold rounded-full mb-4 text-2xl shadow">
              3
            </div>
            <h4 className="font-semibold text-lg text-text-primary font-poppins mb-2">Donate Securely</h4>
            <p className="text-base text-text-secondary font-inter">
              Contribute any amount through our secure payment system with multiple options.
            </p>
          </div>
          {/* Step 4 */}
          <div className="flex-1 flex flex-col items-center text-center bg-card-bg rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center w-14 h-14 bg-accent-yellow text-text-primary font-bold rounded-full mb-4 text-2xl shadow">
              4
            </div>
            <h4 className="font-semibold text-lg text-text-primary font-poppins mb-2">Share & Track</h4>
            <p className="text-base text-text-secondary font-inter">
              Spread the word on social media and follow the campaign’s progress and updates.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold font-poppins mb-4 tracking-tight">Ready to Make a Difference?</h2>
          <p className="text-lg md:text-xl font-inter mb-8">
            Join thousands of creators and supporters on Crowdcube today. Start your campaign or find worthy projects to support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/add-campaign"
              className="btn btn-primary bg-white text-primary font-bold font-poppins px-8 py-3 rounded-full shadow-md border-0 hover:scale-105 transition-all text-lg"
            >
              START A CAMPAIGN
            </NavLink>
            <NavLink
              to="/all-campaigns"
              className="btn bg-accent-yellow text-text-primary font-bold font-poppins px-8 py-3 rounded-full shadow-md border-0 hover:scale-105 transition-all text-lg"
            >
              EXPLORE PROJECTS
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
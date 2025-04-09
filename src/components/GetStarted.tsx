import React from "react";

const GetStarted: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-500 to-teal-400 text-white text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Buddy Book?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Start collecting memories and fun facts about your friends today.
            Sign up for free and create your first slambook in minutes!
          </p>
          <a
            href="#"
            className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:shadow-lg transition duration-300"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;

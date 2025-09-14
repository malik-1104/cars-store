import React from "react";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <header>
          <HeroSection />
        </header>

        <section>
          <CategoriesSection />
        </section>
      </main>
    </div>
  );
};

export default Home;

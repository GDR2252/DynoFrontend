import React from "react";
import HeroSection from "./Hero";
import GoLiveSection from "./GoLive";
import FeaturesSection from "./Features";
import {
  HomeContainer,
  HomeFullWidthContainer,
} from "@/Containers/Home/styled";
import UseCaseSection from "./UseCase";
import WhyChooseDynopaySection from "./WhyChooseDynoPay";

const HomePage = () => {
  return (
    <div>
      <HomeContainer>
        <HeroSection />
      </HomeContainer>

      <HomeFullWidthContainer>
        <GoLiveSection />
      </HomeFullWidthContainer>

      <HomeContainer>
        <FeaturesSection />
      </HomeContainer>

      <HomeFullWidthContainer>
        <WhyChooseDynopaySection />
      </HomeFullWidthContainer>

      <HomeContainer>
        <UseCaseSection />
      </HomeContainer>
    </div>
  );
};

export default HomePage;

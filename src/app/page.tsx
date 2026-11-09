import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ProfileHeader } from "@/components/sections/ProfileHeader";
import { InfoGrid } from "@/components/sections/InfoGrid";
import { LinkCards } from "@/components/sections/LinkCards";
import { ContributionGraph } from "@/components/sections/ContributionGraph";
import { About } from "@/components/sections/About";
import { CurrentWork } from "@/components/sections/CurrentWork";
import { Stack } from "@/components/sections/Stack";
import { PersonalProjects } from "@/components/sections/PersonalProjects";
import { Certifications } from "@/components/sections/Certifications";
import { Footer } from "@/components/layout/Footer";
import { Experience } from "@/components/sections/Experience";
import { BackToTop } from "@/components/ui/BackToTop";
import { Band } from "@/components/ui/Band";

export const revalidate = 3600;

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <ProfileHeader />
      <Band hatch className="h-[30px]" />
      <InfoGrid />
      <Band hatch className="h-[30px]" />
      <LinkCards />
      <Band hatch className="h-[30px]" />
      <ContributionGraph />
      <Band hatch className="h-[30px]" />
      <About />
      <Band hatch className="h-[30px]" />
      <CurrentWork />
      <Band hatch className="h-[30px]" />
      <Stack />
      <Band hatch className="h-[30px]" />
      <Experience />
      <Band hatch className="h-[30px]" />
      <PersonalProjects />
      <Band hatch className="h-[30px]" />
      <Certifications />
      <Band hatch className="h-[30px]" />
      <Footer />
      <BackToTop />
    </main>
  );
}

"use client";
import NavigationBar from "@/components/Navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillSection from "@/components/skill-section";
import ProtofolioSection from "@/components/protofolio-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillSection />

      {/* Portfolio Section */}
      <ProtofolioSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
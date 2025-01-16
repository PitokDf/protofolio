"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { CountdownTimer } from '@/components/countdown-timer';
import { AnimatedSkill } from '@/components/animated-skill';
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Code2,
  Palette,
  Globe,
  Cpu,
  Send,
  Braces,
  Database,
  Layout,
  Cloud,
  GitBranch
} from "lucide-react";
import { useState, useEffect } from "react";

const skills = [
  { name: "Frontend Development", progress: 70, icon: <Layout className="w-5 h-5 text-primary" /> },
  { name: "Backend Development", progress: 90, icon: <Database className="w-5 h-5 text-primary" /> },
  { name: "Database Management & Prisma ORM", progress: 88, icon: <Cloud className="w-5 h-5 text-primary" /> },
  { name: "API Development", progress: 85, icon: <GitBranch className="w-5 h-5 text-primary" /> },
  { name: "Version Control (GitHub)", progress: 70, icon: <GitBranch className="w-5 h-5 text-primary" /> },
  { name: "User Authentication (JWT)", progress: 90, icon: <Database className="w-5 h-5 text-primary" /> }
];


const projects = [
  {
    title: "Pencatatan Pengeluaran",
    description: "Sistem untuk mencatat pengeluaran dengan dashboard yang mudah dipahami dan fitur analisis keuangan.",
    tags: ["Next.js", "PostgreSQL", "TypeScript", "Prisma"],
    image: "/pencatatan-pengeluaran.png",
    link: "https://catatan-pengeluaran-three.vercel.app/"
  },
  {
    title: "IT Ventory",
    description: "Aplikasi manajemen inventaris barang dengan fitur pencatatan dan pelacakan yang efisien.",
    tags: ["Laravel", "MySQL", "Node.js"],
    image: "/it-ventory.png",
    link: "http://it-ventory.kesug.com/"
  },
  {
    title: "KMIPN PNP",
    description: "Platform untuk mengelola partisipasi tim dan proposal dalam Kompetisi Mahasiswa Nasional bidang Informatika.",
    tags: ["Express.js", "Prisma", "Next.js", "TypeScript", "PostgreSQL"],
    image: "/kmipn-pnp.png",
    link: "https://github.com/PitokDf/kmipn_pnp/"
  },
  {
    title: "Coming Soon",
    description: "Coming soon",
    tags: ["Coming Soon", "Coming Soon", "Coming Soon", "Coming Soon"],
    image: "/coming-soon.png",
    link: "#"
  }
];

// Set target date to 3 months from now
const targetDate = new Date('2025-02-18');

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNav(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (currentScrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);

      const sections = ["hero", "about", "skills", "portfolio", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-sm bg-background/80 transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-full"
        }`}>
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              PITOK
            </span>
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Portfolio", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className={`text-sm transition-colors hover:text-primary ${activeSection === item.toLowerCase() ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="h-0.5 bg-primary/10">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/50 to-background" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="relative inline-block">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src="/pito-desri-pauzi.webp"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-background shadow-xl"
              />
            </div>
            <div className="h-24 flex items-center justify-center">
              <TypeAnimation
                sequence={[
                  'Pito Desri Pauzi',
                  1000,
                  'Full Stack Developer',
                  1000,
                ]}
                wrapper="h1"
                speed={50}
                repeat={Infinity}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <p className="text-xl md:text-2xl text-muted-foreground">
                Membangun Pengalaman Digital Lewat Kode dan Desain
              </p>

              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  Get in Touch
                </Button>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="h-8 w-4 text-muted-foreground" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">About Me</h2>
            <div className="space-y-8 text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Saya seorang mahasiswa semester 6 dengan minat besar di dunia full-stack development.
                Saya memiliki pengalaman dalam mengembangkan sistem backend dan merancang antarmuka pengguna yang sederhana namun efektif.
                Saya selalu berusaha menulis kode yang bersih dan mudah dipelihara, serta menciptakan desain yang fokus pada kebutuhan pengguna.
              </p>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Next Project Launch In</h3>
                <CountdownTimer targetDate={targetDate} />
              </div>
              <div className="flex gap-4 justify-center">
                <a href="https://github.com/PitokDf" target="_blank">
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/pito-desri-pauzi-181052314/" target="_blank">
                  <Button variant="outline">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Skills & Expertise</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            {skills.map((skill) => (
              <AnimatedSkill
                key={skill.name}
                name={skill.name}
                progress={skill.progress}
                icon={skill.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full group/btn">
                      <a href={project.link} target="_blank" className="flex">
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Get in Touch</h2>
              <Card className="p-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button className="w-full">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
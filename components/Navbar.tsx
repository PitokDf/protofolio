'use client'

import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toogle";

export default function NavigationBar() {
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
                    <ThemeToggle />
                </div>
            </div>
            <div className="h-0.5 bg-primary/10">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
        </nav>
    );
}
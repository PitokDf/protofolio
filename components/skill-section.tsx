import React, { useEffect, useRef, useState } from 'react';
import {
    Code2,
    Triangle,
    FileText,
    Server,
    Database,
    Zap,
    Shield,
    GitBranch,
    Palette,
    Layers,
    Box,
    Gitlab,
    Send,
    Code
} from 'lucide-react';

interface Technology {
    name: string
    category: string
    icon: any
    color: string
    description: string
}
const technologies: Technology[] = [
    {
        name: "React",
        category: "Frontend",
        icon: Code2,
        color: "from-blue-400 to-blue-600",
        description: "Building interactive UIs"
    },
    {
        name: "Next.js",
        category: "Framework",
        icon: Triangle,
        color: "from-gray-700 to-black",
        description: "Full-stack React framework"
    },
    {
        name: "TypeScript",
        category: "Language",
        icon: FileText,
        color: "from-blue-500 to-blue-700",
        description: "Type-safe JavaScript"
    },
    {
        name: "Node.js",
        category: "Backend",
        icon: Server,
        color: "from-green-500 to-green-700",
        description: "Server-side JavaScript"
    },
    {
        name: "Express.js",
        category: "Backend",
        icon: Layers,
        color: "from-gray-600 to-gray-800",
        description: "Web framework for Node.js"
    },
    {
        name: "Prisma",
        category: "ORM",
        icon: Zap,
        color: "from-indigo-500 to-purple-600",
        description: "Next-gen ORM"
    },
    {
        name: "PostgreSQL",
        category: "Database",
        icon: Database,
        color: "from-blue-600 to-indigo-600",
        description: "Relational database"
    },
    {
        name: "JWT",
        category: "Auth",
        icon: Shield,
        color: "from-orange-500 to-red-500",
        description: "JSON Web Tokens"
    },
    {
        name: "Git",
        category: "Version Control",
        icon: GitBranch,
        color: "from-orange-600 to-red-600",
        description: "Version control system"
    },
    {
        name: "Docker",
        category: "Containerization",
        icon: Box,
        color: "from-blue-500 to-blue-700",
        description: "Container platform"
    },
    {
        name: "GitLab",
        category: "CI/CD",
        icon: Gitlab,
        color: "from-orange-500 to-red-500",
        description: "Repository & CI/CD pipelines"
    },
    {
        name: "Postman",
        category: "API Testing",
        icon: Send,
        color: "from-orange-400 to-orange-600",
        description: "API development & testing"
    },
    {
        name: "VSCode",
        category: "Editor",
        icon: Code,
        color: "from-blue-400 to-blue-600",
        description: "Code editor"
    },
    {
        name: "Tailwind CSS",
        category: "Styling",
        icon: Palette,
        color: "from-cyan-400 to-blue-500",
        description: "Utility-first CSS"
    }
];

export default function TechStackSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Skip horizontal scroll hijacking on mobile

        const handleWheel = (e: WheelEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;

            // Check if section is in viewport and we want to hijack scroll
            const inViewport = elementTop < windowHeight * 0.5 && elementTop + elementHeight > windowHeight * 0.5;

            if (inViewport) {
                // Determine if we should hijack based on scroll direction and current progress
                const scrollingDown = e.deltaY > 0;
                const scrollingUp = e.deltaY < 0;

                // Hijack conditions:
                // 1. Scrolling down and progress < 1 (still has content to show)
                // 2. Scrolling up and progress > 0 (can go back in horizontal list)
                const shouldHijack = (scrollingDown && scrollProgress < 1) || (scrollingUp && scrollProgress > 0);

                if (shouldHijack) {
                    e.preventDefault();
                    setIsActive(true);

                    // Update progress based on wheel delta
                    const sensitivity = 0.001;
                    const delta = e.deltaY * sensitivity;
                    const newProgress = Math.min(Math.max(scrollProgress + delta, 0), 1);

                    setScrollProgress(newProgress);
                } else {
                    setIsActive(false);
                }
            } else {
                setIsActive(false);
                // Reset progress when section is not in focus
                if (elementTop > windowHeight) {
                    setScrollProgress(0);
                }
            }
        };

        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;

            // Simple scroll progress for visual feedback when not hijacking
            if (elementTop > windowHeight || (scrollProgress >= 1 && scrollProgress <= 0)) {
                setIsActive(false);
            }

            // Reset progress when scrolling away from section (going down)
            if (elementTop > windowHeight) {
                setScrollProgress(0);
            }
            // Set progress to 1 when coming from below (scrolling up to section)
            else if (elementTop + rect.height < 0 && scrollProgress === 0) {
                setScrollProgress(1);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollProgress, isMobile]);

    // Mobile touch/swipe handling
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && currentIndex < technologies.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
        if (isRightSwipe && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Calculate maxTranslateX for desktop
    const maxTranslateX = typeof window !== 'undefined'
        ? Math.max(0, (technologies.length * 320) - (window.innerWidth - 100))
        : 0;

    return (
        <section id='skills' className="min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-slate-800/50 overflow-hidden">
            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
                        Tech Stack
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                        Technologies and tools I use to build modern web applications
                    </p>

                    {/* Active state indicator - Desktop only */}
                    {!isMobile && isActive && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm text-blue-700 dark:text-blue-300 animate-pulse">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                            Scroll to explore technologies
                        </div>
                    )}

                    {/* Mobile swipe indicator */}
                    {isMobile && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm text-blue-700 dark:text-blue-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Swipe to explore technologies
                        </div>
                    )}
                </div>

                <div ref={containerRef} className="relative">
                    {/* Desktop: Horizontal scrolling container */}
                    {!isMobile && (
                        <div className="overflow-hidden p-6">
                            <div
                                className="flex gap-6 transition-transform duration-300 ease-out"
                                style={{
                                    transform: `translateX(-${scrollProgress * maxTranslateX}px)`,
                                    width: `${technologies.length * 320}px`
                                }}
                            >
                                {technologies.map((tech, index) => (
                                    <TechCard key={tech.name} tech={tech} index={index} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mobile: Card slider */}
                    {isMobile && (
                        <div className="relative">
                            <div
                                className="overflow-hidden  p-6"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="flex transition-transform duration-300 ease-out"
                                    style={{
                                        transform: `translateX(-${currentIndex * 100}%)`,
                                        width: `${technologies.length * 100}%`
                                    }}
                                >
                                    {technologies.map((tech, index) => (
                                        <div key={tech.name} className="w-full flex-shrink-0 px-4">
                                            <TechCard tech={tech} index={index} isMobile={true} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile navigation buttons */}
                            <button
                                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentIndex === 0}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setCurrentIndex(prev => Math.min(technologies.length - 1, prev + 1))}
                                disabled={currentIndex === technologies.length - 1}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Progress indicator */}
                    <div className="flex justify-center items-center mt-8 md:mt-12 gap-4">
                        <div className="w-32 md:w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                                style={{
                                    width: isMobile
                                        ? `${((currentIndex + 1) / technologies.length) * 100}%`
                                        : `${scrollProgress * 100}%`
                                }}
                            ></div>
                        </div>
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[3rem]">
                            {isMobile
                                ? `${currentIndex + 1}/${technologies.length}`
                                : `${Math.round(scrollProgress * 100)}%`
                            }
                        </div>
                    </div>

                    {/* Scroll/Swipe instruction */}
                    <div className="text-center mt-6 md:mt-8">
                        {!isMobile ? (
                            // Desktop instructions
                            scrollProgress === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400 animate-bounce">
                                    Scroll down to explore technologies →
                                </p>
                            ) : scrollProgress === 1 ? (
                                <p className="text-sm text-green-600 dark:text-green-400 animate-pulse">
                                    ✓ All technologies explored! Continue scrolling ↓
                                </p>
                            ) : (
                                <p className="text-sm text-blue-600 dark:text-blue-400 animate-pulse">
                                    Scroll up ↑ or down ↓ to navigate technologies
                                </p>
                            )
                        ) : (
                            // Mobile instructions
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {currentIndex === 0 && "Swipe left or tap → to explore"}
                                {currentIndex === technologies.length - 1 && "✓ All explored! Swipe right or tap ←"}
                                {currentIndex > 0 && currentIndex < technologies.length - 1 && "Swipe left/right to navigate"}
                            </p>
                        )}
                    </div>

                    {/* Navigation dots */}
                    <div className="flex justify-center mt-4 md:mt-6 gap-2">
                        {technologies.map((_, index) => {
                            const isActiveIndex = isMobile
                                ? index === currentIndex
                                : Math.floor(scrollProgress * technologies.length) === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => isMobile && setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${isActiveIndex
                                        ? 'bg-blue-500 scale-125'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                        } ${isMobile ? 'cursor-pointer hover:bg-blue-400' : ''}`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Tech Card Component
function TechCard({ tech, index, isMobile = false }: { tech: Technology, index: number, isMobile?: boolean }) {
    const IconComponent = tech.icon;

    return (
        <div
            className={`${isMobile ? 'w-[250px]' : 'flex-shrink-0 w-72'} group`}
            style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: `all 0.6s ease-out ${index * 0.1}s`
            }}
        >
            <div className="relative h-full p-4 md:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${tech.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                        {tech.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {tech.category}
                        </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {tech.description}
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded-full opacity-50"></div>
                <div className="absolute top-4 right-8 w-1 h-1 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-400 rounded-full opacity-30"></div>
            </div>
        </div>
    );
}
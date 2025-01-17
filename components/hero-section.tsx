import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from './ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
    return (
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
    );
}
import { motion } from "framer-motion";
import { CountdownTimer } from "./countdown-timer";
import { Button } from "./ui/button";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const targetDate = new Date('2025-09-01T00:00:00Z'); // Set your target date here
export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-muted/30 flex justify-center items-center h-[100dvh]">
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

                        <div className="space-y-6 ">
                            <h3 className="text-xl font-semibold">Next Project Launch In</h3>
                            <CountdownTimer targetDate={targetDate} />
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href={"https://github.com/PitokDf"}
                                target="_blank"
                                title="Cek Github Pito Desri Pauzi"
                            >
                                <Button variant="outline" className="relative bg-white/10 dark:bg-black/10 overflow-hidden group">
                                    <span className="absolute inset-0 bg-black dark:bg-white translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300"></span>
                                    <span
                                        className="relative z-10 flex justify-center items-center text-black dark:text-white
                                        group-hover:text-white dark:group-hover:text-black
                                        transition-colors duration-300">
                                        <Github className="mr-2 h-4 w-4 inline-block" />
                                        GitHub
                                    </span>
                                </Button>
                            </Link>
                            <Link
                                href={"https://www.linkedin.com/in/pito-desri-pauzi-181052314"}
                                target="_blank"
                                title="Cek LinkedIn Pito Desri Pauzi"
                            >
                                <Button variant="outline" className="relative bg-blue-600/10 overflow-hidden group">
                                    <span className="absolute inset-0 bg-blue-600 translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-300"></span>
                                    <span className="relative flex justify-center items-center z-10 text-blue-600 group-hover:text-white transition-colors duration-300">
                                        <Linkedin className="mr-2 h-4 w-4 inline-block" />
                                        LinkedIn
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
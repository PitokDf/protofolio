import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function ContactSection() {
    return (
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
    );
}
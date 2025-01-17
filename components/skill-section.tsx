import { Cloud, Database, GitBranch, Layout } from "lucide-react";
import { AnimatedSkill } from "./animated-skill";

const skills = [
    { name: "Frontend Development", progress: 70, icon: <Layout className="w-5 h-5 text-primary" /> },
    { name: "Backend Development", progress: 90, icon: <Database className="w-5 h-5 text-primary" /> },
    { name: "Database Management & Prisma ORM", progress: 88, icon: <Cloud className="w-5 h-5 text-primary" /> },
    { name: "API Development", progress: 85, icon: <GitBranch className="w-5 h-5 text-primary" /> },
    { name: "Version Control (GitHub)", progress: 70, icon: <GitBranch className="w-5 h-5 text-primary" /> },
    { name: "User Authentication (JWT)", progress: 90, icon: <Database className="w-5 h-5 text-primary" /> }
];
export default function SkillSection() {
    return (
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
    );
}
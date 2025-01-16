"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface AnimatedSkillProps {
  name: string;
  progress: number;
  icon: React.ReactNode;
}

export function AnimatedSkill({ name, progress, icon }: AnimatedSkillProps) {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setValue(progress);
    }
  }, [inView, progress]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        {icon}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={value} className="h-2 mt-2" />
        </div>
      </div>
    </motion.div>
  );
}
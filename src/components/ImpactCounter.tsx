import { useEffect, useState, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImpactCounterProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  icon?: LucideIcon;
  className?: string;
}

// Easing function for smooth deceleration
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const ImpactCounter = ({ 
  end, 
  label, 
  suffix = "", 
  prefix = "",
  duration = 2000,
  icon: Icon,
  className 
}: ImpactCounterProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Only animate once
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number | null = null;
          
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Apply easing
            const easeProgress = easeOutExpo(progress);
            const currentCount = Math.floor(easeProgress * end);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div 
      ref={elementRef}
      className={cn(
        "relative flex flex-col items-center justify-center p-6 rounded-3xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group overflow-hidden",
        className
      )}
    >
      {/* Background Decorator */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
      
      {/* Optional Icon */}
      {Icon && (
        <div className="mb-4 p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
      )}

      {/* Number */}
      <div className="relative z-10 flex items-baseline font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-2">
        {prefix && <span className="text-2xl mr-1 text-muted-foreground">{prefix}</span>}
        <span className="tabular-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
          {count.toLocaleString()}
        </span>
        {suffix && <span className="text-2xl ml-1 text-primary">{suffix}</span>}
      </div>

      {/* Label */}
      <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider text-center z-10">
        {label}
      </div>
    </div>
  );
};

export default ImpactCounter;
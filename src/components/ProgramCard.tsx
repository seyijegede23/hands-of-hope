import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  category?: string;
}

const ProgramCard = ({ title, description, image, slug, category = "Program" }: ProgramCardProps) => {
  return (
    <Link 
      to={`/programs#${slug}`}
      className="group flex flex-col h-full bg-card border border-border/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-bold tracking-wide text-white uppercase bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
            {category}
          </span>
        </div>
        
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Floating Action Icon */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="bg-background/90 p-2 rounded-full shadow-lg backdrop-blur-sm">
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed text-sm line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">
            Learn More
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full group-hover:bg-primary/10 text-primary hover:text-primary"
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;
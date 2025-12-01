import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ChevronDown, Users } from "lucide-react";
import heroImage from "@/assets/hero-charity.jpg";

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[600px] flex items-center overflow-hidden group">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Community volunteers helping each other"
          className="w-full h-full object-cover transition-transform duration-10000 ease-linear scale-100 group-hover:scale-110"
        />
        {/* sophisticated gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Join 5,000+ active volunteers today
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Empowering communities with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">
              hope, care, & compassion
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Join us in making a lasting difference. We transform lives by building 
            stronger, resilient communities through dedicated action and sustainable support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Link to="/donate">
              <Button 
                variant="donate" 
                size="lg" 
                className="w-full sm:w-auto text-lg shadow-[0_0_40px_-10px_rgba(255,100,100,0.5)] hover:shadow-[0_0_60px_-10px_rgba(255,100,100,0.7)] transition-all"
              >
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Donate Now
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-lg bg-white/5 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white transition-all"
              >
                Become a Volunteer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators / Stats */}
          <div className="pt-8 flex items-center gap-8 border-t border-white/10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 text-white/80">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-full">
                <Users className="h-5 w-5 text-rose-300" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">10k+</p>
                <p className="text-xs uppercase tracking-wider opacity-70">Lives Impacted</p>
              </div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex -space-x-3">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-500 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                 </div>
               ))}
               <div className="w-10 h-10 rounded-full border-2 border-black bg-white/10 backdrop-blur flex items-center justify-center text-xs font-medium text-white">
                 +2k
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
};

export default Hero;
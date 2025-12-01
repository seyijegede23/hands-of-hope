import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming you have a standard shadcn utils helper

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Impact", path: "/impact" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "Contact", path: "/contact" },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-50 relative">
            <div className="bg-gradient-to-tr from-rose-500 to-orange-400 p-2 rounded-xl shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <Heart className="h-5 w-5 text-white fill-white/20" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all">
              Hearts Hands of Hope
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-secondary/50",
                  isActive(item.path) 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute inset-x-4 -bottom-[10px] h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                )}
              </Link>
            ))}
            <Link to="/donate">
              <Button 
                variant="donate" 
                size="sm" 
                className="ml-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="md:hidden relative z-50 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/98 backdrop-blur-xl z-40 md:hidden transition-all duration-300 ease-in-out flex flex-col pt-24 px-6",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center justify-between px-4 py-4 text-lg font-medium rounded-xl transition-all duration-200 border border-transparent",
                isActive(item.path)
                  ? "bg-secondary text-primary border-border/50 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {item.name}
              {isActive(item.path) && <Heart className="h-4 w-4 fill-current animate-pulse" />}
            </Link>
          ))}
          
          <div className="mt-6 pt-6 border-t border-border">
            <Link to="/donate" className="block w-full">
              <Button variant="donate" size="lg" className="w-full text-lg shadow-lg">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
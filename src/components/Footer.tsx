import { useState } from "react";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://heartofhopeserver1.onrender.com/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed");

      toast.success("Subscribed!", {
        description: "You've been added to our newsletter.",
        icon: <CheckCircle2 className="text-green-500" />,
      });
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-rose-500 to-orange-600 p-2.5 rounded-xl shadow-lg shadow-rose-500/20">
                <Heart className="h-6 w-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Hearts Hands of Hope
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Empowering communities with hope, care, and compassion. Together, we make a lasting difference.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-800 hover:bg-primary hover:text-white text-slate-400 transition-all duration-300 hover:-translate-y-1">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-800 hover:bg-primary hover:text-white text-slate-400 transition-all duration-300 hover:-translate-y-1">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/heartshandsofhope" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-800 hover:bg-primary hover:text-white text-slate-400 transition-all duration-300 hover:-translate-y-1">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-lg text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-slate-400 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-slate-400 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Our Impact
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-slate-400 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-bold text-lg text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 group">
                <MapPin className="h-5 w-5 mt-1 text-primary group-hover:text-primary/80 transition-colors" />
                <span>123 Hope Street, Community Center,<br/>Ottawa, Canada</span>
              </li>
              
              {/* Clickable Phone Number */}
              <li>
                <a href="tel:+1000355009" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                  <Phone className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
                  <span>+1 000 355 009</span>
                </a>
              </li>

              {/* Clickable Email */}
              <li>
                <a href="mailto:info@heartshandsofhope.org" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                  <Mail className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
                  <span>info@heartshandsofhope.org</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-bold text-lg text-white">Stay Updated</h3>
            <p className="text-slate-400 text-sm">Subscribe to our newsletter for the latest updates and impact stories.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input 
                type="email"
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-primary/50" 
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
              >
                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : <>Subscribe <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Hearts Hands of Hope. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
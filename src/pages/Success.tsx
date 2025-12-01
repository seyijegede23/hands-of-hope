import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Heart, ArrowRight, Home } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-background px-4 py-20">
      <div className="max-w-md w-full bg-white dark:bg-card p-8 rounded-3xl shadow-xl border border-border/50 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Animated Icon */}
        <div className="relative mb-6 group">
           <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
           <div className="relative w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto flex items-center justify-center">
             <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
           </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">Donation Successful!</h1>
        
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Thank you for your generosity. Your contribution has been securely processed and is already making a difference.
        </p>

        {/* Receipt Box */}
        <div className="bg-secondary/30 rounded-xl p-4 mb-8 border border-border/50">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Hearts Hands of Hope</span>
          </div>
          <p className="text-xs text-muted-foreground">A receipt has been sent to your email.</p>
        </div>

        <div className="space-y-3">
          <Link to="/">
            <Button size="lg" className="w-full text-lg h-12 rounded-xl">
              <Home className="mr-2 w-5 h-5" /> Return Home
            </Button>
          </Link>
          <Link to="/programs">
             <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary">
               See where your money goes <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
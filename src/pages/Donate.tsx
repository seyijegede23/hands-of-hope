import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Heart, Shield, TrendingUp, Check, Calendar, CreditCard, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Donate = () => {
  const [amount, setAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [coverFees, setCoverFees] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const presetAmounts = [
    { value: "25", label: "Meals", desc: "Feeds a child for a week" },
    { value: "50", label: "Supplies", desc: "School kit for one term" },
    { value: "100", label: "Health", desc: "Medical checkup for two" },
    { value: "250", label: "Skills", desc: "Vocational training tools" },
  ];

  const currentAmount = customAmount ? parseFloat(customAmount) : parseFloat(amount);
  const processingFee = coverFees ? (currentAmount * 0.029) + 0.30 : 0;
  const totalAmount = currentAmount + processingFee;

  useEffect(() => {
    setAnimateHeart(true);
  }, []);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentAmount || currentAmount <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    setIsLoading(true);

    try {
      // Call the backend server
      const response = await fetch("https://heartofhopeserver1.vercel.app/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          mode: isMonthly ? "subscription" : "payment",
          isMonthly: isMonthly,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to the Stripe URL provided by the server
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }

    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error("Payment Failed", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-orange-500 z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
        
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <div className={cn("inline-block mb-6 transition-transform duration-700", animateHeart ? "scale-100" : "scale-0")}>
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md shadow-xl">
              <Heart className="h-12 w-12 text-white fill-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Invest in <span className="text-orange-200">Hope</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Your generosity is the fuel that powers our mission. 100% of your donation goes directly to community programs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative -mt-16 pb-20 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            
            {/* LEFT COLUMN: The Donation Card */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-card p-6 md:p-8 rounded-3xl shadow-xl border border-border/50">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-primary" />
                    Secure Donation
                  </h2>
                  
                  {/* Frequency Toggle */}
                  <div className="flex items-center bg-secondary rounded-full p-1 border border-border">
                    <button
                      type="button"
                      onClick={() => setIsMonthly(false)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        !isMonthly ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Give Once
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMonthly(true)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                        isMonthly ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Monthly <Heart className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleDonate} className="space-y-8">
                  {/* Preset Amounts Grid */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block text-muted-foreground">Select Amount (USD)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {presetAmounts.map((preset) => {
                         const isSelected = amount === preset.value && !customAmount;
                         return (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() => {
                              setAmount(preset.value);
                              setCustomAmount("");
                            }}
                            className={cn(
                              "relative group flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1",
                              isSelected
                                ? "border-primary bg-primary/5 shadow-md"
                                : "border-border hover:border-primary/50 hover:bg-secondary"
                            )}
                          >
                            <span className={cn("text-lg font-bold", isSelected ? "text-primary" : "text-foreground")}>
                              ${preset.value}
                            </span>
                            <span className="text-xs text-muted-foreground mt-1 font-medium">{preset.label}</span>
                            {isSelected && (
                              <div className="absolute -top-3 -right-3 bg-primary text-white p-1 rounded-full shadow-sm animate-in zoom-in">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Input */}
                  <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-border/50">
                     <div className="flex items-center justify-between">
                        <Label htmlFor="customAmount" className="text-sm font-medium text-muted-foreground">
                          Custom Amount
                        </Label>
                        {customAmount && <span className="text-xs text-primary font-medium animate-pulse">Custom amount active</span>}
                     </div>
                     
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">$</span>
                      <Input
                        id="customAmount"
                        type="number"
                        placeholder="Enter other amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount("");
                        }}
                        className="pl-10 h-14 text-2xl font-bold bg-white border-transparent shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Personal Information (Compact) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your name" className="h-11 bg-secondary/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="h-11 bg-secondary/20" />
                    </div>
                  </div>

                  {/* Fees Toggle */}
                  <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border/50">
                    <div className="flex items-center gap-3">
                       <Switch 
                          id="fees" 
                          checked={coverFees}
                          onCheckedChange={setCoverFees}
                       />
                       <Label htmlFor="fees" className="cursor-pointer">
                          <span className="font-medium">Cover transaction fees</span>
                          <span className="block text-xs text-muted-foreground">Add ${processingFee.toFixed(2)} so we get 100%</span>
                       </Label>
                    </div>
                    <span className="font-bold text-muted-foreground">+${processingFee.toFixed(2)}</span>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    variant="donate" 
                    size="lg" 
                    disabled={isLoading}
                    className="w-full text-lg shadow-lg hover:shadow-primary/25 h-16 rounded-2xl group relative overflow-hidden"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                         <Loader2 className="w-5 h-5 animate-spin" />
                         Processing...
                      </div>
                    ) : (
                      <>
                        <span className="mr-2">Donate</span> 
                        <span className="font-mono font-bold">${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        {isMonthly && <span className="ml-1 text-sm opacity-90">/mo</span>}
                        <Heart className="ml-2 w-5 h-5 group-hover:fill-current transition-all" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Impact Preview */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dynamic Impact Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-primary-foreground/80 font-medium mb-4 uppercase tracking-wider text-sm">
                    <Sparkles className="w-4 h-4" />
                    Your Impact
                  </div>
                  
                  <div className="text-4xl font-bold mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                       {isMonthly ? "Every month," : "Today,"} you {isMonthly ? "will" : "can"}
                    </span>
                  </div>
                  
                  <div className="min-h-[120px] flex flex-col justify-center">
                    {currentAmount < 50 ? (
                      <p className="text-xl leading-relaxed text-blue-100 animate-in fade-in slide-in-from-right-4">
                        Provide nutritious <span className="font-bold text-white">meals for a child</span> for an entire week.
                      </p>
                    ) : currentAmount < 100 ? (
                       <p className="text-xl leading-relaxed text-emerald-100 animate-in fade-in slide-in-from-right-4">
                        Supply essential <span className="font-bold text-white">school books and stationery</span> for a student's term.
                      </p>
                    ) : currentAmount < 250 ? (
                      <p className="text-xl leading-relaxed text-purple-100 animate-in fade-in slide-in-from-right-4">
                        Cover <span className="font-bold text-white">medical consultation & medicine</span> for a family of four.
                      </p>
                    ) : (
                      <p className="text-xl leading-relaxed text-amber-100 animate-in fade-in slide-in-from-right-4">
                        Fund <span className="font-bold text-white">vocational tools</span> to help a widow start a small business.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white dark:bg-card p-6 rounded-3xl shadow-sm border border-border/50">
                 <h3 className="font-bold text-lg mb-4">Donation Guarantee</h3>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Secure Payment</h4>
                        <p className="text-xs text-muted-foreground mt-1">256-bit SSL encryption keeps your data safe.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Transparency</h4>
                        <p className="text-xs text-muted-foreground mt-1">Quarterly financial reports sent to all donors.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Cancel Anytime</h4>
                        <p className="text-xs text-muted-foreground mt-1">Monthly donors can pause or cancel instantly.</p>
                      </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;

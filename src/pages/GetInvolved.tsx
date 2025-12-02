import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, Heart, Megaphone, 
  ArrowRight, CheckCircle2, Star, Mail, Phone, User, AlertCircle 
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const GetInvolved = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. State to store the form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    skills: "",
    availability: ""
  });

  // 2. State to store error messages
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle typing in fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  // 3. Validation Logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s()]*$/; // Allows numbers, +, -, spaces, ()

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone) || formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits)";
    }

    if (!formData.skills.trim()) newErrors.skills = "Please tell us about your skills";
    if (!formData.availability.trim()) newErrors.availability = "Please let us know your availability";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run validation before submitting
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send to backend
      const response = await fetch("https://heartofhopeserver1.vercel.app/apply-volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to send");
    
      toast.success("Application Received!", {
        description: "Welcome to the team! We'll be in touch within 48 hours.",
        icon: <CheckCircle2 className="text-green-500" />,
      });

      // Clear the form
      setFormData({ firstName: "", lastName: "", email: "", phone: "", skills: "", availability: "" });

    } catch (error) {
      console.error(error);
      toast.error("Submission Failed", {
        description: "Something went wrong. Please check your internet or try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToVolunteer = () => {
    const element = document.getElementById('volunteer-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const supportMethods = [
    {
      action: "scroll",
      icon: Users,
      title: "Volunteer",
      desc: "Join our hands-on team. Whether it's teaching, distributing food, or medical aid, your time changes lives.",
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "hover:border-rose-500/50"
    },
    {
      action: "link",
      path: "/donate",
      icon: Heart,
      title: "Donate",
      desc: "Financial support fuels our engines. 100% of public donations go directly to program execution.",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "hover:border-orange-500/50"
    },
    {
      action: "none",
      icon: Megaphone,
      title: "Advocate",
      desc: "Use your voice. Share our stories on social media and help us reach the people who need us most.",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "hover:border-blue-500/50"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* HERO SECTION */}
      <section className="relative py-24 lg:py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2000&auto=format&fit=crop" 
            alt="Volunteers working together" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40"></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Join 500+ Active Volunteers
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Be the Change <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
                You Want to See.
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              From on-ground fieldwork to digital advocacy, there is a place for your unique skills in our mission.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <Button 
                 onClick={scrollToVolunteer}
                 size="lg" 
                 className="bg-white text-slate-900 hover:bg-white/90 font-bold text-lg h-14 px-8"
               >
                 Start Volunteering
               </Button>
               <Link to="/donate">
                 <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-lg">
                   Make a Donation
                 </Button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WAYS TO SUPPORT GRID */}
      <section className="py-24 bg-slate-50 dark:bg-card/50 relative -mt-10 rounded-t-[3rem] z-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How You Can Help</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the path that fits your capacity. Every action counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {supportMethods.map((method, idx) => {
              const CardContent = (
                <>
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300", method.bg)}>
                    <method.icon className={cn("h-7 w-7", method.color)} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{method.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {method.desc}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    Get Started <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </>
              );

              const cardClasses = cn(
                "group relative bg-white dark:bg-card p-8 rounded-3xl shadow-sm border border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer",
                method.border
              );

              if (method.action === 'link') {
                return (
                  <Link key={method.title} to={method.path!} className={cardClasses}>
                    {CardContent}
                  </Link>
                );
              }
              
              if (method.action === 'scroll') {
                return (
                  <div key={method.title} onClick={scrollToVolunteer} className={cardClasses}>
                    {CardContent}
                  </div>
                );
              }

              return (
                <div key={method.title} className={cardClasses}>
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPLIT SECTION: FORM & INFO */}
      <section id="volunteer-form" className="py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-7xl mx-auto">
            
            {/* Left Column: Inspiration */}
            <div className="lg:w-5/12 space-y-8">
              <div>
                <span className="text-primary font-bold tracking-wider uppercase text-sm">Join the Team</span>
                <h2 className="text-4xl font-bold mt-2 mb-4">Become a Volunteer</h2>
                <p className="text-lg text-muted-foreground">
                  Our volunteers are the heartbeat of our organization. By joining us, you're not just giving time—you're building a legacy of hope.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                {[
                  "Gain hands-on experience in community development",
                  "Network with like-minded change-makers",
                  "Receive certificates and recommendation letters",
                  "Make a tangible difference in real lives"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>

              {/* Mini Testimonial */}
              <div className="bg-secondary/50 p-6 rounded-2xl border border-border/50">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Volunteering here changed my perspective on life. Seeing the direct impact of our work is incredibly fulfilling."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?img=32" alt="Volunteer" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Sarah Jenkins</p>
                    <p className="text-xs text-muted-foreground">Volunteer since 2019</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:w-7/12">
              <div className="bg-white dark:bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
                
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className={cn(errors.firstName && "text-red-500")}>First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="firstName" 
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Jane" 
                          className={cn("pl-10 h-11 bg-secondary/20", errors.firstName && "border-red-500 focus-visible:ring-red-500")}
                        />
                      </div>
                      {errors.firstName && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className={cn(errors.lastName && "text-red-500")}>Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe" 
                        className={cn("h-11 bg-secondary/20", errors.lastName && "border-red-500 focus-visible:ring-red-500")}
                      />
                      {errors.lastName && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className={cn(errors.email && "text-red-500")}>Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jane@example.com" 
                          className={cn("pl-10 h-11 bg-secondary/20", errors.email && "border-red-500 focus-visible:ring-red-500")}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className={cn(errors.phone && "text-red-500")}>Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 800 000 0000" 
                          className={cn("pl-10 h-11 bg-secondary/20", errors.phone && "border-red-500 focus-visible:ring-red-500")}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills" className={cn(errors.skills && "text-red-500")}>Skills & Interests</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="Tell us about your skills (e.g. Teaching, Medical, Logistics) and what drives you..."
                      rows={4}
                      className={cn("bg-secondary/20 resize-none", errors.skills && "border-red-500 focus-visible:ring-red-500")}
                    />
                    {errors.skills && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.skills}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability" className={cn(errors.availability && "text-red-500")}>Availability</Label>
                    <Textarea
                      id="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="e.g. Weekends, Tuesday evenings, remote only..."
                      rows={2}
                      className={cn("bg-secondary/20 resize-none", errors.availability && "border-red-500 focus-visible:ring-red-500")}
                    />
                     {errors.availability && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.availability}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GetInvolved;

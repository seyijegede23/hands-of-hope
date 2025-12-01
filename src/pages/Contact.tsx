import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram, Send, Loader2, Clock, Globe } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Connect to your Backend
      const response = await fetch("http://localhost:3000/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });

    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      
      {/* Header Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-slate-300 font-light">
            Have questions about our programs, partnerships, or how to get involved? 
            We're here to help.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {/* LEFT COLUMN: Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Main Info Card */}
            <div className="bg-white dark:bg-card p-8 rounded-3xl shadow-xl border border-border/50 space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" /> Contact Details
                </h3>
                
                <div className="space-y-6">
                  {/* Phone - Clickable */}
                  <a href="tel:+2348001234567" className="flex items-start gap-4 group hover:bg-secondary/50 p-3 -mx-3 rounded-xl transition-colors">
                    <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:scale-110 transition-transform">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Call Us</p>
                      <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        +234 800 123 4567
                      </p>
                    </div>
                  </a>

                  {/* Email - Clickable */}
                  <a href="mailto:info@heartshandsofhope.org" className="flex items-start gap-4 group hover:bg-secondary/50 p-3 -mx-3 rounded-xl transition-colors">
                    <div className="p-3 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 group-hover:scale-110 transition-transform">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Email Us</p>
                      <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors break-all">
                        info@heartshandsofhope.org
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start gap-4 p-3 -mx-3">
                    <div className="p-3 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Visit Us</p>
                      <p className="text-base font-medium text-foreground">
                        123 Hope Street, Ottawa,Canda
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-6 border-t border-border">
                <p className="font-semibold mb-4 text-sm">Follow our journey</p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </a>
                  {/* Add more social icons here if needed */}
                </div>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Office Hours
              </h3>
              <ul className="space-y-4 text-sm opacity-90 relative z-10">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mon - Fri</span>
                  <span className="font-mono">9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Saturday</span>
                  <span className="font-mono">10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between text-rose-300">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border/50 h-full">
              <h2 className="text-3xl font-bold mb-2">Send a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Jane" 
                      required 
                      className="h-12 bg-secondary/30 border-transparent focus:bg-background transition-all"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      required 
                      className="h-12 bg-secondary/30 border-transparent focus:bg-background transition-all"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="jane@example.com" 
                    required 
                    className="h-12 bg-secondary/30 border-transparent focus:bg-background transition-all"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Inquiry about..." 
                    required 
                    className="h-12 bg-secondary/30 border-transparent focus:bg-background transition-all"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you today?"
                    rows={6}
                    required
                    className="bg-secondary/30 border-transparent focus:bg-background resize-none transition-all p-4"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all rounded-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
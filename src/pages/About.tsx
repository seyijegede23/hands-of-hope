import { Heart, Target, Eye, Award, CheckCircle2, ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We lead with empathy and care, ensuring every individual feels seen, valued, and supported.",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      icon: Target,
      title: "Impact",
      description: "We focus on creating measurable, lasting change that strengthens individuals and entire communities.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We uphold honesty and accountability in all our programs, finances, and operations.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We pursue the highest standards, continuously improving and innovating for greater outcomes.",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const team = [
    { 
      name: "Dr. Amara Okafor", 
      role: "Executive Director", 
      image: "https://i.pravatar.cc/300?img=24",
      bio: "Former UN diplomat with 15 years of experience in humanitarian aid."
    },
    { 
      name: "Chidi Eze", 
      role: "Program Director", 
      image: "https://i.pravatar.cc/300?img=11",
      bio: "Expert in sustainable development and community outreach strategies."
    },
    { 
      name: "Ngozi Williams", 
      role: "Community Outreach Lead", 
      image: "https://i.pravatar.cc/300?img=5",
      bio: "Passionate advocate for youth education and women's empowerment."
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative py-32 lg:py-40 flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-rose-50 dark:from-background dark:to-secondary/20 z-0" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rose-100/40 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-orange-100/40 to-transparent blur-3xl" />
        
        <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-rose-200 text-rose-600 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm">
            <Heart className="w-4 h-4 fill-current" />
            <span>Since 2015</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-slate-900 dark:text-white animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Driven by love, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
              united by hope.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            We are dedicated to empowering lives through compassion, care, and sustainable community development across the region.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 bg-white dark:bg-card border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Image Grid */}
            <div className="w-full lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" 
                  alt="Volunteers" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover -translate-y-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop" 
                  alt="Community Support" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover translate-y-8"
                />
              </div>
              {/* Decorative circle */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent rounded-full blur-3xl -z-10" />
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-foreground">Our Story</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2015, <span className="font-semibold text-foreground">Hearts Hands of Hope</span> began as a humble volunteer effort in a small garage, dedicated to uplifting vulnerable families in our immediate neighborhood.
                  </p>
                  <p>
                    What started with a handful of passionate individuals packing food boxes has blossomed into a fully established organization serving thousands across the region. Our growth is a testament to the power of collective kindness.
                  </p>
                  <p>
                    Today, we don't just provide aid; we collaborate with communities to understand their unique challenges and co-create sustainable solutions that inspire long-term transformation.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  "50+ Communities Served",
                  "10k+ Lives Impacted",
                  "500+ Active Volunteers",
                  "98% Fund Efficiency"
                ].map((stat) => (
                  <div key={stat} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-slate-50 dark:bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="group relative overflow-hidden bg-white dark:bg-card p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 text-rose-600 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To empower underserved communities through sustainable initiatives in education, healthcare, nutrition, and economic development—creating pathways to hope, dignity, and self-sufficiency.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative overflow-hidden bg-white dark:bg-card p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A world where every individual—regardless of background or circumstance—has the resources, opportunities, and support needed to thrive and achieve their full potential.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">What Drives Us</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              These principles shape our identity and fuel our commitment to meaningful service every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-card border border-border/50 p-8 rounded-3xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-6", value.bg)}>
                  <value.icon className={cn("h-7 w-7", value.color)} />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section className="py-24 bg-slate-50 dark:bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">Meet Our Leadership</h2>
              <p className="text-lg text-muted-foreground">
                The passionate individuals guiding our mission and strengthening communities.
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              View Full Team <ArrowRight className="ml-2 w-4 h-4"/>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="group bg-white dark:bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  {/* Social Links overlaid on hover */}
                  <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-primary transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-primary transition-colors">
                      <Twitter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Button variant="outline" className="w-full">
              View Full Team
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
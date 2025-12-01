import Hero from "@/components/Hero";
import ProgramCard from "@/components/ProgramCard";
import ImpactCounter from "@/components/ImpactCounter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Globe, ArrowRight } from "lucide-react";
import foodImage from "@/assets/program-food.jpg";
import educationImage from "@/assets/program-education.jpg";
import healthImage from "@/assets/program-health.jpg";
import empowermentImage from "@/assets/program-empowerment.jpg";

const Index = () => {
  const programs = [
    {
      title: "Food & Nutrition",
      description: "Providing nutritious meals and food supplies to families and communities in need, ensuring no one goes hungry.",
      image: foodImage,
      slug: "food-nutrition",
    },
    {
      title: "Education Support",
      description: "Empowering children and youth through quality education, scholarships, and learning resources.",
      image: educationImage,
      slug: "education",
    },
    {
      title: "Healthcare Access",
      description: "Delivering essential healthcare services and medical support to underserved communities.",
      image: healthImage,
      slug: "healthcare",
    },
    {
      title: "Community Empowerment",
      description: "Building skills and creating opportunities for sustainable livelihoods and economic independence.",
      image: empowermentImage,
      slug: "empowerment",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Programs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work across multiple areas to create lasting positive change in the lives of those we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {programs.map((program, index) => (
              <div key={program.slug} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProgramCard {...program} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/programs">
              <Button variant="outline" size="lg">
                View All Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Together, we're making a real difference in communities across the region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <ImpactCounter end={15000} label="Lives Touched" suffix="+" />
            <ImpactCounter end={250} label="Projects Completed" suffix="+" />
            <ImpactCounter end={500} label="Active Volunteers" suffix="+" />
          </div>
        </div>
      </section>

      {/* Why Support Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Support Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your contribution creates ripples of positive change that extend far beyond the moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 animate-slide-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparent Impact</h3>
              <p className="text-muted-foreground">
                Every donation is tracked and reported, so you can see exactly how your support makes a difference.
              </p>
            </div>

            <div className="text-center p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community-Led</h3>
              <p className="text-muted-foreground">
                We work directly with communities to ensure programs meet real needs and create lasting change.
              </p>
            </div>

            <div className="text-center p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Solutions</h3>
              <p className="text-muted-foreground">
                Our programs focus on long-term empowerment, not just immediate relief, for sustainable impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join our community of changemakers and help us create a brighter future for those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button variant="outline" size="lg" className="bg-white hover:bg-white/90 text-foreground border-white">
                Donate Now
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button variant="outline" size="lg" className="bg-transparent hover:bg-white/10 text-white border-white">
                Volunteer With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

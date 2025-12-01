import ImpactCounter from "@/components/ImpactCounter";
import { Quote } from "lucide-react";

const Impact = () => {
  const testimonials = [
    {
      name: "Adanna Johnson",
      role: "Scholarship Recipient",
      quote: "Thanks to Hearts Hands of Hope, I was able to complete my education. Now I'm studying to become a nurse so I can give back to my community.",
      initial: "AJ",
    },
    {
      name: "Emmanuel Nwankwo",
      role: "Small Business Owner",
      quote: "The entrepreneurship training and microfinance support helped me start my tailoring business. I can now support my family and employ two others.",
      initial: "EN",
    },
    {
      name: "Grace Adebayo",
      role: "Community Leader",
      quote: "The healthcare program brought life-saving medical services to our village. We're grateful for the compassion and care shown to our people.",
      initial: "GA",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-warm text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Our Impact</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 animate-slide-up">
            Real stories of transformation and measurable outcomes from our community programs.
          </p>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">By the Numbers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our collective efforts have created measurable, positive change across communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <ImpactCounter end={15000} label="Lives Touched" suffix="+" />
            <ImpactCounter end={250} label="Projects Completed" suffix="+" />
            <ImpactCounter end={500} label="Active Volunteers" suffix="+" />
            <ImpactCounter end={50000} label="Meals Served" suffix="+" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <ImpactCounter end={200} label="Students Supported" suffix="+" />
            <ImpactCounter end={5000} label="Healthcare Visits" suffix="+" />
            <ImpactCounter end={100} label="Businesses Started" suffix="+" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stories of Hope</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear directly from the people whose lives have been transformed through our programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-card p-8 rounded-2xl shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="h-10 w-10 text-accent mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-warm text-white font-bold flex items-center justify-center">
                    {testimonial.initial}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Areas of Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our programs create positive change across multiple dimensions of community wellbeing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                title: "Education & Skills Development",
                description: "Providing scholarships, school supplies, and vocational training to empower the next generation with knowledge and skills.",
              },
              {
                title: "Health & Nutrition",
                description: "Ensuring access to healthcare services, nutritious food, and health education for vulnerable populations.",
              },
              {
                title: "Economic Empowerment",
                description: "Supporting entrepreneurship, job creation, and financial literacy to build sustainable livelihoods.",
              },
              {
                title: "Community Development",
                description: "Strengthening social infrastructure and fostering community leadership for long-term resilience.",
              },
            ].map((area, index) => (
              <div
                key={area.title}
                className="bg-card p-6 rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;

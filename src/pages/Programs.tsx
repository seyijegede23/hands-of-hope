import ProgramCard from "@/components/ProgramCard";
import foodImage from "@/assets/program-food.jpg";
import educationImage from "@/assets/program-education.jpg";
import healthImage from "@/assets/program-health.jpg";
import empowermentImage from "@/assets/program-empowerment.jpg";

const Programs = () => {
  const programs = [
    {
      title: "Food & Nutrition Program",
      description:
        "We provide nutritious meals, food supplies, and nutrition education to communities facing food insecurity. Our goal is to ensure no family goes hungry while promoting healthy living.",
      image: foodImage,
      slug: "food-nutrition",
      details: [
        "Monthly food distribution to 500+ families",
        "Hot meal services at community centers",
        "Nutrition education workshops",
        "School feeding programs for children",
      ],
    },
    {
      title: "Education Support",
      description:
        "Education opens doors to a better future. We provide scholarships, mentorships, school supplies, and digital literacy training to empower children and young adults.",
      image: educationImage,
      slug: "education",
      details: [
        "Scholarships for 200+ students annually",
        "After-school tutoring programs",
        "Book and school supply donations",
        "Digital literacy training",
      ],
    },
    {
      title: "Healthcare Access",
      description:
        "Everyone deserves access to healthcare. Our programs include medical outreach, free screenings, health education, and the distribution of essential medical supplies.",
      image: healthImage,
      slug: "healthcare",
      details: [
        "Monthly free health clinics",
        "Medical supply distribution",
        "Health education workshops",
        "Partnerships with healthcare providers",
      ],
    },
    {
      title: "Community Empowerment",
      description:
        "We equip individuals with practical skills, financial support, and leadership training to build sustainable livelihoods and break cycles of poverty.",
      image: empowermentImage,
      slug: "empowerment",
      details: [
        "Vocational skills training",
        "Microfinance and business support",
        "Women’s empowerment programs",
        "Youth leadership development",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-warm text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 animate-fade-in tracking-tight">
            Our Programs
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 animate-slide-up leading-relaxed">
            Initiatives designed to meet essential needs, empower individuals,
            and create long-term transformation in communities.
          </p>
        </div>
      </section>

      {/* Programs Cards Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto mb-24">
            {programs.slice(0, 4).map((program, index) => (
              <div
                key={program.slug}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <ProgramCard {...program} />
              </div>
            ))}
          </div>

          {/* Detailed Program Sections */}
          <div className="max-w-6xl mx-auto space-y-20">
            {programs.map((program, index) => (
              <section
                key={program.slug}
                id={program.slug}
                className="bg-card rounded-3xl shadow-md shadow-card p-10 lg:p-14 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div>
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-72 object-cover rounded-2xl shadow-sm"
                    />
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-3xl font-bold tracking-tight">
                      {program.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>

                    <h3 className="text-lg font-semibold mt-6">
                      Key Activities:
                    </h3>

                    <ul className="space-y-3">
                      {program.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2.5 h-2.5 mt-2 rounded-full bg-primary"></span>
                          <p className="text-muted-foreground">{detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;

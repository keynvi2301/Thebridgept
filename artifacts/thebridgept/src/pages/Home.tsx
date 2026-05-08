import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, X, CheckCircle, Activity, Heart, ArrowRight, UserCheck, Stethoscope } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans relative">
      {/* Navbar */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
        data-testid="header-nav"
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
            className="text-2xl font-serif font-bold text-primary cursor-pointer tracking-tight"
            onClick={() => scrollToSection("hero")}
            data-testid="link-logo"
          >
            TheBridgePT
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["about", "services", "how-it-works", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors capitalize tracking-wide"
                data-testid={`link-nav-${section}`}
              >
                {section.replace("-", " ")}
              </button>
            ))}
            <Button 
              onClick={() => window.open("https://wa.me/918347920492", "_blank")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full px-6"
              data-testid="button-nav-book"
            >
              Book Session
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg py-4 px-4 flex flex-col gap-4 border-t">
            {["about", "services", "how-it-works", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-left py-2 text-foreground font-medium capitalize"
                data-testid={`link-mobile-nav-${section}`}
              >
                {section.replace("-", " ")}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section id="hero" className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Heart size={14} />
                <span>Private Physiotherapy in Ahmedabad</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
                Bridging the Gap Between <span className="text-primary italic">Pain</span> and <span className="text-primary italic">Perfect Movement.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                1-on-1 personalized physiotherapy care and home visits in Ahmedabad.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded-full px-8 h-14 text-base shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open("https://wa.me/918347920492", "_blank")}
                  data-testid="button-hero-whatsapp"
                >
                  <SiWhatsapp className="mr-2 h-5 w-5" />
                  Book Your Session
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-primary/20 hover:bg-primary/5"
                  onClick={() => scrollToSection("how-it-works")}
                  data-testid="button-hero-learn-more"
                >
                  How It Works
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
              >
                <div className="relative max-w-md mx-auto">
                  <div className="aspect-square rounded-full overflow-hidden bg-primary/10 border-8 border-background shadow-xl flex items-center justify-center relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                      alt="Dr. Janvi Sarvaiya" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-background rounded-2xl p-4 shadow-lg border border-border/50 z-20">
                    <p className="font-serif font-bold text-lg text-primary">Dr. Janvi Sarvaiya</p>
                    <p className="text-sm text-muted-foreground">Founder & Lead PT</p>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute top-1/2 -left-8 w-16 h-16 bg-secondary rounded-full -z-10" />
                  <div className="absolute -bottom-4 right-1/4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                  Meet Dr. Janvi Sarvaiya (PT)
                </motion.h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg font-light">
                  <motion.p variants={fadeUp}>
                    Welcome! I am Dr. Janvi Sarvaiya (PT), a dedicated physiotherapist and the founder of TheBridgePT. I am deeply passionate about helping people overcome musculoskeletal pain, recover from injuries, and regain their independence.
                  </motion.p>
                  <motion.p variants={fadeUp}>
                    My mission is simple: to provide focused, one-on-one personalized care that empowers you to move better, feel better, and live a pain-free life.
                  </motion.p>
                  <motion.p variants={fadeUp}>
                    At TheBridgePT, I believe that no two bodies are the same, and neither are their recoveries. I treat every patient as an individual — understanding your unique lifestyle, your goals, and your body's specific needs before crafting a recovery plan that's truly built for you.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center max-w-2xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
                Specialized Care & Treatments
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg">
                Comprehensive physiotherapy solutions tailored to your unique recovery journey.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Who I Help */}
              <motion.div 
                className="bg-background rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <UserCheck size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 text-foreground">Who I Help</h3>
                <ul className="space-y-3">
                  {[
                    "Athletes & Sports persons",
                    "Elderly patients",
                    "Office workers with back/neck pain",
                    "Post joint replacement patients",
                    "Anyone with musculoskeletal pain"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                      <span className="text-foreground/80 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Core Treatments */}
              <motion.div 
                className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-6">
                  <Heart size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4">Core Treatments</h3>
                <ul className="space-y-3">
                  {[
                    "Post-surgery rehabilitation",
                    "Sports injury recovery",
                    "Chronic pain management",
                    "Stroke & neurological recovery"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/80 mt-2 shrink-0" />
                      <span className="text-white/90 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Advanced Techniques */}
              <motion.div 
                className="bg-background rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold mb-4 text-foreground">Advanced Techniques</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Manual therapy",
                    "Cupping therapy",
                    "Ergonomic assessments",
                    "Kinesio taping",
                    "IASTM"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                      <span className="text-foreground/80 text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border/50 mt-auto">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Packages Available</p>
                  <p className="text-sm text-foreground/80 mt-1">Single sessions & bundled recovery packages.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div 
                className="w-full lg:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
                  The Recovery Process
                </motion.h2>
                <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-10">
                  A structured, evidence-based approach to get you moving pain-free.
                </motion.p>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {[
                    { title: "Consultation", desc: "Understanding your history and current symptoms." },
                    { title: "Assessment", desc: "Thorough physical evaluation of movement and pain." },
                    { title: "Personalized Plan", desc: "Creating a custom roadmap for your specific goals." },
                    { title: "Treatment", desc: "One-on-one sessions using advanced techniques." },
                    { title: "Recovery", desc: "Regaining strength, mobility, and independence." }
                  ].map((step, index) => (
                    <motion.div key={index} variants={fadeUp} className="relative flex items-center gap-6">
                      <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary text-primary font-bold text-sm z-10 shadow-sm shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-serif font-bold text-foreground">{step.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="w-full lg:w-1/2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="bg-background rounded-3xl p-8 md:p-10 border border-border shadow-lg">
                  <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <Stethoscope className="text-primary" />
                    Service Model
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-secondary/30 border border-secondary/50">
                      <h4 className="font-bold text-foreground flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Mobile Physiotherapy
                      </h4>
                      <p className="text-sm text-muted-foreground">Expert care delivered in the comfort of your home. You don't have to travel in pain; I come to you.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-secondary/30 border border-secondary/50">
                      <h4 className="font-bold text-foreground flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Online Telehealth Consultations
                      </h4>
                      <p className="text-sm text-muted-foreground">Remote assessment and guided exercises available for those who prefer or require virtual care.</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">Service Areas</p>
                      <p className="text-lg font-serif font-medium text-foreground">Bareja, Ahmedabad</p>
                      <p className="text-sm text-muted-foreground">Pin code: 382425</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center bg-background rounded-[3rem] p-10 md:p-16 shadow-xl border border-border"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                Ready to Start Your Recovery?
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                Let's discuss your symptoms, formulate a plan, and get you back to doing what you love. Please contact me directly to inquire about pricing and availability.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Button 
                  size="lg" 
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded-full px-10 h-16 text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  onClick={() => window.open("https://wa.me/918347920492", "_blank")}
                  data-testid="button-contact-whatsapp"
                >
                  <SiWhatsapp className="mr-3 h-6 w-6" />
                  Chat on WhatsApp
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background py-10 border-t border-border">
        <div className="container mx-auto px-4 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif font-bold text-lg text-foreground">TheBridgePT</p>
          <p className="text-sm text-muted-foreground">© 2026 TheBridgePT. All rights reserved.</p>
          <p className="text-sm text-muted-foreground font-medium">Dr. Janvi Sarvaiya (PT)</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918347920492"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 animate-[pulse_2s_infinite]"
        data-testid="button-floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <SiWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
}
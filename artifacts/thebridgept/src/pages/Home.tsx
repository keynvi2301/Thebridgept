import { motion, type Variants } from "framer-motion";
import { Menu, X, CheckCircle, Activity, Heart, UserCheck, Stethoscope, ChevronLeft, ChevronRight, Star, Send, CheckCircle2, Linkedin, Instagram, Plus } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useListTestimonials, useSubmitTestimonial } from "@workspace/api-client-react";
import logoSrc from "@assets/8091f93f-82a7-472d-a344-02b2eedf6658_1778220687613.jpeg";
import drJanviPhoto from "@assets/1DBBDB17-A3ED-48C2-A590-C51B40AA8790_1778224227492.jpeg";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
          {q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-300 ${
            open ? "rotate-45 bg-primary text-primary-foreground border-primary" : ""
          }`}
        >
          <Plus size={15} />
        </span>
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4 text-muted-foreground leading-relaxed text-sm md:text-base pr-12"
        >
          {a}
        </motion.p>
      )}
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);

  const fallbackTestimonials = [
    { id: -1, name: "Priya Mehta", role: "Office Professional", quote: "I had been struggling with lower back pain for over two years. After just six sessions with Dr. Janvi, I was pain-free and back at my desk without discomfort. The home visits made it so easy — no travelling in pain.", stars: 5, status: "approved", createdAt: new Date().toISOString() },
    { id: -2, name: "Arjun Shah", role: "Amateur Cricketer", quote: "I tore my rotator cuff mid-season and thought my year was over. Dr. Janvi's sports rehabilitation plan had me back on the field faster than I ever imagined. Incredibly knowledgeable and genuinely invested in my recovery.", stars: 5, status: "approved", createdAt: new Date().toISOString() },
    { id: -3, name: "Rekha Patel", role: "Post Knee Replacement Patient", quote: "After my knee replacement, I was nervous about physiotherapy. Dr. Janvi was patient, thorough, and explained every step. Within three months I was climbing stairs comfortably. I recommend TheBridgePT to everyone.", stars: 5, status: "approved", createdAt: new Date().toISOString() },
    { id: -4, name: "Vikram Desai", role: "Senior, Age 68", quote: "The telehealth consultation was a blessing. Dr. Janvi assessed my posture and movement over video and gave me a clear exercise program. My mobility has improved significantly and I feel years younger.", stars: 5, status: "approved", createdAt: new Date().toISOString() },
    { id: -5, name: "Nisha Trivedi", role: "Marathon Runner", quote: "Persistent shin splints were ruining my training. Dr. Janvi used IASTM and Kinesio taping techniques I had never experienced before. The results were remarkable. I completed my marathon pain-free.", stars: 5, status: "approved", createdAt: new Date().toISOString() },
  ];

  const { data: apiTestimonials } = useListTestimonials();
  const testimonials = (apiTestimonials && apiTestimonials.length > 0) ? apiTestimonials : fallbackTestimonials;

  const reviewSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.string().min(2, "Please describe your role or condition"),
    quote: z.string().min(20, "Please write at least 20 characters"),
    stars: z.number().min(1).max(5),
  });

  type ReviewFormValues = z.infer<typeof reviewSchema>;

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", role: "", quote: "", stars: 5 },
  });

  const submitMutation = useSubmitTestimonial({
    mutation: {
      onSuccess: () => {
        setSubmitSuccess(true);
        form.reset();
      },
    },
  });

  const onSubmitReview = (values: ReviewFormValues) => {
    submitMutation.mutate({ data: values });
  };

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

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

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
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
            className="cursor-pointer"
            onClick={() => scrollToSection("hero")}
            data-testid="link-logo"
          >
            <img src={logoSrc} alt="TheBridgePT" className="h-12 w-auto object-contain" />
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
                      src={drJanviPhoto}
                      alt="Dr. Janvi Sarvaiya" 
                      className="w-full h-full object-cover object-top"
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

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-secondary/20 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
                Patient Stories
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Real Recoveries, Real Results
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Button
                  variant="outline"
                  onClick={() => { setSubmitSuccess(false); setShowReviewModal(true); }}
                  className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  data-testid="button-share-review"
                >
                  <Star size={15} className="mr-2" />
                  Share Your Experience
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {/* Card */}
              <div className="relative bg-background rounded-3xl shadow-xl border border-border/50 px-8 py-10 md:px-14 md:py-14 min-h-[280px] flex flex-col justify-between overflow-hidden">
                {/* Quote mark */}
                <span className="absolute top-6 left-8 text-8xl font-serif text-primary/10 leading-none select-none">"</span>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6" data-testid="testimonial-stars">
                    {Array.from({ length: testimonials[activeTestimonial].stars }).map((_, i) => (
                      <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <motion.p
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light italic mb-8"
                    data-testid={`testimonial-quote-${activeTestimonial}`}
                  >
                    "{testimonials[activeTestimonial].quote}"
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    key={`author-${activeTestimonial}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-base font-serif shrink-0">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground" data-testid={`testimonial-name-${activeTestimonial}`}>
                        {testimonials[activeTestimonial].name}
                      </p>
                      <p className="text-sm text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-8">
                {/* Dot indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeTestimonial
                          ? "w-8 h-2.5 bg-primary"
                          : "w-2.5 h-2.5 bg-border hover:bg-primary/40"
                      }`}
                      data-testid={`testimonial-dot-${i}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="flex gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    data-testid="button-testimonial-prev"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                    data-testid="button-testimonial-next"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
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

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center max-w-2xl mx-auto mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
                FAQs
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Common Questions Answered
              </motion.h2>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto divide-y divide-border"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  q: "What should I bring to my first session?",
                  a: "Just wear comfortable, loose-fitting clothing that allows easy access to the area being treated. Bring any previous medical reports, X-rays, MRI scans, or discharge summaries you have. For home visits, simply clear a small space — Dr. Janvi brings all necessary equipment.",
                },
                {
                  q: "How do home visits work?",
                  a: "After you book via WhatsApp, Dr. Janvi will confirm an appointment time and come directly to your home in Bareja or Ahmedabad (pin code 382425). You receive the same quality of hands-on physiotherapy care without the discomfort of travelling in pain.",
                },
                {
                  q: "What conditions do you treat?",
                  a: "TheBridgePT treats a wide range of musculoskeletal and neurological conditions — including back and neck pain, sports injuries, post-surgical rehabilitation, joint replacement recovery, stroke rehabilitation, chronic pain, and ergonomic-related conditions from desk work.",
                },
                {
                  q: "How many sessions will I need?",
                  a: "Every recovery is different. After an initial assessment, Dr. Janvi will give you a personalised estimate. Acute conditions may resolve in 4–6 sessions, while complex or chronic conditions may require a longer programme. Both single sessions and bundled recovery packages are available.",
                },
                {
                  q: "Are telehealth consultations as effective as in-person sessions?",
                  a: "For assessments, guided exercise programmes, and follow-up consultations, telehealth works very well. Hands-on treatments like manual therapy, cupping, or IASTM require an in-person or home visit session. Dr. Janvi will recommend the right format for your specific needs.",
                },
                {
                  q: "How do I book and what does it cost?",
                  a: "Simply message Dr. Janvi directly on WhatsApp to enquire about availability, discuss your symptoms, and get pricing information. Pricing is provided personally based on the type of session, your location, and the treatment plan required.",
                },
                {
                  q: "Is physiotherapy painful?",
                  a: "Treatment should never be excessively painful. You may feel some discomfort during hands-on therapy or targeted exercises — this is normal and a sign that the right areas are being worked on. Dr. Janvi always works within your comfort level and adjusts techniques accordingly.",
                },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <FaqItem q={item.q} a={item.a} />
                </motion.div>
              ))}
            </motion.div>
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
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <img src={logoSrc} alt="TheBridgePT" className="h-10 w-auto object-contain" />
          <p className="text-sm text-muted-foreground">© 2026 TheBridgePT. All rights reserved. · Dr. Janvi Sarvaiya (PT)</p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/dr-janvi-sarvaiya-pt-0b6385282"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white transition-all"
              data-testid="link-linkedin"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://www.instagram.com/thejanvisarvaiya"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white transition-all"
              data-testid="link-instagram"
              aria-label="Instagram profile"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://wa.me/918347920492"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#25D366] hover:text-white transition-all"
              data-testid="link-footer-whatsapp"
              aria-label="WhatsApp"
            >
              <SiWhatsapp size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* Review Submission Modal */}
      <Dialog open={showReviewModal} onOpenChange={(open) => { setShowReviewModal(open); if (!open) setSubmitSuccess(false); }}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-8" data-testid="dialog-review">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-foreground">Share Your Experience</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Your review will be published on the website immediately.
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="flex flex-col items-center text-center py-8 gap-4" data-testid="review-success">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground">Thank you!</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Your review is now live on the website. Thank you for taking the time to share your experience!
              </p>
              <Button
                className="rounded-full mt-2"
                onClick={() => { setShowReviewModal(false); setSubmitSuccess(false); }}
                data-testid="button-review-done"
              >
                Done
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-5 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Priya Mehta" {...field} data-testid="input-review-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role / Condition</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Office Professional" {...field} data-testid="input-review-role" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="stars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="flex gap-2" data-testid="input-review-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoverStar(star)}
                              onMouseLeave={() => setHoverStar(0)}
                              onClick={() => field.onChange(star)}
                              className="focus:outline-none transition-transform hover:scale-110"
                              data-testid={`star-${star}`}
                              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                            >
                              <Star
                                size={28}
                                className={
                                  star <= (hoverStar || field.value)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/30"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quote"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Review</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your experience with Dr. Janvi and how TheBridgePT helped you..."
                          className="resize-none min-h-[120px]"
                          {...field}
                          data-testid="input-review-quote"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full rounded-full h-12 text-base"
                  disabled={submitMutation.isPending}
                  data-testid="button-review-submit"
                >
                  {submitMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Submit Review
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

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
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "../components/Scene";
import { ArrowRight, CheckCircle2, Globe, Bot, Cpu, ChevronDown, Star, Plus, Minus, Rocket, ShoppingBag, Leaf, Loader2, X } from "lucide-react";

type Service = {
  title: string;
  icon: JSX.Element;
  description: string;
  bullets: string[];
};

const services: Service[] = [
  {
    title: "Immersive Digital Experiences",
    icon: <Globe className="w-10 h-10 text-cyan-400" />,
    description: "Next-generation web development featuring 3D visuals, motion graphics, and high-performance architecture.",
    bullets: ["Full-Stack Web Development (A-Z)", "3D Effects & WebGL", "Advanced Motion Animations", "Interactive User Journeys"]
  },
  {
    title: "Enterprise AI Intelligence",
    icon: <Bot className="w-10 h-10 text-purple-400" />,
    description: "Custom generative AI solutions trained on your proprietary data to revolutionize business operations.",
    bullets: ["Custom LLM Training & Fine-Tuning", "Intelligent Business Chatbots", "Generative AI Development", "Automated Workflow Systems"]
  },
  {
    title: "Dominant Growth Ecosystem",
    icon: <Rocket className="w-10 h-10 text-pink-400" />,
    description: "A holistic marketing powerhouse designed to scale your brand aggressively across all channels.",
    bullets: ["Performance Marketing (Ads)", "SEO & Organic Growth", "Brand Identity & Strategy", "Social Media Dominance"]
  }
];

const testimonials = [
  {
    name: "Aditya Mehta",
    role: "Founder, TechSpire Solutions",
    logo: <Cpu className="w-8 h-8 text-cyan-400" />,
    content: "GrowthMantra completely transformed our digital presence. Their AI automation tools saved us countless hours and the lead generation campaign delivered results from day one."
  },
  {
    name: "Priya Sharma",
    role: "Marketing Director, Elevate Fashion",
    logo: <ShoppingBag className="w-8 h-8 text-purple-400" />,
    content: "The team's understanding of the Indian market is exceptional. Our social media engagement skyrocketed, and the new website funnel is converting at 4.5%. Highly recommended!"
  },
  {
    name: "Rahul Verma",
    role: "CEO, GreenLeaf Organics",
    logo: <Leaf className="w-8 h-8 text-green-400" />,
    content: "Professional, data-driven, and creative. They didn't just build a website; they built a growth engine for our brand. The SEO results have been phenomenal."
  }
];

const faqs = [
  {
    question: "What makes GrowthMantra different?",
    answer: "We combine creative marketing with advanced AI technology. Unlike traditional agencies, we build intelligent systems that automate growth, ensuring you get scalable and consistent results."
  },
  {
    question: "Do you work with startups?",
    answer: "Absolutely! We love helping ambitious startups scale. We have tailored packages designed specifically for early-stage growth and can scale our services as your business expands."
  },
  {
    question: "How long does it take to see results?",
    answer: "It depends on the service. Performance marketing can yield results in days, while SEO and brand building are long-term plays (3-6 months). We provide a clear timeline and roadmap for every project."
  },
  {
    question: "What is your pricing model?",
    answer: "We offer both project-based and retainer models. After our initial consultation, we'll recommend the best structure for your specific goals and budget, ensuring maximum ROI."
  }
];

const StatItem: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="text-center p-6 glass-card rounded-2xl border-t border-white/10"
  >
    <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">{value}</div>
    <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{label}</div>
  </motion.div>
);

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      layout
      onClick={() => setIsOpen(!isOpen)}
      className={`group glass-card p-8 hover:bg-white/5 transition-all duration-500 cursor-pointer overflow-hidden relative ${isOpen ? 'ring-1 ring-cyan-500/50 bg-white/10' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div layout className="flex items-start justify-between relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-slate-950/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300 shadow-lg shrink-0">
          {service.icon}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-slate-500 group-hover:text-cyan-400 transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      <motion.h4 layout className="text-2xl font-bold mb-3 text-slate-100 group-hover:text-cyan-300 transition-colors">{service.title}</motion.h4>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden relative z-10"
      >
        <p className="text-slate-300 mb-6 text-base leading-relaxed pt-2">{service.description}</p>
        <ul className="space-y-3 pb-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
              <span>{b}</span>
            </li>
          ))}</ul>
      </motion.div>
    </motion.article>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-cyan-400' : 'text-slate-200 group-hover:text-cyan-300'}`}>
          {question}
        </span>
        <span className={`ml-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus className="w-5 h-5 text-cyan-500" /> : <Plus className="w-5 h-5 text-slate-500 group-hover:text-cyan-400" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-slate-400 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export default function Index(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setIsSubmitting(true);

    try {
      // Add access key to data
      const submitData = {
        access_key: '42364638-c3d2-4e41-bee3-2388624dae19',
        ...data,
        subject: `New Lead: ${data.name}`,
        from_name: "GrowthMantra Contact Form"
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        setShowSuccess(true);
        form.reset();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden text-slate-100 selection:bg-cyan-500/30">
      <Scene />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center w-full px-0 pt-20 pb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Advanced Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 relative flex items-center justify-center"
          >
            <div className="relative z-10 flex flex-col items-center">
              {/* Icon Container */}
              <motion.div
                className="relative w-32 h-32 md:w-40 md:h-40 mb-4"
                animate={{
                  y: [0, -10, 0],
                  filter: ["drop-shadow(0 0 15px rgba(34,211,238,0.3))", "drop-shadow(0 0 30px rgba(34,211,238,0.6))", "drop-shadow(0 0 15px rgba(34,211,238,0.3))"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Hexagon Background */}
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-slate-900/80 fill-current drop-shadow-2xl">
                  <path d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" stroke="url(#logoGradient)" strokeWidth="2" />
                </svg>

                {/* Animated Chart Bars */}
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 p-6">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <motion.rect
                    x="25" y="60" width="10" height="0" rx="2" fill="url(#logoGradient)"
                    animate={{ height: 20, y: 40 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.rect
                    x="45" y="60" width="10" height="0" rx="2" fill="url(#logoGradient)"
                    animate={{ height: 35, y: 25 }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                  <motion.rect
                    x="65" y="60" width="10" height="0" rx="2" fill="url(#logoGradient)"
                    animate={{ height: 50, y: 10 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                  {/* Rocket/Arrow */}
                  <motion.path
                    d="M20 70 Q 50 70 80 20"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M80 20 L 65 25 M 80 20 L 75 35"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 2.5 }}
                  />
                </svg>
              </motion.div>

              {/* Text Logo */}
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                  <motion.span
                    className="text-5xl md:text-7xl font-black tracking-tighter text-white"
                    style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    GROWTH
                  </motion.span>
                  <motion.span
                    className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                    style={{ filter: "drop-shadow(0 0 20px rgba(34,211,238,0.3))" }}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    MANTRA
                  </motion.span>
                </div>
                <motion.div
                  className="h-1 w-0 bg-gradient-to-r from-cyan-400 to-purple-500 mt-2 rounded-full"
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                />
                <motion.p
                  className="mt-3 text-sm md:text-base font-bold tracking-[0.3em] text-slate-400 uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  Strategy • Momentum • Analytics
                </motion.p>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 blur-3xl rounded-full -z-10" />
          </motion.div>

          <h1 className="font-extrabold text-white leading-tight hero-title tracking-tight mb-8 drop-shadow-2xl">
            Scale Your Business <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-glow">
              With AI Intelligence
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-lg md:text-xl leading-relaxed font-light">
            We fuse <span className="text-cyan-400 font-medium">creative strategy</span> with <span className="text-purple-400 font-medium">advanced AI</span> to build systems that automate growth and dominate markets.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              className="group relative px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
              href="#contact"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2">
                Start Growing
                <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              className="group px-8 py-4 rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 font-semibold hover:border-cyan-500/50 hover:bg-slate-800 transition-all hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden"
              href="#services"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </motion.div>

        {/* stats row */}
        <div className="mt-24 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <StatItem value="500+" label="Projects Shipped" delay={0.2} />
          <StatItem value="98%" label="Client Satisfaction" delay={0.4} />
          <StatItem value="10X" label="ROI Generated" delay={0.6} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="w-full px-0 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Ecosystem</span>
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            End-to-end digital solutions designed to elevate your business and drive measurable results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <ServiceCard key={s.title} service={s} index={index} />
          ))}
        </div>
      </section>

      {/* CONTACT + CTA */}
      <section id="contact" className="w-full px-0 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 lg:pt-10"
          >
            <div className="glass-card p-8 border-l-4 border-cyan-500 rounded-r-3xl">
              <h4 className="text-3xl font-bold mb-8 text-white">Get in Touch</h4>
              <div className="space-y-8">
                <div className="flex items-start gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors duration-300">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <strong className="block text-slate-200 mb-1 text-lg">Email Us</strong>
                    <div className="text-slate-400 group-hover:text-cyan-400 transition-colors">GrowthMantraSolutions@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors duration-300">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <strong className="block text-slate-200 mb-1 text-lg">Call Us</strong>
                    <div className="text-slate-400 group-hover:text-cyan-400 transition-colors">+91 8949692537</div>
                  </div>
                </div>
                <div className="flex items-start gap-5 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors duration-300">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <strong className="block text-slate-200 mb-1 text-lg">Chat with us</strong>
                    <a
                      href="https://wa.me/916377369391"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 font-medium underline decoration-cyan-500/30 underline-offset-4 group-hover:text-cyan-300"
                    >
                      WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-8 bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="text-2xl font-bold relative z-10">Ready to Scale?</h4>
              <p className="mt-3 text-cyan-50 relative z-10">Join hundreds of successful businesses that trust us with their digital transformation.</p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 relative overflow-hidden rounded-3xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
            <h3 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Let's Build the Future
            </h3>
            <p className="text-slate-400 mb-8 text-lg">
              Ready to transform your business? Get in touch and let's discuss how we can help you achieve your goals.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Your Name</label>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl bg-slate-900/50 border border-slate-700 px-5 py-4 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl bg-slate-900/50 border border-slate-700 px-5 py-4 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Your Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full rounded-xl bg-slate-900/50 border border-slate-700 px-5 py-4 text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent pointer-events-none" />
        <div className="w-full px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by <span className="text-cyan-400">Visionaries</span>
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              See what our partners have to say about their journey with GrowthMantra.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 relative group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute top-6 right-8 text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L14.017 18C14.017 16.0547 15.3738 15.122 15.632 15.122C14.9004 15.122 14.336 14.5576 14.336 13.826C14.336 13.0944 14.9004 12.53 15.632 12.53C16.3636 12.53 16.928 13.0944 16.928 13.826C16.928 14.027 16.881 14.215 16.799 14.383C16.551 15.539 15.485 16.67 14.017 16.954V21ZM5 21L5 18C5 16.0547 6.35683 15.122 6.61503 15.122C5.88342 15.122 5.31902 14.5576 5.31902 13.826C5.31902 13.0944 5.88342 12.53 6.61503 12.53C7.34663 12.53 7.91103 13.0944 7.91103 13.826C7.91103 14.027 7.86403 14.215 7.78203 14.383C7.53403 15.539 6.46803 16.67 5 16.954V21Z" />
                  </svg>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-slate-900/50 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-cyan-500/50 transition-colors">
                    {t.logo}
                  </div>
                  <div>
                    <div className="font-bold text-slate-100 text-lg">{t.name}</div>
                    <div className="text-xs text-cyan-400 font-medium uppercase tracking-wide">{t.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{t.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 w-full px-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-slate-400">Everything you need to know about working with us.</p>
        </motion.div>

        <div className="glass-card p-8 rounded-3xl">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 mt-20 py-12 relative z-10 bg-slate-950/50 backdrop-blur-sm">
        <div className="w-full px-0 flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">GrowthMantra</div>
            <p className="text-slate-400 mt-4 max-w-sm leading-relaxed">
              Transforming businesses with cutting-edge technology and innovative digital solutions.
            </p>
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              {['f', 't', 'in', 'ig'].map((social) => (
                <div key={social} className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-900 transition-all cursor-pointer hover:-translate-y-1">
                  {social}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-auto text-center md:text-left">
            <div>
              <h5 className="font-bold text-slate-200 mb-4">Services</h5>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Web Development</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">AI Solutions</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Digital Marketing</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">SEO Services</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 mb-4">Company</h5>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Our Team</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full px-0 mt-12 pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
          © 2025 GrowthMantra. All rights reserved.
        </div>
      </footer>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-slate-900 border border-cyan-500/30 p-8 rounded-3xl shadow-2xl max-w-md w-full relative text-center"
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Details Submitted!</h3>
              <p className="text-slate-300">
                We'll get back to you within 24 hours.
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="mt-8 w-full bg-cyan-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-cyan-400 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Portfolio() {
  const [open, setOpen] = useState(false);
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const projects = [
    {
      title: "Green Heaven",
      description: "A comprehensive indoor plant e-commerce store featuring a shopping cart system, category filtering, and a lush, responsive user interface.",
      tags: ["React", "Vite", "Redux", "Tailwind CSS"],
      link: "https://github.com/shahrzad-aslam/green-heaven",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Personal Portfolio",
      description: "A modern, dark-themed portfolio website built to showcase my development skills and creative projects.",
      tags: ["React", "Framer Motion", "Tailwind"],
      link: "https://github.com/AhmedSharif09/ahmedsharif09.github.io",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const skillCategories = [
    { title: "Essentials", skills: ["HTML5", "CSS3", "JavaScript", "Git"] },
    { title: "Frameworks & Libs", skills: ["React.js", "Redux", "Framer Motion", "Vite"] },
    { title: "Design & Styling", skills: ["Tailwind CSS", "Bootstrap", "Figma to HTML", "Responsive UI"] }
  ];

  const scrollToSection = (id) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector("header");
      const offset = header ? header.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("");
    setIsSending(true);

    emailjs.sendForm(
      'service_abc123',   // Replace with your EmailJS Service ID
      'template_xyz456',  // Replace with your EmailJS Template ID
      form.current,
      '9LyiEiqtXfvQzV5u4'    // Replace with your EmailJS Public Key
    )
    .then(() => {
        setStatus("success");
        form.current.reset();
    })
    .catch((err) => {
        console.error("FAILED...", err);
        setStatus("error");
    })
    .finally(() => setIsSending(false));
  };

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white">
      
      {/* NAVBAR */}
      <header className="fixed top-0 w-full bg-[#0f0f0f]/90 backdrop-blur-md z-[100] border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
          <h1 className="text-orange-500 font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            AHMED.DEV
          </h1>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            {['services', 'about', 'portfolio', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className="hover:text-orange-500 transition capitalize">
                {item === 'contact' ? 'Contact Me' : item === 'about' ? 'About Me' : item}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollToSection('contact')} className="hidden md:block bg-orange-500 px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20">
            Hire Me
          </button>
          <button className="md:hidden text-orange-500 p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-[#0f0f0f] z-[90] flex flex-col items-center justify-center gap-8 text-2xl font-bold"
          >
            {['services', 'about', 'portfolio', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className="hover:text-orange-500 capitalize">
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-orange-500 font-mono mb-4 tracking-widest uppercase">Available for work</p>
            <h2 className="text-xl md:text-2xl text-gray-400 mb-2">Hello, I'm Muhammad Ahmed</h2>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none text-white">
              FRONTEND <span className="text-orange-500">DEV.</span>
            </h1>
            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => scrollToSection('contact')} className="bg-orange-500 px-8 py-4 rounded-xl font-bold hover:scale-105 transition shadow-xl shadow-orange-500/20 w-full sm:w-auto">Hire Me</button>
              <a href="/My_CV.pdf" download className="border border-gray-700 px-8 py-4 rounded-xl font-bold hover:border-orange-500 transition w-full sm:w-auto text-center">Download CV</a>
            </div>
            <div className="flex gap-6 text-gray-500">
              <a href="https://github.com/ahmedsharif09" aria-label="GitHub Profile" className="hover:text-orange-500 transition"><Github /></a>
              <a href="https://linkedin.com/in/ahmed-sharif-3a36b2326" aria-label="LinkedIn Profile" className="hover:text-orange-500 transition"><Linkedin /></a>
              <a href="mailto:ahmed.sharif7878987@email.com" aria-label="Send Email" className="hover:text-orange-500 transition"><Mail /></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative flex justify-center order-first md:order-last">
            <div className="w-64 h-64 md:w-[450px] md:h-[450px] rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-1 rotate-3">
              <div className="w-full h-full bg-[#111] rounded-3xl overflow-hidden -rotate-3 hover:rotate-0 transition duration-500">
                <img src="/portfolio.jpg" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#141414] px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center uppercase tracking-widest">Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["UI/UX Design", "React Development", "Responsive Layouts"].map((service, i) => (
              <div key={i} className="bg-[#1c1c1c] p-10 rounded-3xl border border-gray-800 hover:border-orange-500/50 transition-all group">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition">
                  <ExternalLink className="text-orange-500 group-hover:text-white" size={20} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service}</h3>
                <p className="text-gray-400 leading-relaxed">High-end digital solutions focused on performance and accessibility.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT & SKILLS */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-lg text-gray-400">
            <h2 className="text-4xl font-bold text-white mb-8 uppercase tracking-widest">About Me</h2>
            <p>I am a passionate frontend developer who loves building modern and responsive web applications. I focus on clean code, smooth user experience, and attractive design.</p>
            <p>I enjoy turning complex problems into simple, beautiful, and intuitive interfaces.</p>
          </div>
          <div className="bg-[#141414] p-8 rounded-3xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Technical Expertise</h3>
            <div className="grid sm:grid-cols-3 gap-8">
              {skillCategories.map((category) => (
                <div key={category.title} className="space-y-4">
                  <h4 className="text-orange-500 font-bold text-sm uppercase tracking-wider border-b border-gray-800 pb-2">{category.title}</h4>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-gray-300 text-sm hover:text-orange-500 transition cursor-default">{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#141414] px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center uppercase tracking-widest">Featured Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div whileHover={{ y: -10 }} key={index} className="bg-[#1c1c1c] rounded-3xl overflow-hidden border border-gray-800 group">
                <div className="h-64 md:h-80 overflow-hidden relative">
                  <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-60 group-hover:opacity-100" />
                  <div className="absolute top-4 right-4 bg-orange-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"><ExternalLink size={18}/></div>
                </div>
                <div className="p-8">
                  <div className="flex gap-2 mb-4">
                    {project.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-tighter bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full font-bold">{tag}</span>)}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-orange-500 font-bold flex items-center gap-2 hover:underline">View Source <Github size={18}/></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-widest">Get In Touch</h2>
          <p className="text-gray-400">Let's discuss your next project.</p>
        </div>
        
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <input type="text" name="user_name" placeholder="Name" required className="w-full p-5 bg-[#1c1c1c] border border-gray-800 rounded-2xl outline-none focus:border-orange-500 transition" />
            <input type="email" name="user_email" placeholder="Email" required className="w-full p-5 bg-[#1c1c1c] border border-gray-800 rounded-2xl outline-none focus:border-orange-500 transition" />
          </div>
          <textarea name="message" rows="6" placeholder="Your Message" required className="w-full p-5 bg-[#1c1c1c] border border-gray-800 rounded-2xl outline-none focus:border-orange-500 transition"></textarea>
          
          <button type="submit" disabled={isSending} className="w-full bg-orange-500 py-5 rounded-2xl font-bold text-lg hover:bg-orange-600 transition disabled:opacity-50 shadow-xl shadow-orange-500/20 text-white uppercase tracking-widest">
            {isSending ? "Sending..." : "Send Message"}
          </button>
          
          {status === "success" && <p className="text-green-400 font-medium text-center">Message sent successfully! ✅</p>}
          {status === "error" && <p className="text-orange-500 font-medium text-center">Something went wrong. Please check your EmailJS keys. ❌</p>}
        </form>
      </section>

      <footer className="py-12 px-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Muhammad Ahmed. All rights reserved.</p>
      </footer>
    </div>
  );
}

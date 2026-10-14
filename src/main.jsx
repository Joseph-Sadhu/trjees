import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, Building2, Check, ChevronDown, ClipboardCheck,
  Factory, HardHat, Layers3, Menu, MessageCircle, Ruler, ShieldCheck,
  Warehouse, X, Phone, Mail, MapPin, Send, MoveUpRight, ZoomIn, ZoomOut
} from "lucide-react";
import "./styles.css";

const WHATSAPP_NUMBER = "919948562380"; // Add TRJE's WhatsApp number with country code, digits only.
const BUSINESS_EMAIL = "srinivas.trje@gmail.com";  // Add the official TRJE enquiry email.
const BUSINESS_PHONE = "+91 99485 62380";  // Add the official TRJE phone number.

const services = [
  { number: "01", icon: Building2, title: "Pre-Engineered Buildings", text: "Purpose-designed steel building solutions for industrial and commercial requirements.", tags: ["PEB design", "Building systems"] },
  { number: "02", icon: Layers3, title: "Structural Steel Fabrication", text: "Fabrication solutions for steel components, frames, and project-specific structural requirements.", tags: ["Steel frames", "Fabrication"] },
  { number: "03", icon: Warehouse, title: "Industrial Sheds & Warehouses", text: "Practical building solutions for storage, logistics, manufacturing, and operational spaces.", tags: ["Warehousing", "Industrial"] },
  { number: "04", icon: HardHat, title: "Roofing & Cladding", text: "Roof and wall envelope options planned around weather protection and building use.", tags: ["Roofing", "Wall cladding"] },
  { number: "05", icon: Ruler, title: "Design & Engineering Consultancy", text: "Engineering coordination and design support aligned with project scope and site needs.", tags: ["Planning", "Technical support"] },
];

const projects = [
  { title: "Industrial Warehouse", type: "Warehouse", size: "Project showcase", image: `${import.meta.env.BASE_URL}warehouse1.png.jpeg`, description: "A sample portfolio layout for a storage and logistics facility." },
  { title: "Steel Structure Facility", type: "Steel structure", size: "Project showcase", image: `${import.meta.env.BASE_URL}steal1.png.jpeg`, description: "A sample project card for structural steel and site execution work." },
  { title: "Industrial Building Envelope", type: "Roofing & cladding", size: "Project showcase", image: `${import.meta.env.BASE_URL}roof1.png.jpeg`, description: "A sample portfolio layout for roofing, cladding, and industrial building work." },
];

function Logo({ footer = false }) {
  return (
    <a className={`brand ${footer ? "brand-footer" : ""}`} href="#home" aria-label="TRJE Engineering Solutions home">
      <img className="brand-logo-image" src={`${import.meta.env.BASE_URL}trjelogo.png`} alt="TRJE Engineering Solutions" />
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [projectZoom, setProjectZoom] = useState(1);
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", service: "Pre-Engineered Buildings", location: "", details: "" });
  const [formStatus, setFormStatus] = useState("");
  const [estimator, setEstimator] = useState({ type: "Warehouse", length: "60", width: "30", height: "8", location: "Telangana", scope: "Structure + roofing + cladding" });
  const [estimateShown, setEstimateShown] = useState(false);

  const area = Number(estimator.length) * Number(estimator.width);
  const validArea = Number(estimator.length) > 0 && Number(estimator.width) > 0 && Number(estimator.height) > 0 && Number.isFinite(area) && area <= 100000000;
  const filters = ["All", "Warehouse", "Steel structure", "Roofing & cladding"];
  const filteredProjects = projectFilter === "All" ? projects : projects.filter((p) => p.type === projectFilter);

  useEffect(() => {
    if (!activeProject) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") setActiveProject(null);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeProject]);

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormStatus("");
  }

  function submitEnquiry(e) {
    e.preventDefault();
    const message = `TRJE Website Enquiry\nName: ${form.name}\nCompany: ${form.company || "Not provided"}\nPhone: ${form.phone}\nEmail: ${form.email || "Not provided"}\nService: ${form.service}\nLocation: ${form.location || "Not provided"}\nProject details: ${form.details || "Not provided"}`;
    if (WHATSAPP_NUMBER) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setFormStatus("Your enquiry draft is ready in WhatsApp. Please send the message to complete your enquiry.");
    } else {
      const subject = encodeURIComponent(`Website enquiry — ${form.service}`);
      const body = encodeURIComponent(message);
      if (BUSINESS_EMAIL) {
        window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
        setFormStatus("Your email app should open with the enquiry drafted. Add TRJE's official email in the code before launch.");
      } else {
        setFormStatus("Demo only: your details have not been sent. Add TRJE's official email or WhatsApp number in src/main.jsx before launch.");
      }
    }
  }

  function useEstimate() {
    setForm({ ...form, service: estimator.type === "Warehouse" ? "Industrial Sheds & Warehouses" : estimator.type === "Industrial shed" ? "Industrial Sheds & Warehouses" : estimator.type === "Factory" ? "Pre-Engineered Buildings" : "Pre-Engineered Buildings", location: estimator.location, details: `Preliminary project enquiry\nBuilding type: ${estimator.type}\nDimensions: ${estimator.length} m × ${estimator.width} m × ${estimator.height} m height\nApprox. floor area: ${area.toLocaleString("en-IN")} m²\nScope: ${estimator.scope}\nPlease review and provide a formal quotation.` });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setEstimateShown(false);
  }

  const navLinks = [["Services", "#services"], ["Projects", "#projects"], ["About", "#about"], ["PEB Estimator", "#estimator"]];

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
            {navLinks.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Request a Quote <ArrowUpRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" role="img" aria-label="Industrial steel building architecture" />
          <div className="hero-shade" />
          <div className="container hero-layout">
            <div className="hero-content">
              <div className="eyebrow eyebrow-light"><span /> ENGINEERING FOR INDUSTRY & COMMERCE</div>
              <h1>Built on precision.<br /><span>Designed to perform.</span></h1>
              <p className="hero-description">PEB structures, steel fabrication, and industrial building solutions shaped around your project requirements.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Discuss Your Project <ArrowRight size={18} /></a>
                <a className="button button-ghost" href="#projects">Explore Projects <MoveUpRight size={17} /></a>
              </div>
              <div className="hero-note"><ShieldCheck size={18} /><span>Engineering-led solutions. Project-focused execution.</span></div>
            </div>
            <aside className="hero-blueprint" aria-label="TRJE project approach">
              <div className="blueprint-top"><span className="blueprint-dot" /> PROJECT APPROACH <ArrowUpRight size={16} /></div>
              <div className="blueprint-art" aria-hidden="true">
                <svg viewBox="0 0 360 220" role="img"><path d="M36 178V86L180 25L324 86V178M36 86L180 147L324 86M180 147V25M72 101V164M108 116V179M144 132V194M216 132V194M252 116V179M288 101V164M36 178L180 215L324 178"/><path d="M36 86L72 70L108 86L144 70L180 86L216 70L252 86L288 70L324 86"/></svg>
              </div>
              <div className="blueprint-copy"><span>FROM CONCEPT TO STRUCTURE</span><strong>One coordinated approach.</strong><p>Planning, steel systems, roofing and cladding — aligned to your project brief.</p></div>
              <div className="blueprint-tags"><span>01 / PLAN</span><span>02 / ENGINEER</span><span>03 / EXECUTE</span></div>
            </aside>
          </div>
          <a className="scroll-cue" href="#services"><span>SCROLL TO EXPLORE</span><ChevronDown size={16} /></a>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            <div><span className="trust-label">OUR FOCUS</span><strong>Industrial & Commercial</strong></div>
            <div><span className="trust-label">CORE CAPABILITY</span><strong>Steel Building Solutions</strong></div>
            <div><span className="trust-label">PROJECT APPROACH</span><strong>Planned Around Your Needs</strong></div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow"><span /> WHAT WE DO</div><h2>Engineering solutions<br /><span>for real-world demands.</span></h2></div>
              <p>From structural systems to building envelopes, explore services designed to support industrial and commercial projects.</p>
            </div>
            <div className="services-grid">
              {services.map(({ number, icon: Icon, title, text, tags }) => (
                <article className="service-card" key={title}>
                  <div className="service-card-top"><span className="service-number">{number}</span><span className="service-icon"><Icon size={22} strokeWidth={1.7} /></span></div>
                  <h3>{title}</h3><p>{text}</p>
                  <div className="tag-row">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <a className="text-link" href="#contact" onClick={() => setForm({ ...form, service: title })}>Discuss this service <ArrowUpRight size={16} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow"><span /> SELECTED WORK</div><h2>Built for purpose.<br /><span>Made to last.</span></h2></div>
              <p>Use this gallery to showcase TRJE's completed work, capabilities, and approach to project delivery.</p>
            </div>
            <div className="filter-row" role="group" aria-label="Filter projects">
              {filters.map(filter => <button key={filter} className={projectFilter === filter ? "filter-chip active" : "filter-chip"} onClick={() => setProjectFilter(filter)}>{filter}</button>)}
            </div>
            <div className="projects-grid">
              {filteredProjects.map((project, i) => (
                <article className={`project-card ${i === 0 ? "project-featured" : ""}`} key={project.title}>
                  <div className="project-image-wrap"><img src={project.image} alt={project.title} loading="lazy" /><span className="project-category">{project.type}</span><button type="button" className="project-zoom-open" aria-label={`Zoom ${project.title} image`} onClick={() => { setActiveProject(project); setProjectZoom(1); }}><ZoomIn size={19} /></button><a href="#contact" className="project-open" aria-label={`Enquire about ${project.title}`}><ArrowUpRight size={20} /></a></div>
                  <div className="project-copy"><div><h3>{project.title}</h3><p>{project.description}</p></div><span className="project-size">{project.size}</span></div>
                </article>
              ))}
            </div>
            <p className="demo-note"><Check size={15} /> Sample gallery content — replace these cards with approved TRJE project photographs and verified details before publishing.</p>
          </div>
        </section>

        {activeProject && (
          <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`${activeProject.title} image viewer`} onClick={event => { if (event.target === event.currentTarget) setActiveProject(null); }}>
            <button type="button" className="project-lightbox-close" aria-label="Close image viewer" onClick={() => setActiveProject(null)}><X size={22} /></button>
            <div className="project-lightbox-content">
              <img src={activeProject.image} alt={activeProject.title} style={{ transform: `scale(${projectZoom})` }} />
            </div>
            <div className="project-lightbox-footer">
              <span>{activeProject.title}</span>
              <div className="project-zoom-controls" aria-label="Image zoom controls">
                <button type="button" aria-label="Zoom out" title="Zoom out" disabled={projectZoom <= 1} onClick={() => setProjectZoom(Math.max(1, projectZoom - 0.25))}><ZoomOut size={19} /></button>
                <span>{Math.round(projectZoom * 100)}%</span>
                <button type="button" aria-label="Zoom in" title="Zoom in" disabled={projectZoom >= 3} onClick={() => setProjectZoom(Math.min(3, projectZoom + 0.25))}><ZoomIn size={19} /></button>
              </div>
            </div>
          </div>
        )}

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-visual">
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85" alt="Steel fabrication and industrial engineering work" loading="lazy" />
              <div className="about-stamp"><span>TRJE</span><small>ENGINEERING<br />SOLUTIONS</small></div>
            </div>
            <div className="about-copy">
              <div className="eyebrow"><span /> ABOUT TRJE</div>
              <h2>Practical thinking.<br /><span>Engineering discipline.</span></h2>
              <p className="lead">Every project starts with understanding what the building needs to do.</p>
              <p>TRJE Engineering Solutions supports industrial and commercial building requirements through PEB structures, steel fabrication, roofing and cladding, and engineering consultancy. Our sample website content can be tailored to your actual company history, team, and delivery capabilities.</p>
              <ul className="check-list">
                <li><Check size={17} /> Project requirements considered from the start</li>
                <li><Check size={17} /> Building solutions aligned with intended use</li>
                <li><Check size={17} /> Clear communication through the project journey</li>
              </ul>
              <a className="button button-dark" href="#contact">Talk to Our Team <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="process-section">
          <div className="container">
            <div className="section-heading section-heading-light">
              <div><div className="eyebrow eyebrow-light"><span /> OUR APPROACH</div><h2>From first brief<br /><span>to built structure.</span></h2></div>
              <p>A clear project journey helps align requirements, technical decisions, and execution scope.</p>
            </div>
            <div className="process-grid">
              {[
                ["01", "Understand", "Discuss the application, dimensions, site, and project priorities."],
                ["02", "Plan & design", "Develop the required engineering approach and coordinate scope."],
                ["03", "Fabricate", "Prepare components in line with approved drawings and specifications."],
                ["04", "Deliver", "Coordinate delivery and installation where included in the agreed scope."],
              ].map(([n, title, desc]) => <article className="process-step" key={n}><span>{n}</span><div className="process-line" /><h3>{title}</h3><p>{desc}</p></article>)}
            </div>
            <p className="process-disclaimer">Actual project stages and responsibilities depend on the agreed scope of work.</p>
          </div>
        </section>

        <section className="section estimator-section" id="estimator">
          <div className="container estimator-layout">
            <div className="estimator-intro">
              <div className="eyebrow"><span /> PLAN YOUR PROJECT</div>
              <h2>Start with the<br /><span>right dimensions.</span></h2>
              <p>Share a few preliminary details to help TRJE understand your building requirements. This tool calculates floor area only; it does not generate a construction price.</p>
              <div className="estimator-benefit"><ClipboardCheck size={21} /><div><strong>A more useful first conversation</strong><span>Collect key requirements before requesting a formal quotation.</span></div></div>
            </div>
            <div className="estimator-card">
              <div className="estimator-card-heading"><div><span className="small-label">PRELIMINARY TOOL</span><h3>PEB project planner</h3></div><span className="estimator-icon"><Ruler size={22} /></span></div>
              <div className="form-grid">
                <label>Building type<select value={estimator.type} onChange={e => { setEstimator({ ...estimator, type: e.target.value }); setEstimateShown(false); }}><option>Warehouse</option><option>Industrial shed</option><option>Factory</option><option>Commercial building</option></select></label>
                <label>Project location<select value={estimator.location} onChange={e => { setEstimator({ ...estimator, location: e.target.value }); setEstimateShown(false); }}><option>Telangana</option><option>Andhra Pradesh</option><option>Karnataka</option><option>Tamil Nadu</option><option>Kerala</option><option>Other</option></select></label>
                <label>Length (metres)<input type="number" min="1" value={estimator.length} onChange={e => { setEstimator({ ...estimator, length: e.target.value }); setEstimateShown(false); }} /></label>
                <label>Width (metres)<input type="number" min="1" value={estimator.width} onChange={e => { setEstimator({ ...estimator, width: e.target.value }); setEstimateShown(false); }} /></label>
                <label>Approx. height (metres)<input type="number" min="1" value={estimator.height} onChange={e => { setEstimator({ ...estimator, height: e.target.value }); setEstimateShown(false); }} /></label>
                <label>Required scope<select value={estimator.scope} onChange={e => { setEstimator({ ...estimator, scope: e.target.value }); setEstimateShown(false); }}><option>Structure only</option><option>Structure + roofing + cladding</option><option>Complete building package</option></select></label>
              </div>
              <div className="area-result"><div><span>Approximate floor area</span><small>Length × width</small></div><strong>{validArea ? `${area.toLocaleString("en-IN")} m²` : "—"}</strong></div>
              <button className="button button-primary button-full" disabled={!validArea} onClick={() => setEstimateShown(true)}>Review Project Details <ArrowRight size={17} /></button>
              {estimateShown && <div className="estimate-summary"><strong>Your project brief is ready.</strong><p>{estimator.type} · {estimator.length} m × {estimator.width} m · {estimator.height} m high · {estimator.scope}</p><p>Estimated floor area: {area.toLocaleString("en-IN")} m². No construction price is calculated.</p><button className="text-link" onClick={useEstimate}>Continue to enquiry form <ArrowRight size={16} /></button></div>}
              <p className="fine-print">A formal quotation requires review of engineering requirements, site conditions, materials, and scope. Dimensions alone are not enough to establish cost.</p>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <form className="contact-form" onSubmit={submitEnquiry}>
              <div className="form-title"><span className="small-label">PROJECT ENQUIRY</span><h3>Tell us about your requirements</h3><p>Fields marked * are required.</p></div>
              <div className="form-grid">
                <label>Full name *<input name="name" value={form.name} onChange={updateForm} required placeholder="Your name" /></label>
                <label>Company name<input name="company" value={form.company} onChange={updateForm} placeholder="Company / organisation" /></label>
                <label>Phone number *<input name="phone" value={form.phone} onChange={updateForm} required type="tel" minLength="8" placeholder="Contact number" /></label>
                <label>Email address<input name="email" value={form.email} onChange={updateForm} type="email" placeholder="you@company.com" /></label>
                <label className="field-full">Service required *<select name="service" value={form.service} onChange={updateForm} required>{services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}</select></label>
                <label className="field-full">Project location<input name="location" value={form.location} onChange={updateForm} placeholder="City, state" /></label>
                <label className="field-full">Project details<textarea name="details" value={form.details} onChange={updateForm} rows="4" placeholder="Building type, dimensions, scope, or questions..." /></label>
              </div>
              <button className="button button-primary button-full" type="submit">Prepare Enquiry <Send size={17} /></button>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
              <p className="fine-print">Demo form: no information is stored on a server. Configure the official email or WhatsApp contact before publishing.</p>
            </form>
            <aside className="contact-side" aria-labelledby="contact-benefits-title">
              <img
                className="contact-image"
                src="https://images.pexels.com/photos/4832564/pexels-photo-4832564.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Industrial warehouse under construction with heavy equipment at the site"
                loading="lazy"
              />
              <div className="contact-copy">
                <div className="eyebrow eyebrow-light"><span /> BUILT AROUND YOUR REQUIREMENTS</div>
                <h2 id="contact-benefits-title">Why Work With TRJE?</h2>
                <ul className="contact-benefits">
                  <li><Check size={17} /><span>Engineering-led planning for your building requirements</span></li>
                  <li><Check size={17} /><span>Coordinated steel, roofing, and cladding solutions</span></li>
                  <li><Check size={17} /><span>Clear communication from initial brief to delivery</span></li>
                </ul>
              </div>
              <div className="contact-card">
                <span className="small-label">GET IN TOUCH</span>
                <div className="contact-card-details">
                  <div className="contact-detail">
                    <span><MessageCircle size={19} /></span>
                    <div>
                      <strong>WhatsApp</strong>
                      <p>+91 99485 62380</p>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <span><Phone size={19} /></span>
                    <div>
                      <strong>Phone</strong>
                      <p><a href={`tel:${BUSINESS_PHONE}`}>{BUSINESS_PHONE}</a></p>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <span><Mail size={19} /></span>
                    <div>
                      <strong>Email</strong>
                     <p>
                         <a href={`mailto:${BUSINESS_EMAIL}`}>
                                 {BUSINESS_EMAIL}
                          </a>
                          </p>
                    </div>
                  </div>
                  <div className="contact-detail contact-address">
                    <span><MapPin size={19} /></span>
                    <div>
                      <strong>Office Address</strong>
                      <p>Vishwakarma Colony, Suraram Village, Hyderabad, Telangana, India</p>
                    </div>
                  </div>
                </div>
                <a
                  className="button button-primary contact-whatsapp"
                  href="https://wa.me/919948562380"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={17} /> Chat on WhatsApp <ArrowUpRight size={16} />
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand"><Logo footer /><p>Engineering-led building solutions for industrial and commercial requirements.</p></div>
          <div className="footer-links"><strong>Explore</strong><a href="#services">Services</a><a href="#projects">Projects</a><a href="#about">About TRJE</a><a href="#estimator">PEB Estimator</a></div>
          <div className="footer-links"><strong>Get in touch</strong><a href="#contact">Request a quote</a><a href="#contact">Contact details</a><a href="#contact">WhatsApp enquiry</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} TRJE Engineering Solutions. All rights reserved.</span><a href="#home">Back to top ↑</a></div>
      </footer>

      {WHATSAPP_NUMBER && <a className="floating-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label="Chat with TRJE on WhatsApp"><MessageCircle size={23} /></a>}
    </>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);

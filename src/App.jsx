import { useEffect, useState } from "react";
import { defaultContent, imageSrc, mergeContent } from "./content";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Database,
  FileCheck2,
  FolderX,
  HardDrive,
  LockKeyhole,
  Menu,
  MessageCircle,
  Microscope,
  Network,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Usb,
  X,
} from "lucide-react";

const iconMap = { HardDrive, Database, Usb, Smartphone, Network, Building2, LockKeyhole, Microscope, RotateCcw, ShieldCheck };

function IconBadge({ icon: Icon }) {
  return (
    <span className="icon-badge" aria-hidden="true">
      <Icon size={24} strokeWidth={1.9} />
    </span>
  );
}

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function App() {
  const [content, setContent] = useState(import.meta.env.DEV ? defaultContent : null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audienceTab, setAudienceTab] = useState("particulares");
  const closeMenu = () => setMenuOpen(false);
  const { general: g, images, theme } = content || defaultContent;
  const whatsappHref = `https://wa.me/${String(g.whatsappNumber).replace(/\D/g, "")}?text=${encodeURIComponent(g.whatsappText)}`;

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/content", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Content unavailable")))
      .then((remote) => {
        if (!remote.general?.businessName) throw new Error("Invalid content");
        setContent(mergeContent(remote));
      })
      .catch(() => {
        if (!controller.signal.aborted) setContent((current) => current || false);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.title = g.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", g.pageDescription);
    document.querySelector('link[rel="icon"]')?.setAttribute("href", imageSrc(images.favicon));
    if (content?.social.website) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = content.social.website;
    }
  }, [g.pageTitle, g.pageDescription, images.favicon, content?.social.website]);

  useEffect(() => {
    for (const [name, value] of Object.entries({
      "--dark": theme.dark, "--panel": theme.panel,
      "--blue": theme.blue, "--blue-bright": theme.blueBright,
    })) document.documentElement.style.setProperty(name, value);
  }, [theme.dark, theme.panel, theme.blue, theme.blueBright]);

  const cssVars = {
    "--dark": theme.dark, "--panel": theme.panel,
    "--blue": theme.blue, "--blue-bright": theme.blueBright,
  };

  if (!content) return <main className="load-state">{content === false ? "Contenido temporalmente no disponible." : "Cargando contenido..."}</main>;

  return (
    <main style={cssVars}>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#inicio" aria-label={`${g.businessName} inicio`} onClick={closeMenu}>
            <img src={imageSrc(images.logo)} alt={g.businessName} />
          </a>
          <nav className="desktop-nav" aria-label="Navegacion principal">
            {content.nav.map(({ label, href }) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <a className="header-cta" href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </header>

      <nav
        className={`mobile-nav${menuOpen ? " open" : ""}`}
        id="mobile-menu"
        aria-label="Menu principal"
      >
        {content.nav.map(({ label, href }) => (
          <a key={label} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <SectionLabel>{g.heroLabel}</SectionLabel>
          <h1>{g.heroTitle}</h1>
          <p>{g.heroText}</p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={20} />
              {g.heroButton}
            </a>
            <a className="button secondary" href="#proceso">
              {g.heroSecondary}
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-points" aria-label="Tipos de información recuperable">
            <span>
              <FileCheck2 size={18} />
              {content.heroPoints[0]}
            </span>
            <span>
              <FolderX size={18} />
              {content.heroPoints[1]}
            </span>
            <span>
              <Database size={18} />
              {content.heroPoints[2]}
            </span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src={imageSrc(images.hero)} alt="" />
        </div>
      </section>

      <section className="service-strip" aria-label="Resumen de servicios">
        <div>
          <ClipboardCheck size={22} />
          {content.highlights[0]}
        </div>
        <div>
          <ShieldCheck size={22} />
          {content.highlights[1]}
        </div>
        <div>
          <LockKeyhole size={22} />
          {content.highlights[2]}
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section-heading">
          <SectionLabel>{g.servicesLabel}</SectionLabel>
          <h2>{g.servicesTitle}</h2>
          <p>{g.servicesText}</p>
        </div>
        <div className="services-grid">
          {content.services.map(({ icon, title, text }) => (
            <article className="service-card" key={title}>
              <IconBadge icon={iconMap[icon] || HardDrive} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="audience-section" id="empresas">
        <div className="audience-tabs" role="tablist" aria-label="Tipo de cliente">
          <button
            type="button"
            className={audienceTab === "particulares" ? "active" : ""}
            onClick={() => setAudienceTab("particulares")}
          >
            {g.personalLabel}
          </button>
          <button
            type="button"
            className={audienceTab === "empresas" ? "active" : ""}
            onClick={() => setAudienceTab("empresas")}
          >
            {g.businessLabel}
          </button>
        </div>
        <article className={`audience-panel light ${audienceTab === "particulares" ? "active" : ""}`}>
          <SectionLabel>{g.personalLabel}</SectionLabel>
          <h2>{g.personalTitle}</h2>
          <p>{g.personalText}</p>
          <div className="price-list">
            {content.prices.map(({ title, price, detail }) => (
              <div key={title}><span>{title}</span><strong>{price}</strong><small>{detail}</small></div>
            ))}
          </div>
          <p className="fine-print">
            {g.personalNote}
          </p>
        </article>

        <article className={`audience-panel dark ${audienceTab === "empresas" ? "active" : ""}`}>
          <SectionLabel>{g.businessLabel}</SectionLabel>
          <h2>{g.businessTitle}</h2>
          <p>{g.businessText}</p>
          <ul className="check-list">
            {content.businessItems.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} />
                {item}
              </li>
            ))}
          </ul>
          <div className="custom-budget">
            <strong>{g.businessBudgetTitle}</strong>
            <span>{g.businessBudgetSubtitle}</span>
            <p>{g.businessBudgetText}</p>
          </div>
        </article>
      </section>

      <section className="process-section section" id="proceso">
        <div className="section-heading">
          <SectionLabel>{g.processLabel}</SectionLabel>
          <h2>{g.processTitle}</h2>
        </div>
        <div className="process-layout">
          <div className="process-content">
            <div className="timeline">
              {content.process.map(({ title, text }, index) => (
                <article className="timeline-item" key={title}>
                  <span>{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="delivery-note">
              <Database size={22} />
              <p>{g.deliveryNote}</p>
            </div>
          </div>
          <aside className="process-visual" aria-label="Dispositivos de almacenamiento recuperables">
            <div className="device-card hdd-device">
              <HardDrive size={54} />
              <strong>HDD</strong>
              <span>Discos rígidos</span>
            </div>
            <div className="device-card ssd-device">
              <Database size={48} />
              <strong>SSD</strong>
              <span>Unidades sólidas</span>
            </div>
            <div className="device-card usb-device">
              <Usb size={46} />
              <strong>Pendrive</strong>
              <span>USB</span>
            </div>
            <div className="device-card microsd-device">
              <Smartphone size={44} />
              <strong>MicroSD</strong>
              <span>Tarjetas</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="trust-section">
        {content.benefits.map(({ icon, title, text }) => (
          <article key={title}>
            <IconBadge icon={iconMap[icon] || ShieldCheck} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="payments section">
        <div>
          <SectionLabel>{g.paymentsLabel}</SectionLabel>
          <h2>{g.paymentsTitle}</h2>
          <p>{g.paymentsText}</p>
        </div>
        <div className="payment-highlight">
          <CreditCard size={26} />
          <strong>{g.paymentsHighlight}</strong>
          <span className="mipyme-badge">{g.paymentsPlan}</span>
          <small>{g.paymentsNote}</small>
        </div>
      </section>

      <section className="faq section">
        <div className="section-heading">
          <SectionLabel>{g.faqLabel}</SectionLabel>
          <h2>{g.faqTitle}</h2>
        </div>
        <div className="faq-grid">
          {content.faqs.map(({ question, answer }) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta" id="contacto">
        <div>
          <SectionLabel>{g.contactLabel}</SectionLabel>
          <h2>{g.contactTitle}</h2>
          <p>{g.contactText}</p>
        </div>
        <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">
          <MessageCircle size={20} />
          {g.contactButton}
        </a>
        <small>{g.contactNote}</small>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#inicio" aria-label={`${g.businessName} inicio`}>
          <img src={imageSrc(images.logo)} alt={g.businessName} />
        </a>
        <p>{g.footerText}</p>
        <nav aria-label="Navegacion del pie">
          {content.nav.map(({ label, href }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        {(content.social.instagram || content.social.facebook) && (
          <div className="footer-social" aria-label="Redes sociales">
            {content.social.instagram && <a href={content.social.instagram} target="_blank" rel="noreferrer">Instagram</a>}
            {content.social.facebook && <a href={content.social.facebook} target="_blank" rel="noreferrer">Facebook</a>}
          </div>
        )}
        <span>{g.footerLegal}</span>
      </footer>

    </main>
  );
}

export default App;

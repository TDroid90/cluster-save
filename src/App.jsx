import { useState } from "react";
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

const WHATSAPP_NUMBER = "5492964696717";
const WHATSAPP_TEXT =
  "Hola ClusterSave, quiero consultar por una recuperación de datos.";

const whatsappHref = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`
  : `https://wa.me/?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

const navItems = [
  ["Inicio", "#inicio"],
  ["Servicios", "#servicios"],
  ["Cómo funciona", "#proceso"],
  ["Empresas", "#empresas"],
  ["Contacto", "#contacto"],
];

const services = [
  { icon: HardDrive, title: "HDD", text: "Discos rígidos con fallas lógicas o acceso irregular." },
  { icon: Database, title: "SSD", text: "Unidades sólidas con archivos inaccesibles o eliminados." },
  { icon: Usb, title: "Pendrives", text: "Información eliminada, dañada o no reconocida." },
  { icon: Smartphone, title: "SD y MicroSD", text: "Tarjetas de cámaras, teléfonos y equipos de trabajo." },
  { icon: Network, title: "NAS", text: "Volúmenes compartidos, arreglos y carpetas críticas." },
  { icon: Building2, title: "Servidores", text: "Casos de infraestructura y almacenamiento empresarial." },
];

const trustBlocks = [
  {
    icon: LockKeyhole,
    title: "Confidencialidad garantizada",
    text: "Tu información está protegida durante todo el proceso.",
  },
  {
    icon: Microscope,
    title: "Diagnóstico profesional",
    text: "Evaluación técnica clara y transparente.",
  },
  {
    icon: RotateCcw,
    title: "Recuperación no destructiva",
    text: "Trabajamos sobre copias cuando el caso lo permite.",
  },
  {
    icon: ShieldCheck,
    title: "Copia de trabajo segura",
    text: "Resguardo de la información durante todo el proceso.",
  },
];

const process = [
  ["Recepción del dispositivo", "Recibimos el soporte y registramos el caso."],
  ["Diagnóstico", "Analizamos el estado del dispositivo. Costo: $25.000, bonificable si autorizás la recuperación."],
  ["Informe y presupuesto", "Informamos qué información es recuperable, nivel de complejidad, tiempo estimado y presupuesto final."],
  ["Recuperación", "Realizamos la recuperación mediante procedimientos no destructivos."],
  ["Entrega", "La información recuperada se entrega en un soporte nuevo o en uno aportado por el cliente."],
];

const faqs = [
  ["¿El diagnóstico se descuenta?", "Sí. Si autorizás la recuperación, los $25.000 se descuentan del valor final."],
  ["¿Y si no se puede recuperar?", "Solo se cobra el diagnóstico."],
  ["¿Cuánto demora?", "Depende de la complejidad del caso. El plazo se informa durante el diagnóstico."],
  ["¿Dónde se entrega la información?", "En un soporte nuevo o en uno aportado por el cliente."],
  ["¿Puedo pagar en cuotas?", "Sí. Podés pagar en 3 o 6 cuotas con el Plan MiPyME."],
  ["¿Mi información es confidencial?", "Sí. Toda la información se maneja de forma confidencial."],
];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [audienceTab, setAudienceTab] = useState("particulares");
  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#inicio" aria-label="ClusterSave inicio" onClick={closeMenu}>
            <img src="/assets/cluster-save-wordmark.webp" alt="ClusterSave" />
          </a>
          <nav className="desktop-nav" aria-label="Navegacion principal">
            {navItems.map(([label, href]) => (
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
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <SectionLabel>Recuperación y resguardo de datos</SectionLabel>
          <h1>Recuperamos lo que importa</h1>
          <p>
            Recuperamos archivos, fotos, documentos e información crítica de discos rígidos,
            SSD, pendrives y sistemas de almacenamiento.
          </p>
          <div className="hero-actions">
            <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle size={20} />
              Contanos tu caso
            </a>
            <a className="button secondary" href="#proceso">
              Cómo funciona
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-points" aria-label="Tipos de información recuperable">
            <span>
              <FileCheck2 size={18} />
              Archivos
            </span>
            <span>
              <FolderX size={18} />
              Documentos
            </span>
            <span>
              <Database size={18} />
              Información crítica
            </span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src="/assets/hero-storage.png" alt="" />
        </div>
      </section>

      <section className="service-strip" aria-label="Resumen de servicios">
        <div>
          <ClipboardCheck size={22} />
          Diagnóstico claro
        </div>
        <div>
          <ShieldCheck size={22} />
          Procedimientos seguros
        </div>
        <div>
          <LockKeyhole size={22} />
          Información confidencial
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section-heading">
          <SectionLabel>Servicios</SectionLabel>
          <h2>¿Qué recuperamos?</h2>
          <p>
            Información eliminada, dispositivos dañados, particiones perdidas y archivos
            inaccesibles.
          </p>
        </div>
        <div className="services-grid">
          {services.map(({ icon, title, text }) => (
            <article className="service-card" key={title}>
              <IconBadge icon={icon} />
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
            Particulares
          </button>
          <button
            type="button"
            className={audienceTab === "empresas" ? "active" : ""}
            onClick={() => setAudienceTab("empresas")}
          >
            Empresas
          </button>
        </div>
        <article className={`audience-panel light ${audienceTab === "particulares" ? "active" : ""}`}>
          <SectionLabel>Particulares</SectionLabel>
          <h2>Para particulares</h2>
          <p>
            Recuperación de fotos, documentos, proyectos, trabajos, archivos personales y
            dispositivos de almacenamiento.
          </p>
          <div className="price-list">
            <div>
              <span>Diagnóstico</span>
              <strong>$25.000</strong>
              <small>Bonificable si se autoriza la recuperación.</small>
            </div>
            <div>
              <span>Recuperación básica</span>
              <strong>Desde $120.000</strong>
              <small>Hasta 100 GB.</small>
            </div>
            <div>
              <span>Recuperación intermedia</span>
              <strong>Desde $400.000</strong>
              <small>Hasta 500 GB.</small>
            </div>
            <div>
              <span>Recuperación avanzada</span>
              <strong>Desde $750.000</strong>
              <small>A partir de 500 GB, se cobra $700 por GB.</small>
            </div>
          </div>
          <p className="fine-print">
            El valor final depende de la complejidad del caso y del estado del dispositivo.
            A partir de 1 TB, consultar presupuesto.
          </p>
        </article>

        <article className={`audience-panel dark ${audienceTab === "empresas" ? "active" : ""}`}>
          <SectionLabel>Empresas</SectionLabel>
          <h2>Para empresas y profesionales</h2>
          <p>
            Recuperación de información crítica para empresas, estudios contables, estudios
            jurídicos, comercios y profesionales independientes.
          </p>
          <ul className="check-list">
            {["HDD y SSD", "NAS", "Servidores", "RAID", "Almacenamiento empresarial"].map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} />
                {item}
              </li>
            ))}
          </ul>
          <div className="custom-budget">
            <strong>Presupuesto personalizado</strong>
            <span>Cada caso es unico.</span>
            <p>
              Se define según criticidad de la información, complejidad del caso,
              infraestructura involucrada y urgencia requerida.
            </p>
          </div>
        </article>
      </section>

      <section className="process-section section" id="proceso">
        <div className="section-heading">
          <SectionLabel>Proceso</SectionLabel>
          <h2>¿Cómo funciona el proceso?</h2>
        </div>
        <div className="process-layout">
          <div className="process-content">
            <div className="timeline">
              {process.map(([title, text], index) => (
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
              <p>
                Costo del soporte: desde SSD 120 GB + adaptador externo desde $100.000. También
                se puede entregar en un dispositivo aportado por el cliente.
              </p>
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
        {trustBlocks.map(({ icon, title, text }) => (
          <article key={title}>
            <IconBadge icon={icon} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="payments section">
        <div>
          <SectionLabel>Formas de pago</SectionLabel>
          <h2>Opciones simples para avanzar</h2>
          <p>Tarjetas de crédito, transferencia bancaria y efectivo.</p>
        </div>
        <div className="payment-highlight">
          <CreditCard size={26} />
          <strong>3 y 6 cuotas fijas disponibles</strong>
          <span className="mipyme-badge">Plan MiPyME</span>
          <small>
            Las operaciones financiadas poseen un costo financiero mínimo según las
            condiciones vigentes del medio de pago.
          </small>
        </div>
      </section>

      <section className="faq section">
        <div className="section-heading">
          <SectionLabel>FAQ</SectionLabel>
          <h2>Preguntas frecuentes</h2>
        </div>
        <div className="faq-grid">
          {faqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta" id="contacto">
        <div>
          <SectionLabel>Contacto</SectionLabel>
          <h2>¿Perdiste información importante?</h2>
          <p>Contanos tu caso y te indicaremos las posibilidades de recuperación.</p>
        </div>
        <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">
          <MessageCircle size={20} />
          WhatsApp
        </a>
        <small>Tu consulta no molesta.</small>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#inicio" aria-label="ClusterSave inicio">
          <img src="/assets/cluster-save-wordmark.webp" alt="ClusterSave" />
        </a>
        <p>Recuperación y Resguardo de Datos.</p>
        <nav aria-label="Navegacion del pie">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <span>ClusterSave © Todos los derechos reservados.</span>
      </footer>

    </main>
  );
}

export default App;

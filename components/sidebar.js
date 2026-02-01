import { Home, MessageCircleQuestion, X, Sparkles } from "lucide-react";
import categories from "@/data/categories";
import Link from "next/link";
import TitleSidebar from "./TitleSidebar";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const sidebarRef = useRef(null);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  // Detect mobile vs desktop
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close on outside click (mobile)
  useEffect(() => {
    if (!isMobile || !isOpen) return;
    const onDown = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [isMobile, isOpen]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  const NavItem = ({ href, icon: Icon, label, accent = "zinc", external = false }) => {
    const isActive = router.asPath === href || router.asPath === `/${href.replace("/", "")}`;

    const accentClasses = {
      yellow: {
        bg: isActive ? "bg-yellow-500/12" : "hover:bg-yellow-500/8",
        icon: isActive ? "bg-yellow-500/18 text-yellow-400" : "bg-transparent text-zinc-400 group-hover:text-yellow-400",
        text: isActive ? "text-white" : "text-zinc-400 group-hover:text-white",
      },
      sky: {
        bg: isActive ? "bg-sky-500/12" : "hover:bg-sky-500/8",
        icon: isActive ? "bg-sky-500/18 text-sky-400" : "bg-transparent text-zinc-400 group-hover:text-sky-400",
        text: isActive ? "text-white" : "text-zinc-400 group-hover:text-white",
      },
      amber: {
        bg: isActive ? "bg-amber-400/12" : "hover:bg-amber-400/8",
        icon: isActive ? "bg-amber-400/18 text-amber-300" : "bg-transparent text-zinc-400 group-hover:text-amber-300",
        text: isActive ? "text-white" : "text-zinc-400 group-hover:text-white",
      },
      zinc: {
        bg: isActive ? "bg-white/8" : "hover:bg-white/5",
        icon: isActive ? "bg-white/12 text-white" : "bg-transparent text-zinc-500 group-hover:text-zinc-300",
        text: isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300",
      },
    };

    const c = accentClasses[accent];

    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${c.bg}`}
      >
        <span className={`flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200 ${c.icon}`}>
          <Icon size={16} strokeWidth={1.8} />
        </span>
        <span className={`text-[13px] font-[500] tracking-[-0.01em] transition-colors duration-200 ${c.text}`}>
          {label}
        </span>
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className="px-5 pt-5 pb-4">
        <TitleSidebar collapsed={false} />
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-white/6" />

      {/* Nav body */}
      <nav className="flex-1 overflow-y-auto px-3 py-3" style={{ scrollbarWidth: "none" }}>
        {/* Home */}
        <div className="mb-2">
          <NavItem href="/" icon={Home} label="Inicio" accent="yellow" />
        </div>

        {/* Section label */}
        <p className="text-[11px] font-[600] text-zinc-600 uppercase tracking-[0.06em] px-4 mb-1.5 mt-4">
          Categorías
        </p>

        {/* Categories */}
        <div className="space-y-0.5">
          {categories.map((cat) => (
            <NavItem key={cat.id} href={`/${cat.id}`} icon={cat.icon} label={cat.name} accent="zinc" />
          ))}
        </div>
      </nav>

      {/* Divider */}
      <div className="mx-4 h-px bg-white/6" />

      {/* Footer */}
      <div className="px-3 py-3 space-y-0.5">
        <NavItem href="/faq" icon={MessageCircleQuestion} label="Ayuda" accent="sky" />
        <NavItem href="https://github.com/davidvillard" icon={Sparkles} label="Contribuir" accent="amber" external />
      </div>
    </div>
  );

  // ─── DESKTOP / TABLET: static sidebar ───────────────────────────────────
  if (!isMobile) {
    return (
      <aside
        ref={sidebarRef}
        className="relative flex-shrink-0 h-screen bg-zinc-900 border-r border-white/6"
        style={{ width: "260px" }}
      >
        <SidebarContent />
      </aside>
    );
  }

  // ─── MOBILE: hamburger + slide-over drawer ──────────────────────────────
  return (
    <>
      {/* Botón Único (Toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)} // Cambia el estado al contrario
        className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white transition-all duration-300"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isOpen ? (
          // Icono X cuando está abierto
          <X size={20} strokeWidth={2} />
        ) : (
          // Tu SVG original de hamburguesa cuando está cerrado
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="11" x2="10" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: isOpen ? "blur(2px)" : "none",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 z-40 h-full bg-zinc-900 border-r border-white/6 transition-transform duration-300 ease-out"
        style={{
          width: "260px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* Eliminamos el botón de cierre interno que tenías aquí antes */}
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
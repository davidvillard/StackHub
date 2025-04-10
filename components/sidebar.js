import { Home, MessageCircleQuestion, Sparkles, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import categories from "@/data/categories";
import Link from "next/link";
import TitleSidebar from "./TitleSidebar";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) setIsCollapsed(savedState === 'true');

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      localStorage.setItem('sidebarCollapsed', String(newState));
    }
  };

  // Determina si se debe mostrar el texto basado en el estado móvil/abierto
  const shouldShowText = isMobile ? isOpen : !isCollapsed;

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        onClick={toggleSidebar}
        className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-zinc-800/90 text-white shadow-lg transition-all ${
          isOpen ? 'left-16 transform -translate-x-12' : 'left-4'
        } backdrop-blur-sm`}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      <aside 
        className={`
          ${isMobile ? 'fixed inset-0 z-40' : 'fixed h-screen'} 
          ${isCollapsed ? 'w-64 md:w-32' : 'w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          bg-zinc-900/95 text-white p-4 flex flex-col
          sidebar-transition
          shadow-xl backdrop-blur-md
          border-r border-zinc-800
        `}
        style={{ height: '100vh' }}
      >
        {/* Collapse/Expand button */}
        <button 
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-6 bg-zinc-800 rounded-full p-1 border-2 border-zinc-700 hover:bg-zinc-700 transition-all z-10"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight size={18} className="text-zinc-300" />
          ) : (
            <ChevronLeft size={18} className="text-zinc-300" />
          )}
        </button>

        <TitleSidebar collapsed={isCollapsed && !isMobile} />

        <nav className="flex flex-col flex-grow overflow-hidden">
          <ul className="mb-6">
            <li className="w-[85%]">
              <Link 
                href="/" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-500/20 transition-all group nav-item-hover"
              >
                <div className="p-1.5 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/30 transition-colors">
                  <Home size={20} className="text-yellow-400" />
                </div>
                {shouldShowText && (
                  <span className="text-sm font-medium clash">Inicio</span>
                )}
              </Link>
            </li>
          </ul>

          {/* Categorías dinámicas */}
          <div className="flex-grow overflow-y-auto">
            {shouldShowText && (
              <h3 className="text-xs uppercase text-zinc-500 mb-3 px-3 clash">
                Categorías
              </h3>
            )}
            <ul className="space-y-1 pr-1">
              {categories.map((cat) => (
                <li key={cat.id} className="w-[85%]">
                  <Link 
                    href={`/${cat.id}`} 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-all group nav-item-hover"
                  >
                    <div className="p-1.5 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                      <cat.icon size={20} className="text-white" />
                    </div>
                    {shouldShowText && (
                      <span className="text-sm font-medium clash">{cat.name}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-zinc-800 my-4"></div>

          <ul className="space-y-1 pb-4">
            <li className="w-[85%]">
              <Link 
                href="/faq" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-500/20 transition-all group nav-item-hover"
              >
                <div className="p-1.5 rounded-lg bg-sky-500/10 group-hover:bg-sky-500/30 transition-colors">
                  <MessageCircleQuestion size={20} className="text-sky-400" />
                </div>
                {shouldShowText && (
                  <span className="text-sm font-medium clash">Ayuda</span>
                )}
              </Link>
            </li>
            <li className="w-[85%]">
              <Link 
                href="/" 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-300/20 transition-all group nav-item-hover"
              >
                <div className="p-1.5 rounded-lg bg-amber-300/10 group-hover:bg-amber-300/30 transition-colors">
                  <Sparkles size={20} className="text-amber-300" />
                </div>
                {shouldShowText && (
                  <span className="text-sm font-medium clash">Contribuir</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
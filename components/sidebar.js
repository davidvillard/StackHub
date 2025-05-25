import { Home, MessageCircleQuestion, Sparkles, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import categories from "@/data/categories";
import Link from "next/link";
import TitleSidebar from "./TitleSidebar";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar clics en enlaces
  const handleLinkClick = () => {
    if (isMobile) {
      // En móvil, cierra el sidebar
      setIsOpen(false);
    } else if (!isCollapsed) {
      // En tablet/desktop, colapsa el sidebar si está expandido
      setIsCollapsed(true);
      if (!isTablet) {
        localStorage.setItem('sidebarCollapsed', 'true');
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      
      // Cierra automáticamente en móvil cuando cambia el tamaño
      if (width < 640) {
        setIsOpen(false);
      } else if (width >= 1024) {
        // En desktop mantén el estado guardado
        const savedState = localStorage.getItem('sidebarCollapsed');
        setIsCollapsed(savedState === 'true');
        setIsOpen(true);
      } else {
        // En tablet, colapsa por defecto
        setIsCollapsed(true);
        setIsOpen(true);
      }
    };

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
      if (!isTablet) {
        localStorage.setItem('sidebarCollapsed', String(newState));
      }
    }
  };

  // Overlay para móvil cuando el sidebar está abierto
  const MobileOverlay = () => (
    isMobile && isOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    )
  );

  // Determina si se debe mostrar el texto basado en el estado
  const shouldShowText = isMobile ? isOpen : !isCollapsed;

  return (
    <>
      {/* Mobile overlay */}
      <MobileOverlay />
      
      {/* Mobile toggle button */}
      <button 
        onClick={toggleSidebar}
        className={`sm:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-zinc-800/90 text-white shadow-lg transition-all duration-300 hover:bg-zinc-700 active:scale-95`}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar container */}
      <aside 
        className={`
          fixed h-[100dvh] z-40
          ${isCollapsed ? 'w-16 sm:w-20' : 'w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
          bg-zinc-900/95 text-white flex flex-col
          transition-all duration-300 ease-in-out
          shadow-xl backdrop-blur-md
          border-r border-zinc-800
          pb-safe-area
          overflow-visible
        `}
      >
        {/* Collapse/Expand button */}
        <div className="relative">
          <button 
            onClick={toggleSidebar}
            className="hidden sm:flex absolute right-0 top-6 bg-zinc-800 rounded-full p-1 border-2 border-zinc-700 hover:bg-zinc-700 transition-all z-50 shadow-md hover:shadow-lg active:scale-95"
            aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
            style={{ transform: "translateX(50%)" }}
          >
            {isCollapsed ? (
              <ChevronRight size={18} className="text-zinc-300" />
            ) : (
              <ChevronLeft size={18} className="text-zinc-300" />
            )}
          </button>
        </div>

        {/* Header con título/logo */}
        <div className="px-3 py-4">
          <TitleSidebar collapsed={isCollapsed && !isMobile} />
        </div>

        {/* Menú de navegación */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Enlaces fijos superiores */}
          <div className="px-2 mb-3">
            <ul>
              <li className={`${isCollapsed ? 'mx-auto' : 'w-[90%] mx-auto'}`}>
                <Link 
                  href="/" 
                  onClick={handleLinkClick}
                  className={`
                    flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 
                    p-3 rounded-lg hover:bg-yellow-500/20 transition-all group 
                    active:bg-yellow-500/30
                  `}
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
          </div>

          {/* Categorías */}
          {shouldShowText && (
            <h3 className="text-xs uppercase text-zinc-500 mb-2 px-4 clash">
              Categorías
            </h3>
          )}

          <div className="flex-grow overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <ul className={`space-y-1 ${!shouldShowText && 'flex flex-col items-center'}`}>
              {categories.map((cat) => (
                <li key={cat.id} className={`${isCollapsed ? 'w-full' : 'w-[95%] mx-auto'}`}>
                  <Link 
                    href={`/${cat.id}`} 
                    onClick={handleLinkClick}
                    className={`
                      flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 
                      p-3 rounded-lg hover:bg-zinc-800 transition-all group 
                      active:bg-zinc-700
                    `}
                    title={isCollapsed ? cat.name : ""}
                  >
                    <div className="p-1.5 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                      <cat.icon size={20} className="text-white" />
                    </div>
                    {shouldShowText && (
                      <span className="text-sm font-medium clash truncate ">{cat.name}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces de pie */}
          <div className="mt-auto">
            <div className="border-t border-zinc-800 my-2"></div>

            <div className="px-2 pb-safe-area">
              <ul className={`space-y-1 ${!shouldShowText && 'flex flex-col items-center'}`}>
                <li className={`${isCollapsed ? 'w-full' : 'w-[95%] mx-auto'}`}>
                  <Link 
                    href="/faq" 
                    onClick={handleLinkClick}
                    className={`
                      flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 
                      p-3 rounded-lg hover:bg-sky-500/20 transition-all group 
                      active:bg-sky-500/30
                    `}
                    title={isCollapsed ? "Ayuda" : ""}
                  >
                    <div className="p-1.5 rounded-lg bg-sky-500/10 group-hover:bg-sky-500/30 transition-colors">
                      <MessageCircleQuestion size={20} className="text-sky-400" />
                    </div>
                    {shouldShowText && (
                      <span className="text-sm font-medium clash">Ayuda</span>
                    )}
                  </Link>
                </li>
                <li className={`${isCollapsed ? 'w-full' : 'w-[95%] mx-auto'}`}>
                  <Link 
                    href="https://github.com/davidvillard" 
                    onClick={handleLinkClick}
                    className={`
                      flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 
                      p-3 rounded-lg hover:bg-amber-300/20 transition-all group 
                      active:bg-amber-300/30
                    `}
                    title={isCollapsed ? "Contribuir" : ""}
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
            </div>
          </div>
        </div>
      </aside>

      {/* Estilos CSS para iOS */}
      <style jsx global>{`
        :root {
          --vh: 1vh;
        }

        .pb-safe-area {
          padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
        }
      `}</style>
    </>
  );
};

export default Sidebar;
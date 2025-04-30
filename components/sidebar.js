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
  const [safeAreaBottom, setSafeAreaBottom] = useState(0);

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

    // Carga el estado guardado solo en escritorio
    if (window.innerWidth >= 1024) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) setIsCollapsed(savedState === 'true');
    }

    // Detectar área segura en iOS
    // Nota: Esto se ejecuta solo en el cliente (navegador)
    if (typeof window !== 'undefined') {
      // Detectar si estamos en iOS y aplicar padding para área segura
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        // Valor por defecto en caso de que las variables CSS no estén disponibles
        setSafeAreaBottom(34); // Valor típico para iPhones con notch/dynamic island
      }
    }

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
          fixed h-screen z-40
          ${isCollapsed ? 'w-16 sm:w-20' : 'w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
          bg-zinc-900/95 text-white flex flex-col
          transition-all duration-300 ease-in-out
          shadow-xl backdrop-blur-md
          border-r border-zinc-800
          pb-4 ios-safe-padding
        `}
        style={{ paddingBottom: isMobile ? `${safeAreaBottom + 16}px` : '16px' }}
      >
        {/* Collapse/Expand button - solo visible en tablet y desktop */}
        <button 
          onClick={toggleSidebar}
          className="hidden sm:flex absolute -right-3 top-6 bg-zinc-800 rounded-full p-1 border-2 border-zinc-700 hover:bg-zinc-700 transition-all z-10 shadow-md hover:shadow-lg active:scale-95"
          aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {isCollapsed ? (
            <ChevronRight size={18} className="text-zinc-300" />
          ) : (
            <ChevronLeft size={18} className="text-zinc-300" />
          )}
        </button>

        {/* Header con título/logo */}
        <div className="px-3 py-4">
          <TitleSidebar collapsed={isCollapsed && !isMobile} />
        </div>

        {/* Menú de navegación - estructura revisada para iOS */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Enlaces fijos superiores */}
          <div className="px-2 mb-3">
            <ul>
              <li className={`${isCollapsed ? 'mx-auto' : 'w-[90%] mx-auto'}`}>
                <Link 
                  href="/" 
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

          {/* Separador categorías */}
          {shouldShowText && (
            <h3 className="text-xs uppercase text-zinc-500 mb-2 px-4 clash">
              Categorías
            </h3>
          )}

          {/* Categorías con scroll */}
          <div className="flex-grow overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <ul className={`space-y-1 ${!shouldShowText && 'flex flex-col items-center'}`}>
              {categories.map((cat) => (
                <li key={cat.id} className={`${isCollapsed ? 'w-full' : 'w-[95%] mx-auto'}`}>
                  <Link 
                    href={`/${cat.id}`} 
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
                      <span className="text-sm font-medium clash truncate">{cat.name}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces de pie - Área fija en la parte inferior */}
          <div className="mt-auto">
            <div className="border-t border-zinc-800 my-2"></div>

            <div className="px-2">
              <ul className={`space-y-1 ${!shouldShowText && 'flex flex-col items-center'}`}>
                <li className={`${isCollapsed ? 'w-full' : 'w-[95%] mx-auto'}`}>
                  <Link 
                    href="/faq" 
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
                    href="/" 
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

      {/* Código para detectar el valor del área segura en iOS y actualizar el estado */}
      {typeof window !== 'undefined' && (
        <style jsx global>{`
          @supports (padding-bottom: env(safe-area-inset-bottom)) {
            .ios-safe-padding {
              padding-bottom: env(safe-area-inset-bottom);
            }
          }
        `}</style>
      )}
    </>
  );
};

export default Sidebar;
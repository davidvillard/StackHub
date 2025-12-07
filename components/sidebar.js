import { Home, MessageCircleQuestion, Sparkles, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import categories from "@/data/categories";
import Link from "next/link";
import TitleSidebar from "./TitleSidebar";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < 768;
      
      setIsMobile(newIsMobile);
      
      if (newIsMobile) {
        setIsOpen(false);
      } else {
        const savedState = localStorage.getItem('sidebarCollapsed');
        setIsCollapsed(savedState === 'true');
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
      localStorage.setItem('sidebarCollapsed', String(newState));
    }
  };

  const MobileOverlay = () => (
    isMobile && isOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm md:hidden"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    )
  );

  return (
    <>
      <MobileOverlay />
      
      {/* Mobile toggle button */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-800/90 text-white shadow-lg transition-all duration-300 hover:bg-zinc-700 active:scale-95"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          ${isMobile ? 'fixed' : 'relative'} 
          h-screen z-40
          ${isMobile 
            ? 'w-64' 
            : (isCollapsed ? 'w-25' : 'w-64')
          }
          ${isMobile && (isOpen ? 'translate-x-0' : '-translate-x-full')}
          bg-zinc-900 text-white flex flex-col
          transition-all duration-300 ease-in-out
          border-r border-zinc-800
          flex-shrink-0
        `}
      >
        {/* Collapse button - SOLO DESKTOP */}
        {!isMobile && (
          <button 
            onClick={toggleSidebar}
            className="absolute -right-3 top-6 bg-zinc-800 rounded-full p-1.5 border-2 border-zinc-700 hover:bg-zinc-700 transition-all z-50 shadow-lg hover:shadow-xl active:scale-95"
            aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {isCollapsed ? (
              <ChevronRight size={16} className="text-zinc-300" />
            ) : (
              <ChevronLeft size={16} className="text-zinc-300" />
            )}
          </button>
        )}

        {/* Header */}
        <div className="px-3 py-6">
          <TitleSidebar collapsed={!isMobile && isCollapsed} />
        </div>

        {/* Navigation */}
        <div className="flex flex-col flex-grow overflow-hidden px-3">
          {/* Home link */}
          <div className="mb-4">
            <Link 
              href="/" 
              onClick={handleLinkClick}
              className={`
                flex items-center ${(!isMobile && isCollapsed) ? 'justify-center' : 'justify-start'} gap-3 
                p-3 rounded-lg hover:bg-yellow-500/20 transition-all group 
                active:bg-yellow-500/30
              `}
            >
              <div className="p-1.5 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/30 transition-colors flex-shrink-0">
                <Home size={20} className="text-yellow-400" />
              </div>
              {(isMobile || !isCollapsed) && (
                <span className="text-sm font-medium">Inicio</span>
              )}
            </Link>
          </div>

          {/* Categories label */}
          {(isMobile || !isCollapsed) && (
            <h3 className="text-xs uppercase text-zinc-500 mb-2 px-2">
              Categorías
            </h3>
          )}

          {/* Categories list */}
          <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent pr-2">
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link 
                    href={`/${cat.id}`} 
                    onClick={handleLinkClick}
                    className={`
                      flex items-center ${(!isMobile && isCollapsed) ? 'justify-center' : 'justify-start'} gap-3 
                      p-3 rounded-lg hover:bg-zinc-800 transition-all group 
                      active:bg-zinc-700
                    `}
                    title={(!isMobile && isCollapsed) ? cat.name : ""}
                  >
                    <div className="p-1.5 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors flex-shrink-0">
                      <cat.icon size={20} className="text-white" />
                    </div>
                    {(isMobile || !isCollapsed) && (
                      <span className="text-sm font-medium truncate">{cat.name}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer links */}
          <div className="mt-auto pt-4 border-t border-zinc-800">
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/faq" 
                  onClick={handleLinkClick}
                  className={`
                    flex items-center ${(!isMobile && isCollapsed) ? 'justify-center' : 'justify-start'} gap-3 
                    p-3 rounded-lg hover:bg-sky-500/20 transition-all group 
                    active:bg-sky-500/30
                  `}
                  title={(!isMobile && isCollapsed) ? "Ayuda" : ""}
                >
                  <div className="p-1.5 rounded-lg bg-sky-500/10 group-hover:bg-sky-500/30 transition-colors flex-shrink-0">
                    <MessageCircleQuestion size={20} className="text-sky-400" />
                  </div>
                  {(isMobile || !isCollapsed) && (
                    <span className="text-sm font-medium">Ayuda</span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/davidvillard" 
                  onClick={handleLinkClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center ${(!isMobile && isCollapsed) ? 'justify-center' : 'justify-start'} gap-3 
                    p-3 rounded-lg hover:bg-amber-300/20 transition-all group 
                    active:bg-amber-300/30
                  `}
                  title={(!isMobile && isCollapsed) ? "Contribuir" : ""}
                >
                  <div className="p-1.5 rounded-lg bg-amber-300/10 group-hover:bg-amber-300/30 transition-colors flex-shrink-0">
                    <Sparkles size={20} className="text-amber-300" />
                  </div>
                  {(isMobile || !isCollapsed) && (
                    <span className="text-sm font-medium">Contribuir</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
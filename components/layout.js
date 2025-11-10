import Sidebar from "../components/sidebar";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const contentRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Scroll al inicio cuando cambia la ruta
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [router.asPath]);

  return (
    <div className="flex flex-row sm:flex-row h-[100dvh]">
      <Sidebar />
      <div 
        ref={contentRef}
        className="flex-1 flex flex-col overflow-auto bg-neutral-800 text-white p-4"
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
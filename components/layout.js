import Sidebar from "./sidebar";
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main 
        ref={contentRef}
        className="flex-1 overflow-y-auto bg-neutral-800 text-white"
      >
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
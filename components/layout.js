import Sidebar from "./sidebar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const contentRef = useRef(null);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
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
        style={isMobile ? { marginLeft: 0 } : {}}
      >
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
// components/Layout.js
import Sidebar from "@/components/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-6 bg-neutral-800 text-white flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

import Sidebar from "@/components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto bg-neutral-800 text-white p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;

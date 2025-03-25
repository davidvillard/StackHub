import { Home, MessageCircleQuestion, Sparkles } from "lucide-react";
import categories from "@/data/categories";
import Link from "next/link";
import TitleSidebar from "./TitleSidebar";

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-zinc-900 text-white p-4 flex flex-col">
      <TitleSidebar />
      <nav className="flex flex-col flex-grow">
        <ul className="mb-4">
          <li>
            <Link href="/" className="clash flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-500/50 transition">
              <Home size={20} /> Inicio
            </Link>
          </li>
        </ul>

        {/* Categorías dinámicas */}
        <div className="flex-grow overflow-y-auto max-h-[calc(100vh-300px)]">
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/${cat.id}`} className="clash flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition">
                  <cat.icon size={23} className="text-white" />
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-500 my-4"></div>

        <ul className="space-y-4">
          <li>
            <Link href="/faq" className="flex items-center gap-3 p-2 rounded-lg hover:bg-sky-500/50 transition">
              <MessageCircleQuestion size={20} /> Ayuda
            </Link>
          </li>
          <li>
            <Link href="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-300/50 transition">
              <Sparkles size={20} /> Contribuir
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

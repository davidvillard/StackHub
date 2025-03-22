import { Home, MessageCircleQuestion, Sparkles } from "lucide-react";
import categories from "@/data/categories";
import Link from "next/link";

const Sidebar = () => {
  return (

    <aside className="w-64 h-screen bg-zinc-900 text-white p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">FREE STACK</h1>
      <nav className="flex flex-col flex-grow gap-4">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition">
              <Home size={20} /> Inicio
            </Link>
          </li>
        </ul>

        {/* Contenedor con las categorías */}
        <div className="flex-grow overflow-y-auto max-h-[calc(100vh-300px)]">
          <ul className="space-y-4">
            {/* Categorías dinámicas */}
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/${cat.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition">
                    <cat.icon size={23} className="text-white" />
                        {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-gray-500 my-4"></div>

        {/* Segundo <ul> con ayuda y contribuir al final */}
        <ul className="space-y-4">
          <li>
            <Link href="/faq" className="flex items-center gap-3 p-2 rounded-lg transition hover:bg-sky-500/50 hover:text-white">
              <MessageCircleQuestion size={20} /> Ayuda
            </Link>
          </li>
          <li>
            <Link href="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-300/50 hover:text-white transition">
              <Sparkles size={20} /> Contribuir
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

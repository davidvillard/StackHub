import { Home, Box, Image, Video, Palette, CaseUpper, Wrench, Lightbulb, LayoutGrid, PenTool, Images, PencilRuler, LibraryBig, Library, BrainCircuit } from "lucide-react";

const categorias = [
    {id: "icons", name: "Iconos", icon: PencilRuler},
    {id: "logos", name: "Logos", icon: Box},
    {id: "illustrations", name: "Ilustraciones", icon: PenTool},
    {id: "images", name: "Imagenes", icon: Image},
    {id: "videos", name: "Videos", icon: Video},
    {id: "fonts", name: "Fuentes",icon: CaseUpper},
    {id: "colors", name: "Colores", icon: Palette},
    {id: "background", name: "Fondos", icon: Images},
    {id: "tools", name: "Herramientas", icon: Wrench},
    {id: "components", name: "Componentes", icon: LayoutGrid},
    {id: "inspirations", name: "Inspiraciones", icon: Lightbulb},
    {id: "librerias", name: "Librerías", icon: LibraryBig},
    {id: "ia", name: "IA", icon: BrainCircuit},
];

export default categorias;
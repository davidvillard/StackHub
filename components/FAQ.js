import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
  { 
    question: "¿Cómo funciona esta plataforma?", 
    answer: "Explora nuestra colección de recursos gratuitos organizados por categorías. Puedes navegar por el menú lateral o usar la búsqueda para encontrar rápidamente lo que necesitas." 
  },
  { 
    question: "¿Puedo sugerir un recurso?", 
    answer: "¡Sí! Puedes ir a la sección de 'Contribuir' y en Github aportar tu granito de arena. También puedes abrir un issue o enviar un pull request directamente en nuestro repositorio." 
  },
  { 
    question: "¿Es gratis usar esta plataforma?", 
    answer: "Sí, todos los recursos son gratuitos, salvo que la página tenga otra licencia. Siempre verificamos que los recursos sean de código abierto o tengan licencias que permitan su uso gratuito." 
  },
  { 
    question: "¿Cómo contacto con el soporte?", 
    answer: "Puedes enviarnos un mensaje a través de nuestro correo davidvillard6@gmail.com o abrir un issue en nuestro repositorio de GitHub." 
  },
  { 
    question: "¿Con qué frecuencia se actualizan los recursos?", 
    answer: "Revisamos y actualizamos nuestra colección de recursos regularmente. Los nuevos recursos se añaden semanalmente, y también verificamos que los existentes sigan funcionando correctamente." 
  },
  { 
    question: "¿Puedo usar estos recursos para proyectos comerciales?", 
    answer: "La mayoría de los recursos pueden utilizarse para proyectos comerciales, pero te recomendamos verificar la licencia específica de cada recurso. En la descripción de cada uno indicamos el tipo de licencia cuando está disponible." 
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="min-h-screen px-6 py-12 ml-0 md:ml-32 md:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header minimalista */}
        <div className="mb-16">
          <p className="text-zinc-500 text-sm mb-3 tracking-wide">
            Centro de ayuda
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
            Preguntas Frecuentes
          </h1>
        </div>

        {/* Lista de FAQs */}
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-6 border-b border-zinc-800 hover:border-zinc-700 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`text-lg font-medium transition-colors ${
                    openIndex === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`flex-shrink-0 transition-colors ${
                    openIndex === index ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`}>
                    {openIndex === index ? (
                      <Minus size={20} strokeWidth={2} />
                    ) : (
                      <Plus size={20} strokeWidth={2} />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-500 leading-relaxed pt-4 pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA minimalista */}
        <div className="mt-16 pt-12 border-t border-zinc-800">
          <p className="text-zinc-500 mb-4">
            ¿Tienes más preguntas?
          </p>
          <a 
            href="mailto:davidvillard6@gmail.com"
            className="inline-block text-white font-medium hover:text-zinc-400 transition-colors"
          >
            davidvillard6@gmail.com →
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
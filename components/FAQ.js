import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-white">
        Preguntas Frecuentes
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-zinc-900 p-5 rounded-lg shadow-md border border-zinc-700 w-full"
          >
            <div className="w-full">
              <button
                className="flex items-center justify-between w-full text-lg font-semibold text-white hover:text-[#FFEA00] transition cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-left">{faq.question}</span>
                <motion.div 
                  animate={{ rotate: openIndex === index ? 180 : 0 }} 
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-2"
                >
                  {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-gray-300 mt-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    { question: "¿Cómo funciona esta plataforma?", answer: "Explora nuestra colección de recursos gratuitos organizados por categorías." },
    { question: "¿Puedo sugerir un recurso?", answer: "Si! Puedes ir a la seccion de 'Contribuir' y en Github podras aportar tu granito de arena!" },
    { question: "¿Es gratis usar esta plataforma?", answer: "Sí, todos los recursos que compartimos aquí son completamente gratuitos, salvo que la página tenga otro tipo de licencia." },
    { question: "¿Cómo contacto con el soporte?", answer: "Puedes enviarnos un mensaje a través de la sección de contacto." },
  ];
  

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center mb-16 text-white" >
        Preguntas Frecuentes
      </h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-5 rounded-xl shadow-lg border border-zinc-700 relative"
          >
            <button
              className="flex items-center justify-between w-full text-lg font-semibold text-white hover:text-[#FFEA00] transition duration-200"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  className="text-gray-300 mt-3 leading-relaxed"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRightFromLine, LayoutDashboard } from "lucide-react";
import "../globals.css";

const CVTemplates = [
  { id: 1, name: "Modèle Squares", image: "/modele-cv-squares@1x.png" },
  { id: 2, name: "Modèle Comptable", image: "/modele-cv-ascomptable@1x.jpg" },
  { id: 3, name: "Modèle Caissiere", image: "/modele-cv-caissiere@1x.webp" },
  { id: 4, name: "Modèle Primo", image: "/modele-cv-primo@1x.png" },
  { id: 5, name: "Modèle Lunmina", image: "/modele-cv-lumina@1x.png" },
  { id: 6, name: "Modèle Cubic", image: "/modele-cv-cubic@1x.png" },
  { id: 7, name: "Modele Default", image: "/modele-cv-default@1x.png" },
  { id: 8, name: "Modèle Cascade", image: "/modele-cv-cascade@1x.png" },
  { id: 9, name: "Modèle Graphiste", image: "/modele-cv-graphiste@1x.jpg" },
];

interface Templates {
  id: number;
  name: string;
  image: string;
}

interface CVTemplateSelectorProps {
  onSelect: (template: Templates) => void;
}

export default function CVTemplateSelector({
  onSelect,
}: CVTemplateSelectorProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="realtive">
      <button
        className="btn bg-teal-700 text-white hover:bg-teal-900"
        onClick={() => setShowSidebar(true)}
      >
        Choisir un modèle  <LayoutDashboard className="w-4 h-4 inline-block ml-1" />
      </button>
      
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: showSidebar ? 0 : "200%" }}
          transition={{ type: "tween", duration: 0.4 }}
          className="fixed top-0 rounded-xl -right-96 h-[80vh]  w-64 bg-white shadow-lg p-4 overflow-y-auto z-50  no-scrollbar"
        >
          <button 
            onClick={() => setShowSidebar(false)}
            className="btn btn-error w-full mb-4 rounded-xl sticky top-0 z-20 bg-red-500 text-white hover:bg-red-700" 
          >
            Fermer <ArrowRightFromLine  className="w-6 h-6 inline-block" />
          </button>
          <div className="space-y-4">
            {CVTemplates.map((template) => (
              <div 
                key={template.id} 
                className="card bg-base-100 shadow-md cursor-pointer hover:shadow-lg transition hover:border-teal-700 border-2"
                onClick={() => { onSelect(template); setShowSidebar(false); }}
              >
                <div className="card-body items-center p-2">
                  <Image src={template.image} alt={template.name} layout="responsive" width={500} height={500} className="w-full h-auto" />
                  <p className="text-center mt-2 font-semibold">{template.name}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      
    </div>
  );
}

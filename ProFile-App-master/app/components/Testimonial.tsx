"use client"
import React, { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    image: "/Avatar1.jpg",
    text: "Grâce à ProFile, j'ai pu créer un CV professionnel en quelques minutes et attirer l'attention des recruteurs. Un outil indispensable !",
    name: "Jean Dupont",
    job: "Développeur Web",
  },
  {
    image: "/Avatar2.jpg",
    text: "ProFile m'a permis de postuler plus facilement avec un CV toujours à jour et bien structuré. Je recommande !",
    name: "Perrier Martin",
    job: "Graphiste",
  },
  {
    image: "/Avatar3.jpg",
    text: "En tant que recruteur, ProFile m’aide à trouver rapidement les candidats qui correspondent à mes besoins grâce aux filtres avancés.",
    name: "David Leroy",
    job: "Responsable RH",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-12 bg-gray-100 flex flex-col items-center text-center px-4 relative">
      <div className="text-teal-700 font-semibold text-lg uppercase tracking-wide">
        Témoignages
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mt-2">
        Ce que nos utilisateurs disent de nous
      </h2>
      <p className="text-gray-600 max-w-2xl mt-3">
        Découvrez les retours de ceux qui ont utilisé ProFile pour booster leur carrière et faciliter le recrutement.
      </p>

      <div className="relative mt-8 max-w-3xl bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 transition-all duration-500">
        <Image
          src={testimonials[currentIndex].image}
          width={200}
          height={200}
          alt={testimonials[currentIndex].name}
          className="rounded-full object-cover border-4 border-teal-600"
        />
        <div className="text-left ">
          <p className="text-gray-700 italic text-xl">
            &rdquo;{testimonials[currentIndex].text}&rdquo;
          </p>
          <div className="mt-3">
            <p className="text-teal-700 font-semibold">
              {testimonials[currentIndex].name}
            </p>
            <p className="text-gray-500 text-sm">{testimonials[currentIndex].job}</p>
          </div>
          {/* Boutons de navigation */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-10 h-1  ${currentIndex === index ? "bg-teal-700" : "bg-gray-400"
                  } transition-all duration-300`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

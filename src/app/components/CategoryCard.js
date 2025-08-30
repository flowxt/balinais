"use client";

import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <Link href={`/collections/${category.slug}`} className="group block h-full">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-8 h-full min-h-[300px] hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-xl border border-white/20`}
      >
        {/* Contenu de la carte */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3
              className={`font-serif text-2xl md:text-3xl font-light ${category.textColor} mb-4 tracking-wide`}
            >
              {category.name}
            </h3>
            <p
              className={`${category.textColor}/80 leading-relaxed font-light`}
            >
              {category.description}
            </p>
          </div>

          <div
            className={`mt-6 flex items-center ${category.textColor} group-hover:opacity-80 transition-opacity duration-300`}
          >
            <span className="font-medium">Découvrir</span>
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>

        {/* Motif décoratif subtil */}
        <div
          className={`absolute top-4 right-4 opacity-5 ${category.textColor}`}
        >
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

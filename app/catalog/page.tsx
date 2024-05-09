import React from "react";
import CatalogMain from "../components/main/catalog/catalogMain";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1.",
    imageUrl: "/images/appsImage.jpg",
    options: ["Size", "Color", "Style"]
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2.",
    imageUrl: "/images/appsImage.jpg",
    options: ["Size", "Material"]
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description of Product 3.",
    imageUrl: "/images/appsImage.jpg",
    options: ["Size", "Color"]
  }
];

const headerTitle = <h1 className="text-3xl font-bold mb-4">Website Templates Catalog</h1>;

export default function Catalog() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="flex flex-col container mx-auto">
      {headerTitle}
      <CatalogMain products={products} />
      </div>
      
    </main>
  );
}

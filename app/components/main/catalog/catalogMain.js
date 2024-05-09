import React from "react";

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

export default function CatalogMain() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a href="#" className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.imageUrl} />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.options.join(" / ")}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                <p className="mt-1">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
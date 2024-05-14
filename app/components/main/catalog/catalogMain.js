//C:\Users\NEWOWNER\local_only\local_ruiztechservices\luis_ruiz_com\websites\nextjs_luis-ruiz\app\components\main\catalog\catalogMain.js
import Image from "next/image";
import React from "react";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1.",
    imageUrl: "/images/appsImage.jpg",
    options: ["Size", "Color", "Style"]
  }
];

export default function CatalogMain() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product) => (
            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a href="/catalog/[id]" className="block relative h-48 rounded overflow-hidden">
                <Image width={200} height={200} alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.imageUrl} />
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
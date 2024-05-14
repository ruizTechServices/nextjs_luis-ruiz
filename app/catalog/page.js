import React from "react";
import CatalogMain from "../components/main/catalog/catalogMain";



const headerTitle = <h1 className="text-3xl font-bold mb-4">Website Templates Catalog</h1>;

export default function Catalog() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="my-20 text-center flex flex-col container mx-auto">
      {headerTitle}
      <CatalogMain />
      </div>
      
    </main>
  );
}

// src/context/ProductContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import allParts  from "../data/PartsData"; // original array

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load from localStorage + default parts
  useEffect(() => {
    const uploaded = JSON.parse(localStorage.getItem("uploadedProducts")) || [];
    setProducts([...allParts, ...uploaded]);
  }, []);

  const addProduct = (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);

    const uploaded = JSON.parse(localStorage.getItem("uploadedProducts")) || [];
    localStorage.setItem("uploadedProducts", JSON.stringify([...uploaded, product]));
  };

  const deleteProduct = (id) => {
    const updated = products.filter((item) => item.id !== id);
    setProducts(updated);
    const uploaded = JSON.parse(localStorage.getItem("uploadedProducts")) || [];
    localStorage.setItem(
      "uploadedProducts",
      JSON.stringify(uploaded.filter((item) => item.id !== id))
    );
  };

  const updateProduct = (updatedProduct) => {
    const updated = products.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    );
    setProducts(updated);
    const uploaded = JSON.parse(localStorage.getItem("uploadedProducts")) || [];
    localStorage.setItem(
      "uploadedProducts",
      JSON.stringify(
        uploaded.map((item) =>
          item.id === updatedProduct.id ? updatedProduct : item
        )
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

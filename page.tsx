"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  name: string;
  price: string;
  category: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) router.push("/");

    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push("/");
  };

  const addProduct = () => {
    if (!name || !price) {
      alert("Please fill all required fields 😅");
      return;
    }

    const newProduct = { name, price, category };
    const updated = [...products, newProduct];

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    setName("");
    setPrice("");
    setCategory("");
  };

  const deleteProduct = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-black">Dashboard 🚀</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Count */}
      <p className="mb-4 text-gray-600">
        Total Products: {products.length}
      </p>

      {/* Add Product */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
        <h2 className="font-semibold mb-3 text-black">Add Product</h2>

        <div className="flex flex-col gap-2 md:flex-row">
          <input
            className="border border-gray-300 p-2 rounded text-black w-full"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border border-gray-300 p-2 rounded text-black w-full"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="border border-gray-300 p-2 rounded text-black w-full"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button
          onClick={addProduct}
          className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Add Product
        </button>
      </div>

      {/* Search */}
      <input
        className="border border-gray-300 p-2 mb-6 w-full rounded text-black"
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  No products yet 😅
                </td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <tr key={i} className="text-center border-t hover:bg-gray-100">
                  <td className="p-3 text-black">{p.name}</td>
                  <td className="p-3 text-black">{p.price}</td>
                  <td className="p-3 text-black">{p.category}</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(i)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
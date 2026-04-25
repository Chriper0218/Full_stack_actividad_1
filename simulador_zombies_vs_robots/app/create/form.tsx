"use client";
import { useRouter } from "next/navigation";

export default function CharacterForm() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/");
      router.refresh(); // Fuerza a Next.js a pedir los datos nuevos al servidor (SSR)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-900 p-6 rounded-lg border border-gray-800 text-white">
      <input name="name" type="text" placeholder="Nombre" required className="p-2 bg-gray-800 rounded" />
      <select name="type" className="p-2 bg-gray-800 rounded">
        <option value="ZOMBIE">Zombie 🧟</option>
        <option value="ROBOT">Robot 🤖</option>
      </select>
      <div className="grid grid-cols-2 gap-4">
        <input name="health" type="number" step="0.1" placeholder="Vida" required className="p-2 bg-gray-800 rounded" />
        <input name="attack" type="number" step="0.1" placeholder="Ataque" required className="p-2 bg-gray-800 rounded" />
        <input name="defense" type="number" step="0.1" placeholder="Defensa" required className="p-2 bg-gray-800 rounded" />
        <input name="speed" type="number" step="0.1" placeholder="Velocidad" required className="p-2 bg-gray-800 rounded" />
      </div>
      <button type="submit" className="bg-blue-600 py-3 rounded font-bold">Guardar Guerrero</button>
    </form>
  );
}
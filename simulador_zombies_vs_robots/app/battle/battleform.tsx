"use client";
import { useState } from "react";
import { Character } from "@prisma/client";

export default function BattleForm({ characters }: { characters: Character[] }) {
  const [winner, setWinner] = useState<string | null>(null);

  const startFight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      char1Id: Number(formData.get("char1")),
      char2Id: Number(formData.get("char2")),
    };

    const res = await fetch("/api/fight", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    
    const result = await res.json();
    setWinner(result.winnerName);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-red-900/50">
      <form onSubmit={startFight} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <select name="char1" className="p-3 bg-gray-800 rounded border border-gray-700">
          {characters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <div className="text-center font-black text-2xl text-red-600 italic">VS</div>

        <select name="char2" className="p-3 bg-gray-800 rounded border border-gray-700">
          {characters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <button type="submit" className="md:col-span-3 bg-red-600 hover:bg-red-700 py-4 rounded-lg font-bold text-xl uppercase tracking-widest">
          ¡INICIAR SIMULACIÓN!
        </button>
      </form>

      {winner && (
        <div className="mt-8 p-6 bg-green-900/30 border border-green-500 rounded-lg text-center animate-bounce">
          <h2 className="text-2xl font-bold">🏆 GANADOR: {winner}</h2>
        </div>
      )}
    </div>
  );
}
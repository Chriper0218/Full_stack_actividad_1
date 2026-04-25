"use client";
import { useState } from "react";
import Link from "next/link"; 

export default function BattleForm({ characters }: { characters: any[] }) {
  const [winner, setWinner] = useState<string | null>(null);

  const startFight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWinner(null); 

    const formData = new FormData(e.currentTarget);
    const data = {
      char1Id: formData.get("char1"),
      char2Id: formData.get("char2"),
    };

    try {
      const res = await fetch("/api/fight", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      if (result.winnerName) setWinner(result.winnerName);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-xl border border-red-900/50 shadow-2xl">
      <form onSubmit={startFight} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <select name="char1" className="p-3 bg-gray-800 rounded border border-gray-700 text-white outline-none focus:border-red-500">
          {characters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <div className="text-center font-black text-2xl text-red-600 italic">VS</div>

        <select name="char2" className="p-3 bg-gray-800 rounded border border-gray-700 text-white outline-none focus:border-red-500">
          {characters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        {!winner && (
          <button type="submit" className="md:col-span-3 bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold text-xl uppercase tracking-widest transition-all">
            ¡INICIAR SIMULACIÓN!
          </button>
        )}
      </form>

      {winner && (
        <div className="mt-8 animate-in fade-in zoom-in duration-300">
          <div className="p-6 bg-green-900/30 border border-green-500 rounded-lg text-center mb-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">
              🏆 GANADOR: {winner}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => setWinner(null)} 
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
                Otro Combate
            </button>
            
            <Link 
              href="/history" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-center transition-colors"
            >
               Historial
            </Link>

            <Link 
              href="/" 
              className="bg-gray-800 hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-bold text-center border border-gray-600 transition-all"
            >
               Inicio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
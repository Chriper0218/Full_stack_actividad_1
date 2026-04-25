import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HistoryPage() {
  const battles = await prisma.battle.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      character1: true,
      character2: true,
    },
  });

  return (
    <main className="max-w-4xl mx-auto p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400">Historial de Guerras 📜</h1>
        <Link href="/" className="text-sm bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
          Volver al Inicio
        </Link>
      </div>

      <div className="space-y-4">
        {battles.length === 0 ? (
          <p className="text-gray-500 italic text-center">La arena aún no ha visto sangre...</p>
        ) : (
          battles.map((b) => (
            <div key={b.id} className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Batalla #{b.id}</span>
                <p className="text-lg">
                  <span className={b.winnerId === b.character1Id ? "text-green-400 font-bold" : "text-gray-400"}>
                    {b.character1.name}
                  </span>
                  <span className="mx-2 text-red-600 font-black text-sm italic">VS</span>
                  <span className={b.winnerId === b.character2Id ? "text-green-400 font-bold" : "text-gray-400"}>
                    {b.character2.name}
                  </span>
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-400">Duración: {b.turns} turnos</p>
                <p className="text-sm font-bold text-yellow-500">🏆 Ganó {b.winnerId === b.character1Id ? b.character1.name : b.character2.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
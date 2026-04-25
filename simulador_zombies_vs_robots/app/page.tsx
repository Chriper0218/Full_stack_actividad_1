import { prisma } from "@/lib/prisma"; 
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // SSR: Traemos los personajes directo de la base de datos
  const characters = await prisma.character.findMany();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Zombies vs Robots</h1>
      
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-white">Personajes</h2>
        <div className="flex gap-3">
          <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
             Crear Nuevo
          </Link>
          <Link href="/battle" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
             Ir a la Arena
          </Link>
        </div>
      </div>

      {characters.length === 0 ? (
        <div className="text-center p-10 border-2 border-dashed border-gray-700 rounded-xl">
          <p className="text-gray-500 italic">No hay guerreros listos. Crea uno para empezar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map((char) => (
            <div key={char.id} className="border border-gray-700 p-4 rounded-lg shadow-md bg-gray-900 text-white">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-xl text-blue-400">{char.name}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  char.type === 'ZOMBIE' 
                    ? 'bg-green-900 text-green-300 border border-green-700' 
                    : 'bg-blue-900 text-blue-300 border border-blue-700'
                }`}>
                  {char.type === 'ZOMBIE' ? 'ZOMBIE' : 'ROBOT'}
                </span>
              </div>
              
              <div className="text-sm bg-black/30 p-3 rounded grid grid-cols-2 gap-y-2 border border-gray-800">
                <p className="flex items-center gap-2">❤️ <span className="text-gray-400">Vida:</span> {char.health}</p>
                <p className="flex items-center gap-2">⚔️ <span className="text-gray-400">Ataque:</span> {char.attack}</p>
                <p className="flex items-center gap-2">🛡️ <span className="text-gray-400">Defensa:</span> {char.defense}</p>
                <p className="flex items-center gap-2">⚡ <span className="text-gray-400">Velocidad:</span> {char.speed}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* pie para ver historial */}
      <div className="mt-12 text-center border-t border-gray-800 pt-6">
        <Link href="/history" className="text-gray-400 hover:text-white underline text-sm">
          Previas batallas, historial.
        </Link>
      </div>
    </main>
  );
}
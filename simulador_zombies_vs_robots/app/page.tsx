import { prisma } from "@/lib/prisma"; 
import Link from "next/link";

export default async function Home() {
  const characters = await prisma.character.findMany();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Zombies vs Robots</h1>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Personajes</h2>
        <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Nuevo
        </Link>
      </div>

      {characters.length === 0 ? (
        <p className="text-gray-500 italic">No hay guerreros listos. Crea uno para empezar.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map((char) => (
            <div key={char.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between">
                <span className="font-bold text-lg">{char.name}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${char.type === 'ZOMBIE' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {char.type}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-2 grid grid-cols-2">
                <p>Vida: {char.health}</p>
                <p>Ataque: {char.attack}</p>
                <p>Defensa: {char.defense}</p>
                <p>Velocidad: {char.speed}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

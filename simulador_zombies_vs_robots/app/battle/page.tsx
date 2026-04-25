import { prisma } from "@/lib/prisma";
import BattleForm from "./battleform";

export default async function BattlePage() {
  // SSR: Traemos los personajes directo de la base de datos
  const characters = await prisma.character.findMany();

  return (
    <main className="max-w-4xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-red-500">Arena de Combate ⚔️</h1>
      
      {characters.length < 2 ? (
        <p className="text-center">Necesitas al menos 2 personajes para pelear.</p>
      ) : (
        <BattleForm characters={characters} />
      )}
    </main>
  );
}
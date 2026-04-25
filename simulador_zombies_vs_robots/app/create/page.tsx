import CharacterForm from "./form";

export default function CreateCharacterPage() {
  return (
    <main className="max-w-2xl mx-auto p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Nuevo Guerrero</h1>
      <CharacterForm />
    </main>
  );
}
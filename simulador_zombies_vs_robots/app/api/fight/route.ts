import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { char1Id, char2Id } = body;

    if (!char1Id || !char2Id) {
      return NextResponse.json({ error: "IDs no proporcionados" }, { status: 400 });
    }

    const char1 = await prisma.character.findUnique({ where: { id: Number(char1Id) } });
    const char2 = await prisma.character.findUnique({ where: { id: Number(char2Id) } });

    if (!char1 || !char2) {
      return NextResponse.json({ error: "No se encontraron los personajes" }, { status: 404 });
    }

    // Simulacion
    let p1Health = char1.health;
    let p2Health = char2.health;
    let turns = 0;

    // Mientras ambos tengan vida y no excedan 100 turnos, tambien se evitan bucles infinitos
    while (p1Health > 0 && p2Health > 0 && turns < 100) {
      turns++;
      // Ataque de P1 a P2
      const dmg1 = Math.max(1, char1.attack - (char2.defense * 0.5));
      p2Health -= dmg1;
      
      if (p2Health <= 0) break;

      // Ataque de P2 a P1
      const dmg2 = Math.max(1, char2.attack - (char1.defense * 0.5));
      p1Health -= dmg2;
    }

    const winnerId = p1Health > 0 ? char1.id : char2.id;
    const winnerName = p1Health > 0 ? char1.name : char2.name;

    // para guardar resultado en bd
    await prisma.battle.create({
      data: {
        character1Id: char1.id,
        character2Id: char2.id,
        winnerId: winnerId,
        turns: turns
      }
    });

    return NextResponse.json({ winnerName });

  } catch (error) {
    console.error("DETALLE DEL ERROR EN SERVIDOR:", error);
    return NextResponse.json({ error: "Error interno en la simulación" }, { status: 500 });
  }
}
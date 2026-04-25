import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { char1Id, char2Id } = await request.json();

  const char1 = await prisma.character.findUnique({ where: { id: char1Id } });
  const char2 = await prisma.character.findUnique({ where: { id: char2Id } });

  if (!char1 || !char2) return NextResponse.json({ error: "Faltan guerreros" }, { status: 400 });

  // logica combate
  let p1 = { ...char1 };
  let p2 = { ...char2 };
  let turns = 0;

  // logica, el mas rapido atacara primero
  const sequence = p1.speed >= p2.speed ? [p1, p2] : [p2, p1];

  while (p1.health > 0 && p2.health > 0) {
    turns++;
    const attacker = sequence[(turns - 1) % 2];
    const defender = sequence[turns % 2];

    const damage = Math.max(1, attacker.attack - (defender.defense * 0.5));
    defender.health -= damage;

    if (defender.health <= 0) break;
  }

  const winnerId = p1.health > 0 ? p1.id : p2.id;

  const battle = await prisma.battle.create({
    data: {
      character1Id: char1Id,
      character2Id: char2Id,
      winnerId: winnerId,
      turns: turns
    }
  });

  return NextResponse.json({ battle, winnerName: winnerId === char1.id ? char1.name : char2.name });
}
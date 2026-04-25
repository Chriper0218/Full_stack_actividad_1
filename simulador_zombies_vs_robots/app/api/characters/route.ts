import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const character = await prisma.character.create({
      data: {
        name: body.name,
        type: body.type,
        health: parseFloat(body.health),
        attack: parseFloat(body.attack),
        defense: parseFloat(body.defense),
        speed: parseFloat(body.speed),
      },
    });
    return NextResponse.json(character);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear" }, { status: 500 });
  }
}
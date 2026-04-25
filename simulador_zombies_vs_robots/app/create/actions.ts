"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createCharacter(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    health: parseFloat(formData.get("health") as string),
    attack: parseFloat(formData.get("attack") as string),
    defense: parseFloat(formData.get("defense") as string),
    speed: parseFloat(formData.get("speed") as string),
  };

  await prisma.character.create({ data });
  redirect("/");
}
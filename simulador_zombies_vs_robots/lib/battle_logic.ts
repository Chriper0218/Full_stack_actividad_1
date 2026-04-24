export interface Fighter {
  id: number;
  name: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

export function simulateBattle(char1: Fighter, char2: Fighter) {
  let p1 = { ...char1 };
  let p2 = { ...char2 };
  let turns = 0;

  //el que cuente con mas velocidad va a empezar, pero si los dos tienen las misma velocidad empezara player1
  const attacker = p1.speed >= p2.speed ? p1 : p2;
  const defender = attacker.id === p1.id ? p2 : p1;

  const combatants = [attacker, defender];

  while (p1.health > 0 && p2.health > 0) {
    const currentAttacker = combatants[turns % 2];
    const currentDefender = combatants[(turns + 1) % 2];

    const damage = Math.max(1, currentAttacker.attack - (currentDefender.defense * 0.5));
    
    currentDefender.health -= damage;
    turns++;

    if (currentDefender.health <= 0) break;
  }

  return {
    winnerId: p1.health > 0 ? p1.id : p2.id,
    turns: turns
  };
}
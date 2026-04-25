# Full_stack_actividad_1
Actividad Simulador “Zombies vs Robots” con Next.js SSR

Hola, mi nombre es Christian Perez, estudiante de Ing de Sistemas de la Universidad de la Costa, este proyecto es de mi materia Desarrollo Web Full Stack el cual hace de mi proceso de aprendizaje, en este caso desarrollando en Next.js y gestion de BD relacionales.

El proyecto consiste en una aplicacion web donde puedes crear guerreros (Zombies o Robots), asignarles estadisticas de combate y enfrentarlos en una arena para ver quien sobrevive.

Tecnologias usadas:

Framework: Next.js 14/15 
Lenguaje: TypeScript
Estilos: Tailwind
BD: PostgreSQL (Alojada en Neon)
ORM: Prisma
Entorno: GitHub Codespaces

Funciones:

Creacion de guerreros con nombre, tipo y atributos (vida, ataque, defensa y velocidad)
Simulador de combate, basicamente lo que hace es gestionar el daño y ataque por turno
Historial de batallas

Arquitectura del proyecto

/app/api: endpoints para los JSon
/app/battle: interfaz para arena de combate
/app/create: form para creacion de personajes
/lib: configuracion de Prisma (singleton, esto despues de averiguar un poco para evitar agotar conexiones de la base de datos) para evitar saturar las conexiones a la base de datos

Hecho con por Christian - Estudiante de Ingeniería de Sistemas - CUC
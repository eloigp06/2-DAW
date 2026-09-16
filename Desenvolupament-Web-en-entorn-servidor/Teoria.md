# Teoria: Inicialització d'un projecte Node.js amb Express i TypeScript Mini-API

Guia ràpida per crear i configurar des de zero un entorn Node.js preparat per a TypeScript i Express.

---

## 1. Inicialització i dependències

Crea el fitxer `package.json` base i instal·la el servidor Express juntament amb les eines de desenvolupament (`tsx`, `typescript` i les definicions de tipus):

```bash
# Inicialitzar el projecte
npm init -y

# Dependències de producció
npm install express

# Dependències de desenvolupament (compilador, tipus i runner)
npm install -D typescript tsx @types/node @types/express

# Generar fitxer de configuració de TypeScript
npx tsc --init

# Proves de l'API Spotify

## Executar les proves

Des de la carpeta `spotify`, executa:

```powershell
npx tsx --test src/test/*.test.ts
```

Les proves aixequen l'API en un port local temporal i la tanquen en acabar. Assignen valors de prova a la configuracio de SQL, pero no obren cap connexio ni escriuen a SQL Server. Les proves de `POST /tracks` nomes envien dades invalides, que l'API rebutja abans d'accedir a la base de dades.

Les proves d'artista i llista de reproduccio documenten el comportament esperat segons els camps del projecte; si fallen, revisa el resultat indicat: no s'ha modificat la implementacio per fer-les passar.

## Proves de lectura amb SQL Server

Amb SQL Server en marxa i les variables del `.env` configurades, executa la prova d'integracio per separat:

```powershell
npx tsx --test src/test/database.test.ts
```

Aquesta prova comprova la connexio, el nom de la base de dades, les taules requerides i que `GET /tracks` retorna el mateix nombre de registres que una consulta SQL directa. Només fa `SELECT`; no crea, actualitza ni elimina dades.

## Prova manual sense SQL Server

1. Arrenca el servidor des de `spotify` amb `npm run dev`.
2. En una altra consola de PowerShell, prova la llista de països:

   ```powershell
   Invoke-RestMethod http://localhost:3000/countryes
   ```

3. Crea un país (les dades es guarden en memòria i es perden en reiniciar el servidor):

   ```powershell
   $pais = Invoke-RestMethod -Method Post `
     -Uri http://localhost:3000/countryes `
     -ContentType 'application/json' `
     -Body '{"name":"Nova Zelanda"}'
   $pais
   ```

4. Actualitza'l amb l'identificador retornat:

   ```powershell
   $id = $pais.data.id
   Invoke-RestMethod -Method Put `
     -Uri "http://localhost:3000/countryes/$id" `
     -ContentType 'application/json' `
     -Body '{"name":"Corea del Sud"}'
   ```

5. Comprova la validació amb un nom buit; el resultat esperat és HTTP 400:

   ```powershell
   try {
     Invoke-RestMethod -Method Post `
       -Uri http://localhost:3000/countryes `
       -ContentType 'application/json' `
       -Body '{"name":"   "}'
   } catch {
     $_.Exception.Response.StatusCode
   }
   ```

## Prova manual amb SQL Server

Les rutes de tracks i usuaris necessiten connexió a SQL Server. Configura les variables `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_ENCRYPT` i `DB_TRUST_SERVER_CERTIFICATE` al `.env` local, prepara la base de dades amb `SQL/Creacio.sql`, i executa `npm run dev`. No comparteixis ni copiïs el `.env`.

Per exemple, amb la base de dades disponible:

```powershell
Invoke-RestMethod http://localhost:3000/tracks
Invoke-RestMethod http://localhost:3000/users
```

La ruta `/tracks` llegeix registres de SQL Server. Evita fer servir `/users` per comprovar la resposta HTTP fins que s'hagi revisat el controlador i la consulta d'aquest recurs: el comportament actual no retorna la llista de registres com s'espera.

També pots provar una petició invàlida a tracks sense crear cap registre; la resposta esperada és HTTP 400:

```powershell
try {
  Invoke-RestMethod -Method Post `
    -Uri http://localhost:3000/tracks `
    -ContentType 'application/json' `
    -Body '{"title":"Prova","artist":"Artista","duration":0}'
} catch {
  $_.Exception.Response.StatusCode
}
```

Les rutes disponibles es munten a `src/app.ts`: `/tracks`, `/artists`, `/users`, `/countryes`, `/histoyes`, `/playLists`, `/albums`, `/albumTracks` i `/playListTracks`. Algunes rutes fan servir dades en memòria i d'altres SQL Server; consulta els controladors abans de fer POST/PUT/DELETE sobre una base de dades real.

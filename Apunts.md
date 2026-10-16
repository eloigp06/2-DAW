# Conexio

## Pool de connexió

Un pool de connexions és una memòria cache que emmagatzema un conjunt de connexions obertes i llistes per utilitzar cuan se les necesiti

En lloc d'obrir i tancar una connexió física cada vegada que l'aplicació realitza una consulta, el sistema pren una connexió disponible del pool prestada i, en acabar, la torna perquè un altre procés pugui reutilitzar-la
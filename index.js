/* Prime righe di codice:

const numero = 3;

if (numero < 3){
   console.log("Il numero è minore di 3");
} else if(numero == 3){
   console.log("Il numero è uguale a 3");
}else {
   console.log("Il numero è maggiore di 3");
}

for(i=0; i<10; i++){
   console.log(i);
}
*/

/* Globali:

__dirname: va a prendere la cartella corrente;
__filename: è il nome del file che stiamo utilizzando;
require: è una funzione per poter usare i moduli;
module: fornisce info sul modulo corrente;
process: fornisce info relavite all'ambiente di esecuzione, locale (nostro pc) o in produzione (ciò che vedono gli utenti);

console.log("prova: ", __dirname);

console.log("prova:", __filename);

console.log("prova:", require);

const modulo = require("modulo che mi interessa");
console.log("prova:", module);

console.log("prova:", process);
*/

/* Creare moduli in Node:
- Cosa sono i moduli?
   Sono i pacchetti o dipendenze javascript che compongono l'applicazione. 
   Possono essere interni --> costruiti da noi all'interno della nostra app;
                  built-in -> presenti di default in node.js;
                  esterni --> quelli installati tramite npm (node package manager);
*/         

/* - Costruire i nostri moduli interni e collegarli tramite module.exports e require:
   Ho creato 2 moduli: nomi.js (dove ho inserite le variabili) e utils.js (dove ho inserito la funzione che gestirà i miei nomi);
   Ho esportato la funzione da utils.js tramite module.exports;
   Ho importato la funzione in index.js tramite require;
   Ho esportato i nomi da nomi.js tramite module.exports;
   Ho importato i nomi in index.js tramite require;

      const saluta = require('./utils')
      const nomi = require('./nomi')

      saluta(nomi.persona1)
      saluta("Anna")
      saluta(nomi.persona2)
*/

/* - I moduli build-in sono dei moduli già presenti in niode senza il bisogno di crearli perchè esistenti di default.
   Modulo OS (operating system): 
      Dichiaro la costante e la metto a schermo con un console.log, dopo os. vengono fuori tutte le funzioni build-in associate al modulo os che ci forniscono informazioni utili al sistema operativo della macchina sulla quale stiamo lavorando (es. userInfo, uptime(da quanto tempo è acceso il pc), version, arch).

      const os = require('os')

      console.log(os.userInfo());
      console.log(os.uptime());
      console.log(os.version());
      console.log(os.arch());

      const prova = {
         nome: os.type(),
         release: os.release(),
         memoria: os.totalmem(),
         disponibile: os.freemem()
      }

      console.log(prova);

   Modulo PATH che ci permette di lavorare con i percorsi dei file nel pc.
      Alcune delle info e azioni che possiamo ottenere grazie a Path sono: sep (quale carattere si usa per separare i vari livelli di cartelle nel percorso di un file), join (creare un percorso), basename(ci restituisce il nome base di tutto il path), resolve (ci permette di creare path assoluti).

         const path = require('path');
         console.log(path.sep);

         const percorsoFile = path.join('/cartella', 'prova.txt');
         console.log(percorsoFile);

         console.log(path.basename(percorsoFile));

         const percorsoAssoluto = path.resolve(__dirname, 'cartella', 'prova.txt');
         console.log(percorsoAssoluto);
*/

/* Il Modulo FS (file system) sincrono:
      Si può leggere il contenuto di un file(il primo elemento dentro alle parentesi è il percorso del file in questione, il secondo elemento è utf-8 per dare alla macchina l'informazione della lingua da leggere):
         const {readFileSync, writeFileSync} = require('fs')

         console.log('comincio') // serve per dimostrare che funziona in sincrono
         const prova = readFileSync('./cartella/prova.txt', 'utf-8');
         const ciao = readFileSync('./cartella/ciao.txt', 'utf-8');

         console.log(prova)
         console.log(ciao)
         console.log('ho finito') // serve per dimostrare che funziona in sincrono
         console.log('passo al prossimo') // serve per dimostrare che funziona in sincrono

      Si può scrivere all'interno di un file(il primo elemento è sempre il path, il secondo elemento è quello che dobbiamo aggiungere al file)
         Per override:
            const {readFileSync, writeFileSync} = require('fs')

            writeFileSync('./cartella/prova.txt', 'bella')
         
         Per aggiungere si usa un terzo elemento che è {flag: 'a'}:
            const {readFileSync, writeFileSync} = require('fs')

            writeFileSync('./cartella/prova.txt', 'bella', {flag: 'a'})

         Per scrivere in un file che non esiste (il path è di un file che attualmente non esiste):
            const {readFileSync, writeFileSync} = require('fs')

            writeFileSync('./cartella/bella.txt', 'bella')
*/

/* Il modulo FS asincrono:
      Ha la stessa logica del sync ma esegue le operazione senza bloccare il thread ma delegando alla macchina l'esecuzione delle richieste mentre continua ad eseguire il resto del codice. Questo risultato si ottiene grazie alle funzioni di callback (comunichiamo alla macchina ciò che deve fare, mentre lei esegue noi continuiamo a leggere il codice, una volta che la macchina ha finito mi rimanda indietro i risultati grazie alla funzione di callback da noi stabilita).
      Per leggere file in async:
         const {readFile, writeFile, read} = require('fs')

         readFile('./cartella/prova.txt', 'utf-8', (error, result)=>{
            if(error){
               console.log(error);
               return
            }
            const prova = result;
            console.log(prova);
            readFile('./cartella/ciao.txt', 'utf-8', (error, result)=>{
               if(error){
                  console.log(error);
                  return
               }
               const ciao = result;
               console.log(ciao);
            })
         })

      Per scrivere in file in async:
         console.log('comincio') // serve per dimostrare che funziona in asincrono
         const {readFile, writeFile, read} = require('fs')

         readFile('./cartella/prova.txt', 'utf-8', (error, result)=>{
            if(error){
               console.log(error);
               return
            }
            const prova = result;
            console.log(prova);
            readFile('./cartella/ciao.txt', 'utf-8', (error, result)=>{
               if(error){
                  console.log(error);
                  return
               }
               const ciao = result;
               console.log(ciao);
               writeFile('./cartella/bella.txt', 'ciao ciaoissimo', (error, result)=>{
                  if(error){
                     console.log(error);
                     return
                  }
                  console.log(result);
                  console.log('ho finito') // serve per dimostrare che funziona in asincrono
               })
            })
         })
         console.log('passo al prossimo compito'); // serve per dimostrare che funziona in asincrono
*/

/* Modulo HTTP:
      Serve per creare dei web server (cioè che è sempre online).
      Esempio utilizzo:
         const http = require('http'); //Creiamo http;

         const server = http.createServer((req, res)=> { //Creiamo il nostro server che avrà una funzione di callback con una richiesta (req) alla quale seguirà una risposta (res);
            res.write("Benvenuto sul nostro sito"); // Questa è la risposta;
            res.end(); // Qui finisce la risposta;
         })

         server.listen(3000); // Mettiamo in ascolto il server creato sulla porta locale 3000;

      Esempio completo con req e res:
         const http = require('http'); //Creiamo http;

         const server = http.createServer((req, res)=> { //Creiamo il nostro server che avrà una funzione di callback con una richiesta (req) alla quale seguirà una risposta (res);
            if(req.url === "/"){ // Creiamo la nostra richiesta che è un url vuoto ---> localhost:300
               res.end("Benvenuti sul mio sito"); // Segue la risposta
            } else if(req.url === "/veselin"){ // Creiamo altra richiesta con url di base + /veselin ---> localhost:3000/veselin
               res.end("Il profilo di Veselin"); // e la sua relativa risposta
            }
            res.end(`<h1>Errore</h1>
            <p>Torna alla <a href="/">Home</a>, la pagina non esiste.</p>
            `) // Per tutte le altre richieste questa sarà la risposta.
         })

         server.listen(3000); // Mettiamo in ascolto il server creato sulla porta locale 3000 -- localhost:3000
*/

/* Il Nodemon:
      - è un pacchetto che resta sempre in ascolto ed ogni volta che effettuaiamo dei cambiamenti gli esegue senza dover ogni volta rieseguire il nostro file (come liveserver).
      - installiamo Nodemon con: npm install nodemon --save-dev;
        modifichiamo il file package.json aggiungendo lo script: "start": "nodemon index.js"
        avviamo nodemon con: npm start
      - la differenza tra dependencies e devDependencies è che:
         senza le dependencies il nostro progetto non può funzionare perchè non riesce a leggere alcune parti del codice;
         le devDependencies invece le usiamo solo noi sulla nostra macchina, non servono ad altri programmatori del nostro progetto e non servono per la versione da pubblicare;
         ESEMPIO: posso fare a meno di nodemon (che è una devDependencie) ma non posso fare a meno di bootstrap (che è una dependencie) perchè il codice non verrebbe letto;
*/

/* Gli Event Loop:

*/
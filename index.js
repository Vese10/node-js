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
                  esterni --> quelli installati tramite npm;
         
- Costruire i nostri moduli interni e collegarli tramite module.exports e require:
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

- I moduli build-in sono dei moduli già presenti in niode senza il bisogno di crearli perchè esistenti di default.
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

         const percorsoFile = path.join('/cartella', 'sottocartella', 'prova.txt');
         console.log(percorsoFile);

         console.log(path.basename(percorsoFile));

         const percorsoAssoluto = path.resolve(__dirname, 'cartella', 'sottocattella', 'prova.txt');
         console.log(percorsoAssoluto);
*/





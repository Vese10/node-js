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
*/
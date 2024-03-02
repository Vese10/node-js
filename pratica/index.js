/* Introduzione ad Express:
      Express è un framework per la programmazione con Node. 
      - Si inizia con npm init -y per la creazione del nostro package.json;
      - Installiamo Express e nodemon con "npm i express" e "npm i nodemon --save-dev";
      - Importiamo Express e creiamo un'applicazione: 
            const express = require('express'); // importiamo il modulo Express precedentemente installato;
            const app = express(); // vuol dire: tutta la mia applicazione gira grazie ad Express;

            app.get('/', function (req, res) {
                  res.send('Hello World'); // Nell'url della home page che nel nostro caso è localhost:3000 invia Hello World;
            });

            app.get('/about', (req, res) => {
                  res.send('<h1>About</h1>') // Per url localhost:3000/about invia questo h1:
            })

            app.get('/contatti', (req, res) => {
                  res.send('<h1>Contatti</h1>') // Per url localhost:3000/contatti invia questo h1
            })

            app.all('*', (req, res) => {
                  res.send('<h1>Risorsa non trovata</h1>') // invia questo h1 per ogni url non da noi definito inserito;
            })

            app.listen(3000);
*/

/* Aggiungere file statici: 
    Come aggiungere alla nostra app dei file anzichè direttamente dell'html in linea:
        const express = require('express'); // importiamo il modulo Express precedentemente installato;
        const app = express(); // vuol dire: tutta la mia applicazione gira grazie ad Express;

        app.use(express.static('public')) // diciamo all'app di usare in modo statica la cartella public;

        app.get('/', function (req, res) {
            res.sendFile('homepage.html', {root: __dirname + "/public"}); //Esando sendFile anzichè send, nell'url della home page che nel nostro caso è localhost:3000 invia il file dichiarato;
        });

        app.get('/about', (req, res) => {
            res.sendFile('about.html', {root: __dirname + '/public'}) // Per url localhost:3000/about invia il file dichiarato;
        })

        app.get('/contatti', (req, res) => {
            res.sendFile('contatti.html', {root: __dirname + '/public'}) // Per url localhost:3000/contatti invia questo file;
        })

        app.all('*', (req, res) => {
            res.sendFile('404.html', {root: __dirname + '/public'}) // invia questo file per ogni url non da noi definito inserito;
        })

        app.listen(3000);   
*/

/* API vs SRR:

*/

         
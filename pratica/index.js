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
    -API: è un'interfaccia per comunicare con il Data Base (tramite json, res.json); --> vengono inviati dei dati;
    -SSR: server side rendering (template, ejs, res.render); --> viene inviata una pagina intera;

    API: sono il tramite che sta tra il client e il data base.
        client --> richiesta dati --> API --> interroga il data base
        API --> ottiene i dati --> li invia al client --> il client mostra i dati richiesti e ricevuti grazie ad API

    SSR: 
        client --> richiede una pagina (es. pagina personale dopo Login) --> server --> renderizza pagina completa html --> cliente la mostra a schermo
*/

/* Usare JSON per passare i dati: Express Json
        Mandiamo come risposta dei dati con json in linea:
            const express = require('express')
            const app = express()

            app.get('/', (req, res) => {
                res.json([{nome: "Luca", cognome: "Rossi"}, {nome: "Anna", cognome: "Neri"}]) //La risposta sarà un file json, in questo caso composto da un array di oggetti dichiarati in linea.
            })

            app.listen(3000);
        
        Mandiamo come risposta dei dati con json da file esterno.
            const express = require('express')
            const app = express()
            const {persone} = require('./persone') // Importiamo il file js persone per poterlo poi utilizzare come risposta.

            app.get('/', (req, res) => {
                res.json(persone) //La risposta sarà un file json ma esterno, non in linea. Lo abbiamo importato sopra.
            })

            app.listen(3000);
*/

/* Route Param: 
        - Come inserire solo alcuni specifici parametri di risposta attraverso il mapping:
            const express = require('express')
            const app = express()
            const {persone} = require('./persone') // Importiamo il file js persone per poterlo poi utilizzare come risposta.

            app.get('/', (req, res) => {
                res.send("<h1>Homepage</h1><a href='/persone'>Vai a persone</a>") // La risposta su localhost:3000
            })

            app.get('/persone', (req, res) => {
                const nuovePersone = persone.map((persona) => { //Dichiariamo la nuova variabile che vogliamo come risposta
                    const {nome, cognome, eta} = persona // Inseriamo i parametri specifici che vogliamo (nome, cognome, eta)
                    return {nome, cognome, eta} 
                })
                res.json(nuovePersone)  //La risposta su localhost:3000/persone sono i dati ottenuti dal file "persone";
            })

            app.listen(3000);

        - Come richiedere dati di un oggetto specifico (hardcode):
            const express = require('express')
            const app = express()
            const {persone} = require('./persone') // Importiamo il file js persone per poterlo poi utilizzare come risposta.

            app.get('/', (req, res) => {
                res.send("<h1>Homepage</h1><a href='/persone'>Vai a persone</a>") // La risposta su localhost:3000
            })

            app.get('/persone', (req, res) => {
                const nuovePersone = persone.map((persona) => { //Dichiariamo la nuova variabile che vogliamo come risposta
                    const {nome, cognome, eta} = persona // Inseriamo i parametri specifici che vogliamo (nome, cognome, eta)
                    return {nome, cognome, eta} 
                })
                res.json(nuovePersone)  //La risposta su localhost:3000/persone sono i dati ottenuti dal file "persone";
            })

            app.get('/persone/1', (req, res) => { // Per url localhost:3000/persone/1
                const persona = persone.find((persona) => { // vogliamo ottenere come risposta la variabile persona specifica
                    return persona.id === '1' // avente id = 1
                })
                res.json(persona)
            })

            app.get('/persone/2', (req, res) => { // Per url localhost:3000/persone/2
                const persona = persone.find((persona) => { // vogliamo ottenere come risposta la variabile persona specifica
                    return persona.id === '2' // avente id = 2
                })
                res.json(persona)
            })

            app.listen(3000);

        - L'esempio sopra non è però utilizzabile per file json di risposta ampi, se abbiamo un numero illimitato di oggetti non possiamo scrivere a mano la risposta per ogni oggetto. Qui entrano in gioco i ROUTE PARAM e cioè un modo di scrivere il codice universale valido per tutti gli oggetti del json:
            const express = require('express')
            const app = express()
            const {persone} = require('./persone') // Importiamo il file js persone per poterlo poi utilizzare come risposta.

            app.get('/', (req, res) => {
                res.send("<h1>Homepage</h1><a href='/persone'>Vai a persone</a>") // La risposta su localhost:3000
            })

            app.get('/persone', (req, res) => {
                const nuovePersone = persone.map((persona) => { //Dichiariamo la nuova variabile che vogliamo come risposta
                    const {nome, cognome, eta} = persona // Inseriamo i parametri specifici che vogliamo (nome, cognome, eta)
                    return {nome, cognome, eta} 
                })
                res.json(nuovePersone)  //La risposta su localhost:3000/persone sono i dati ottenuti dal file "persone";
            })

            app.get('/persone/:id', (req, res) => { // Per url localhost:3000/persone/:id --> in base al numero che inseriamo al posto di id avremo la risposta con l'oggetto avente tale id.
                const personaID = req.params.id // alla richiesta dell'oggetto con l'id inserito
                const persona = persone.find((persona) => { //vogliamo ottenere in risposta l'oggetto' specifico avente quel id
                    return persona.id === personaID 
                })
                if(!persona) { // se inseriamo un id che non esiste nel nostro file di risposta la persona non esiste:
                    return res.status(404).send("Persona non trovata") // restituisci l'errore qui definito
                }
                res.json(persona)
            })

            app.listen(3000);
*/

/* Query String Param (url param):
        Search: Per ottenere come risposta dei dati specifici ricercati inseriti nell'url usiamo la seguente scrittura nell'url:
        es. localhost:3000/persone/search?nome=luca&cognome=rossi

            const express = require('express')
            const app = express()

            app.get('/persone/search', (req, res) => {
                console.log(req.query) // alla richiesta di un particolare url (es. localhost:3000/persone/search?nome=luca&cognome=rossi) manda in console i dati richiest nell'url stesso;
                res.send("ciao")
            })

            app.listen(3000); 

        Limit: 
            const express = require('express')
            const app = express()
            const {persone} = require('./persone')

            app.get('/persone/search', (req, res) => {
                const {query, limit} = req.query // gestiamo i parametri query e limit che ci arrivano dalla query (url dopo il search);
                let personeFiltrate = [...persone] // impostiamo la variabile che in questo caso corrisponde al nostro file json facendone una copia (in modo da non intaccare il file originale se dovessimo volerlo modificare da qui);

                if(query){ // se query esiste e cioè se abbiamo effettivamente dei valori di ricerca
                    personeFiltrate = personeFiltrate.filter((persona) => { // filtriamo i nostri parametri
                        return persona.nome.startsWith(query) // il filtro è il nome della persona che inizia con la nostra query (es. localhost:3000/search?query=D)
                    })
                }

                if(limit){ //impostiamo il limite massimo di risultati che vogliamo ottenere con la nostra query (se i risultati totali sono 100 ma noi abbiamo impostato un limit di 20, otterremo le prime 20 risposte). url esempio: localhost:3000/search?query=D&limit=1
                    personeFiltrate = personeFiltrate.slice(0, Number(limit)) //tramite slice dividiamo il nostro oggetto di risposta dal 0 al numero di limit inserito
                }

                if(personeFiltrate.length < 1){
                    return res.status(200).json({success: true, data: []}) //Per gestire la ricerca che va a buon fine ma non trova nessun risultato
                }

                res.status(200).json(personeFiltrate) //se non abbiamo un valore di query specifico restituisci tutte le persone, res.status(200) che vuol dire che la ricerca è andata a buon fine.
            })

            app.listen(3000);
*/

/* Middleware:

*/
       
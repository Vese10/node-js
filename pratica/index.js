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
        Sono delle funzioni che vengono eseguite tra la richiesta e la risposta. Ci permettono di fare quello che vogliamo in quel periodo intermedio. req => middleware => res
        Per poter andare oltre la funzione di middleware dopo averla eseguita abbimao bisogno del parametro next(). Senza questo parametro la nostra app rimane bloccata nella funzione di middleware e non ci restituisce la risposta. Dunque: req => middleware => next() => res
            const express = require('express')
            const app = express()

            const middlewareProva = (req, res, next) => { // Dichiaro la funzione che voglio eseguire dopo aver fatto la richiesta e prima che arrivi la risposta.
                const {method, url} = req
                const time = new Date().getMinutes()
                console.log(method, url, time)
                next() // Inseriamo il parametro next() in modo da poter ricevere la risposta.
            }

            app.get('/', middlewareProva, (req, res) => {
                res.send("Homepage")
            })

            app.get('/about', middlewareProva, (req, res) => {
                res.send("About")
            })

            app.listen(3000)

        Per avere un codice più pulito rendiamo il middleware un modulo:
            const express = require('express')
            const app = express()
            const middlewareProva = require('./middlewareprova') // Importiamo il modulo appena creato e l'app funziona esattamente come sopra.

            app.get('/', middlewareProva, (req, res) => {
                res.send("Homepage")
            })

            app.get('/about', middlewareProva, (req, res) => {
                res.send("About")
            })

            app.listen(3000)

        - app.use è un modo per rendere il modulo middleware da noi creato scalabile ed applicabile ad ogni nostro app.get senza doverlo trascrivere ogni volta per:
            const express = require('express')
            const app = express()
            const middlewareProva = require('./middlewareprova') // Importiamo il modulo appena creato e l'app funziona esattamente come sopra.

            app.use(middlewareProva) // Inseriamo il modulo con app.use, che scritto così funzionerà su tutti i nostri end point:

            app.get('/', (req, res) => { // Cancelliamo il middleware da qui;
                res.send("Homepage")
            })

            app.get('/about', (req, res) => { // Cancelliamo il middleware da qui;
                res.send("About")
            })

            app.get('/persone/ciao', (req, res) => {
                res.send("persone")
            })

            app.get('/persone/miao', (req, res) => {
                res.send("persone miao")
            })

            app.listen(3000)

        - app.use si può applicare anche solo ad alcuni degli end point che abbiamo in base alla nostra necessità:
            const express = require('express')
            const app = express()
            const middlewareProva = require('./middlewareprova') // Importiamo il modulo appena creato e l'app funziona esattamente come sopra.

            app.use('/persone', middlewareProva) // Scritto così funzionerà solo per i percorsi da noi scelti ed inseriti.

            app.get('/', (req, res) => {
                res.send("Homepage")
            })

            app.get('/about', (req, res) => {
                res.send("About")
            })

            app.get('/persone/ciao', (req, res) => { // middleware funziona qui perchè il percorso inizia con il percorso da noi dichiarato '/persone'
                res.send("persone")
            })

            app.get('/persone/miao', (req, res) => { // middleware funziona qui perchè il percorso inizia con il percorso da noi dichiarato '/persone'
                res.send("persone miao")
            })

            app.listen(3000)

        - Si possono anche inserire più funzioni di middleware all'interno dello stesso end point. Lo possiamo fare utilizzando un array di funzioni di middleware:
            const express = require('express')
            const app = express()
            const middlewareProva = require('./middlewareprova')
            const auth = require('./authmiddleware')

            app.use([middlewareProva, auth]) // Inseriamo nell'array più di una funzione

            app.get('/', (req, res) => {
                res.send("Homepage")
            })

            app.get('/about', (req, res) => {
                res.send("About")
            })

            app.get('/persone/ciao', (req, res) => { 
                res.send("persone")
            })

            app.get('/persone/miao', (req, res) => { 
                res.send("persone miao")
            })

            app.listen(3000)
        
        Si può interrompere il flusso di req => middleware => res utilizzando una funzione di middleware con il condizionale. Nel nostro caso login.js:
            const express = require('express')
            const app = express()
            const middlewareProva = require('./middlewareprova')
            const auth = require('./authmiddleware')
            const login = require('./login')

            app.use(middlewareProva) // Usiamo questo modulo su tutti i nostri end point.

            app.get('/', (req, res) => {
                res.send("Homepage")
            })

            app.get('/about', (req, res) => {
                res.send("About")
            })

            app.get('/area', login, (req, res) => {  // Usiamo il modulo login solo qui. Se il nostro url è localhost:3000/area avremo come risposta "Non autorizzato" come stabilito nel modulo login. Se però abbiamo l'url localhost:3000/area?user=Luca come risposta avremo quella sotto ("area"), esattamente come stabilito nel modulo login.
                res.send("area")
            })

            app.get('/persone/miao', (req, res) => { 
                res.send("persone miao")
            })

            app.listen(3000)
        
        I middleware possono essere:
            - custom: e cioè creati da noi (es. login, middlewareprova, authmiddleware);
            - di express: es. app.use(express.static('/public'))
            - di terze parti:
                 npm install *****
                 const xyz = require('*****')
*/

/* Postman Introduzione:
        è un programma da usare in back-end al posto del browser che ha la capacità di inviare una richiesta http ed ottenere una risposta senza avere bisogno di una interfaccia client da restituire effettivamente a schermo.
            const express = require('express')
            const app = express()
            const persone = require('./persone')

            app.use(express.json()) // Autorizziamo express ad accettare i json in entrata come delle risposte.

            app.get('/', (req, res) => {
                res.send("Homepage")
            })

            app.get('/persone', (req, res) => {
                res.send(persone)
            })

            app.post('/', (req, res) => {
                console.log(req.body)
                res.send("ok post")
            })

            app.put('/', (req, res) => {
                console.log(req.body)
                res.send("ok put")
            })

            app.delete('/', (req, res) => {
                res.send("ok delete")
            })

            app.listen(3000)
*/

/* Esercizio:
        GET/POST/PUT/DELETE:

    const express = require('express')
    const app = express()
    const {persone} = require('./persone')

    app.use(express.json()) // Usiamo la funzione di middleware per fare in modo che sia in grado di capire cosa stiamo facendo con POST

    app.get('/api/persone', (req, res) => { 
        res.status(200).json({success: true, data: persone}) // Richiediamo come risposta tutto il contenuto del file persone.js
    })

    app.get('/api/persone/:id', (req, res) => {
        const {id} = req.params // Alla richiesta del parametro id

        const persona = persone.find(
            (persona) => persona.id === id // Persona corrisponde all'id inserito
        )
        res.json(persona) // Rispondi con il parametro persona dichiarato sopra
    })

    app.post('/api/persone', (req, res) => { // POST
        console.log(req.body)
        const persona = req.body // La richiesta al body è la nostra nuova persona da POSTare
        persone.push(persona) // Nel nostro json persone inseriamo la nostra nuova persona
        res.status(200).json({success: true, data: persone}) //Questa è la risposta che deve arrivarci dal server e le persone del nostro file json devono essere una in più, comprensive della persona appena inserita con POST
    })

    app.put('/api/persone/:id', (req, res) => { // PUT per modificare un dato
        const { id } = req.params // id è uguale alla richiesta del parametro in questione
        const persona = req.body // persona è uguale a tutto il body
        persone[Number(id) - 1] = persona // la persona è uguale all'index dell'array delle persone (se vogliamo l'id numero 1 dobbiamo prendere l'index 0 e cosi via)
        persone[Number(id) - 1] = persona.nome // Per modificare il nome della persona e non tutta la persona
        res.status(200).json({success: true, data: persone})
    })

    app.delete('/api/persone/:id', (req, res) => { // DELETE
        const { id } = req.params
        const index = persone.findIndex(persona => persona.id === id) // Prendiamo la persona che ha l'id che ci è stato richiesto
        persone.splice(index,1) // Dal file persone togli l'elemento index richiesto e partendo da questo elemento ne rimuovi salamente 1 e cioè l'elemento stesso.
        res.status(200).json({seccess: true, data: persone})
    })

    app.listen(3000)
*/

 /* MongoDB:
        Open CMD:
            - mongosh
            - show dbs
            - use mydbname
 */
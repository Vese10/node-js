const auth = (req, res, next) => { // Dichiaro la funzione che voglio eseguire dopo aver fatto la richiesta e prima che arrivi la risposta.
  console.log("Accesso effettuato")
  next() // Inseriamo il parametro next() in modo da poter ricevere la risposta.
}

module.exports = auth
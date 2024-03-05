const middlewareProva = (req, res, next) => { // Dichiaro la funzione che voglio eseguire dopo aver fatto la richiesta e prima che arrivi la risposta.
  const {method, url} = req
  const time = new Date().getMinutes()
  console.log(method, url, time)
  next() // Inseriamo il parametro next() in modo da poter ricevere la risposta.
}

module.exports = middlewareProva
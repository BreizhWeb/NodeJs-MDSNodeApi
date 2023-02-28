const getRandomNumber = require('./randomNumber.js');
const createBook = require('./books/create.js')
const getAllBook = require('./books/readAll.js')
const getOneBook = require('./books/readOne.js')
const updateBook = require('./books/update.js')

module.exports = function(req, res) {
    if(req.url === "/random-number" && req.method === "GET") {
        getRandomNumber(res);
    }
    else if(req.url === "/books" && req.method === "POST") {
        createBook(req, res)
        console.log('Book créé')
    }
    else if(req.url === "/books" && req.method === "GET") {
        // get all books
        getAllBook(req, res)
        console.log('Affichage de tous les books')
    }
    else if (req.url.match(/\/books\/\d+/) && req.method === "GET") {
        // get the book with the specified id
        getOneBook(req, res)
        console.log('Affichage du book')
    }
    else if (req.url.match(/\/books\/\d+/) && req.method === "PUT") {
        // update the book with the specified id
        updateBook(req, res)
        console.log('Book update')
    }
    else if (req.url.match(/\/books\/\d+/) && req.method === "DELETE") {
        // delete the book with the specified id
        deleteBook(req, res)
        console.log('Book delete')
    }
}


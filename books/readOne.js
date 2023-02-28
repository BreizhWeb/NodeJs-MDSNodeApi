const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite3"
});

module.exports = function (req, res) {


    const Book = sequelize.define("book", {
        title: DataTypes.TEXT,
        description: DataTypes.TEXT,
        publishedYear: DataTypes.INTEGER,
        author: DataTypes.TEXT
    });

    (async () => {
        await sequelize.sync({force: false});
        try {
            let body = req.url.split('/')[2];

            console.log(body)

            const book = await Book.findByPk(body);

            if (book) {

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(book));
                console.log('Book  find', book)

            } else {
                res.status(404).json({message: `Book with ID ${id} not found`});
            }
        } catch (error) {
            console.log("ERROr")
            res.status(500).json({error: error.message});
        }
    })();
}

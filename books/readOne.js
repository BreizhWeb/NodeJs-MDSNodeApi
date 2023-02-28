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
            const {id} = req.params;


            console.log("ID", req.params)
            const book = await Book.findByPk(id);

            if (book) {
                console.log('Book  find')
                res.status(200).json(book);
            } else {
                res.status(404).json({message: `Book with ID ${id} not found`});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    })();
}

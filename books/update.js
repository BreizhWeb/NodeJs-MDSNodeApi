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
            const id = req.url.split("/")[2];
            let body = "";

            // Listen for data event
            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            // Listen for end event
            req.on("end", async () => {
                try {
                    const book = await Book.findByPk(id);

                    if (!book) {
                        return res.writeHead(404, {message: `Book with ID ${id} not found`});
                    } else {
                        const {title, description, publishedYear, author} = JSON.parse(body);

                        const updatedBook = await book.update({
                            title,
                            description,
                            publishedYear,
                            author,
                        });

                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify(updatedBook));
                    }
                } catch (error) {
                    res.writeHead(500, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(error));
                }
            });
        } catch (error) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify(error));
        }
    })();

}

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "./database.sqlite3"
});

module.exports = function(req,res) {

    const Book = sequelize.define("book", {
        title: DataTypes.TEXT,
        description: DataTypes.TEXT,
        publishedYear: DataTypes.INTEGER,
        author: DataTypes.TEXT
    });

    (async () => {
        await sequelize.sync({ force: false });
        try {
            console.log('debut')
            let body = "";

            // Listen for data event
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            console.log('on continue')
            // Listen for end event
            req.on("end", async () => {
                Book.create(JSON.parse(body)).then((data) => {
                    console.log("REUSSI JE CROIS")
                    Book.findAll({ raw: true }).then((data) => {
                        console.log('VRAIMENT REUSSI')
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify(data));
                    })
                });
            });
        } catch (error) {
            console.log("ERROR")
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
        }
    })();
}


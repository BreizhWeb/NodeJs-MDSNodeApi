const http = require("http");

const server = http.createServer(async (req, res) => {
    if (req.method === "PUT" && req.url.startsWith("/books/")) {
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
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: `Book with ID ${id} not found` }));
                } else {
                    const { title, description, publishedYear, author } = JSON.parse(body);

                    const updatedBook = await book.update({
                        title,
                        description,
                        publishedYear,
                        author,
                    });

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(updatedBook));
                }
            } catch (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});

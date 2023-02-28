module.exports = function(res) {
    let number = Math.floor(Math.random() * 100);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(number));
}
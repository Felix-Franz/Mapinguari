import express from "express";

const port = 8080;

const app = express();
app.get("/socket", (req, res) => {
    res.send('Hello World!')
});
app.use(express.static(`${__dirname}/public`))

app.listen(port, () => {
    console.log(`Cthulu startet on http://localhost:${port}`)
})
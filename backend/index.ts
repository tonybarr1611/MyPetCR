import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use((req, res, next) => {
    process.env.TZ = 'UTC';
    next();
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
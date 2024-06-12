import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use((req, res, next) => {
    process.env.TZ;
    next();
});

app.use(express.json());

app.use('/api/v1', routes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
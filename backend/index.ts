import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes";
import auth from "./auth";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.SERVER_PORT;

app.use((req, res, next) => {
    process.env.TZ;
    next();
});

const allowedOrigins = ['http://localhost:5173'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(express.json());

app.use('/api/v1', routes);


app.get("/", (req, res) => {
    res.send("Hello World");
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });
  

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
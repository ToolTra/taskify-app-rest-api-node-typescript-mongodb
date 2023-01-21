import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// The error handler
import errorHandlerMiddleware from "./middlewares/errorHandler";

// Controllers
import authController from "./controllers/AuthController";

// Middlewares
import { validateRegistrationUser } from "./middlewares/validations/user";

// The express application
const app = express();

// CORS handling
app.use(cors());

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Index
app.get("/", (req, res) => {
  console.log(req.cookies.access_token);
  res.send(`
    <h1>This is the taskify app's rest api.</h1>
    <p>If you want to access the resources, please point the routes available.</p>
  `);
});

// User registration route
app.post("/api/register", validateRegistrationUser, authController.register);

app.use(errorHandlerMiddleware);

export default app;

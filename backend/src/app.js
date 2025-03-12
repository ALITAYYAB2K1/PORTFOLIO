import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express();
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieparser());

export default app;

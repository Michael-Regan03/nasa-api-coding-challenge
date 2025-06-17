import packageJSON from "../../../package.json";
import express, { Application } from "express";
import cors from "cors";
import { Request, Response } from "express";
import { RespExampleType, ApodResponseType } from "@/typings/types";
import axios from "axios";

const app: Application = express();

require("dotenv").config();


app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve a successful response. For use with wait-on
app.get("/api/v1/health", (req, res) => {
  res.send({ status: "ok" });
});

app.get(`/api/v1/version`, (req: Request, res: Response) => {
  const respObj: RespExampleType = {
    id: 1,
    version: packageJSON.version,
    envVal: process.env.ENV_VALUE as string, // sample server-side env value
  };
  res.send(respObj);
});

const NASA_API_KEY = process.env.NASA_API_KEY;

// Astronomy Picture of the Day
app.get(`/api/v1/apod/:date?`, async (req: Request, res: Response) => {
  try {
    const date = req.params.date;
    const nasaRes = await axios.get<ApodResponseType>(
      "https://api.nasa.gov/planetary/apod",
      {
        params: {
          api_key: NASA_API_KEY,
          ...(date && { date }),
        },
      }
    );

    const respObj: ApodResponseType = nasaRes.data;
    res.send(respObj);
  } catch (error) {
    console.error("Error fetching APOD:", error);
    res.status(500).json({ error: "Failed to fetch APOD data" });
  }
});




app.use(express.static("./.local/vite/dist"));

export default app;

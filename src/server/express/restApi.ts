import packageJSON from "../../../package.json";
import express, { Application } from "express";
import cors from "cors";
import { Request, Response } from "express";
import {
  RespExampleType,
  ApodResponseType,
  NeoResponseType,
  NearEarthObject,
  CoronalMassEjectionAnalysis,
} from "@/typings/types";
import axios from "axios";
import {
  extractAllNEOs,
  normalizeAsteroidSizes,
} from "@/services/neo/normalizeAsteroidSize";

const app: Application = express();

require("dotenv").config();

app.use(express.json({ limit: "20mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve a successful response. For use with wait-on
app.get("/api/v1/health", (req, res) => {
  res.send({ status: "ok" });
});

const NASA_API_KEY = process.env.NASA_API_KEY;

// Astronomy Picture of the Day
app.get(`/api/v1/apod/:date?`, async (req: Request, res: Response) => {
  try {
    const date = req.query.date;
    const nasaRes = await axios.get<ApodResponseType>(
      "https://api.nasa.gov/planetary/apod",
      {
        params: {
          api_key: NASA_API_KEY,
          date: date,
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

// Near Earth Objects Feed
app.post(`/api/v1/neo`, async (req: Request, res: Response) => {
  try {
    const { start_date, end_date } = req.body;

    const nasaRes = await axios.get<NeoResponseType>(
      "https://api.nasa.gov/neo/rest/v1/feed",
      {
        params: {
          api_key: NASA_API_KEY,
          ...(start_date && { start_date }),
          ...(end_date && { end_date }),
        },
      }
    );

    const respObj: NeoResponseType = nasaRes.data;

    const NEOs = extractAllNEOs(respObj);
    const normalizedNEOs = normalizeAsteroidSizes(NEOs);

    res.send(normalizedNEOs);
  } catch (error) {
    console.error("Error fetching NEO:", error);
    res.status(500).json({ error: "Failed to fetch NEO data" });
  }
});

// Near Earth Objects Lookup
app.get(`/api/v1/neo/:neo_id`, async (req: Request, res: Response) => {
  try {
    const { neo_id } = req.params;

    const nasaRes = await axios.get<NearEarthObject>(
      `https://api.nasa.gov/neo/rest/v1/neo/${neo_id}`,
      {
        params: {
          api_key: process.env.NASA_API_KEY,
        },
      }
    );

    res.json(nasaRes.data);
  } catch (error) {
    console.error("Error fetching NEO:", error);
    res.status(500).json({
      error: "Failed to fetch NEO",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Coronal Mass Ejection Analysis
app.post(`/api/v1/cme`, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;

    const nasaRes = await axios.get<CoronalMassEjectionAnalysis[]>(
      `https://api.nasa.gov/DONKI/CMEAnalysis`,
      {
        params: {
          api_key: NASA_API_KEY,
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
        },
      }
    );

    const respObj: CoronalMassEjectionAnalysis[] = nasaRes.data;
    res.send(respObj);
  } catch (error) {
    console.error("Error fetching CME data:", error);
    res.status(500).json({ error: "Failed to fetch CME data" });
  }
});

app.use(express.static("./.local/vite/dist"));

export default app;

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

// Near Earth Objects Feed
app.post(`/api/v1/neo`, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;

    console.log(
      "Received request with startDate:",
      startDate,
      "endDate:",
      endDate
    );

    const nasaRes = await axios.get<NeoResponseType>(
      "https://api.nasa.gov/neo/rest/v1/feed",
      {
        params: {
          api_key: NASA_API_KEY,
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
        },
      }
    );

    const respObj: NeoResponseType = nasaRes.data;

    const NEOs = extractAllNEOs(respObj);
    const normalizedNEOs = normalizeAsteroidSizes(NEOs);

    console.log(normalizedNEOs.length, " normalized NEOs size");

    res.send(normalizedNEOs);
  } catch (error) {
    console.error("Error fetching NEO:", error);
    res.status(500).json({ error: "Failed to fetch NEO data" });
  }
});

// Near Earth Objects Lookup
app.get(`/api/v1/neo/:asteroid_id`, async (req: Request, res: Response) => {
  try {
    const { asteroid_id } = req.params;

    const nasaRes = await axios.get<NearEarthObject>(
      `https://api.nasa.gov/neo/rest/v1/neo/${asteroid_id}`,
      {
        params: {
          api_key: NASA_API_KEY,
        },
      }
    );

    const respObj: NearEarthObject = nasaRes.data;
    res.send(respObj);
  } catch (error) {
    console.error("Error fetching NEO astroid:", error);
    res.status(500).json({ error: "Failed to fetch NEO astroid" });
  }
});

// Coronal Mass Ejection Analysis
app.post(`/api/v1/cme`, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.params;

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
    console.log(" CME data length", respObj);
    res.send(respObj);
  } catch (error) {
    console.error("Error fetching CME data:", error);
    res.status(500).json({ error: "Failed to fetch CME data" });
  }
});

app.use(express.static("./.local/vite/dist"));

export default app;

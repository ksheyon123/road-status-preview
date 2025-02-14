import type { NextApiRequest, NextApiResponse } from "next";
import { routeInfo } from "@/constants/index";
import fetch from "node-fetch";

type ResponseData = {
  data?: any;
  message?: string;
  error?: {
    message: string;
    code?: string;
    name?: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const id = req.query.id;
    console.log(`${process.env.REMOTE_SERVER_API_URL}/api/v1/routes/${id}`);

    const r = await fetch(
      `${process.env.REMOTE_SERVER_API_URL}/api/v1/routes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    if (r.status === 200) {
      const data = await r.json();
      res.status(200).json({ data });
    } else {
      throw new Error(r.statusText);
    }
  } catch (e: any) {
    console.error("Error details:", {
      message: e.message,
      code: e.code,
      name: e.name,
      stack: e.stack,
    });
    res.status(500).json({
      error: {
        message: e.message,
        code: e.code,
        name: e.name,
      },
    });
  }
}

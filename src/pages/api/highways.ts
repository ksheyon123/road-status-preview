import type { NextApiRequest, NextApiResponse } from "next";
import { highways } from "@/constants/index";
type ResponseData = {
  data?: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    console.log(`${process.env.REMOTE_SERVER_API_URL}/api/v1/highways`);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    const r = await fetch(
      `${process.env.REMOTE_SERVER_API_URL}/api/v1/highways`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);
    if (r.status === 200) {
      const data = await r.json();
      res.status(200).json({ data });
    } else {
      throw new Error(r.statusText);
    }
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ data: e });
  }
}

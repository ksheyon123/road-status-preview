import type { NextApiRequest, NextApiResponse } from "next";
import { highways } from "@/constants/index";
import fetch from "node-fetch";
import { get } from "@/https";
import { HighwayInfo } from "@/types/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(`${process.env.REMOTE_SERVER_API_URL}/api/v1/highways`);
    const config = {
      timeout: 60000,
    };
    const { data } = await get<HighwayInfo>(
      `${process.env.REMOTE_SERVER_API_URL}/api/v1/highways`,
      config
    );
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({
      error: {
        message: e.message,
        code: e.code,
        name: e.name,
      },
    });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { highways } from "@/constants/index";
import { get } from "@/https";
import { HighwayInfo } from "@/types/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(`${process.env.REMOTE_SERVER_API_URL}/api/v1/accidents`);
    const config = {
      timeout: 5000,
    };
    const { data } = await get<HighwayInfo>(
      `${process.env.REMOTE_SERVER_API_URL}/api/v1/accidents`,
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

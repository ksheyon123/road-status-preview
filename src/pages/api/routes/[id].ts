import type { NextApiRequest, NextApiResponse } from "next";
import { get } from "@/https";
import { RouteInfo } from "@/types/index";
import { routeInfo } from "@/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id;
    console.log(`${process.env.REMOTE_SERVER_API_URL}/api/v1/routes/${id}`);
    const config = {
      timeout: 60000,
    };
    const { data } = await get<RouteInfo>(
      `${process.env.REMOTE_SERVER_API_URL}/api/v1/routes/${id}`,
      config
    );

    res.status(200).json(data);
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

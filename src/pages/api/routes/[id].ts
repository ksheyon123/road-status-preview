import type { NextApiRequest, NextApiResponse } from "next";
import { routeInfo } from "@/constants/index";
type ResponseData = {
  data?: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const id = req.query.id;
  let data = routeInfo;
  const r = await fetch(
    `${
      process.env.REMOTE_SERVER_API_URL || "http://dany.com"
    }/api/v1/routes/${id}`
  );
  if (r.status === 200) {
    data = await r.json();
  }

  res.status(200).json({ data });
}

import { NextApiRequest, NextApiResponse } from 'next';
import { gateway } from '../../lib/sdks/server-sdk';

export default async function request(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const baseHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const { body, url } = req;

    let response: { status: number; data: any };


    const fullUrl = `${url?.replace('/internal-api', '')}`;

    console.log(fullUrl);

    switch (req.method?.toUpperCase()) {
      case 'GET':
        response = await gateway.get(fullUrl, {
          headers: baseHeaders,
        });
        break;

      case 'POST':
        response = await gateway.post(fullUrl, {
          headers: baseHeaders,
          body: body,
        });

        break;

      default:
        response = { status: 405, data: { message: 'METHOD NOT SUPPORTED' } };
        break;
    }

    return res.status(response.status).json(response.data);
  } catch (err: any) {
    // console.log(err);
    return res
      .status(err.status || 500)
      .json({ status: err.status, message: err.message });
  }
}

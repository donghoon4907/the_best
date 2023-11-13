import type { NextApiRequest, NextApiResponse } from 'next';
import carsService from '@services/carsService';
import { tokenMiddleware } from '@utils/middleware/next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    tokenMiddleware(req, res);

    const { body } = req;

    try {
        const { data } = await carsService.createCar(body);

        res.status(200).json({ data });
    } catch {
        res.status(500).json({
            message: '알 수 없는 문제가 발생했습니다.',
        });
    }
}

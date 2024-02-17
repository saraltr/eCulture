import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    try {
        switch (req.method) {

            case 'GET':
                const { id } = req.query;
                if (id) {
                    const event = await prisma.event.findUnique({
                        where: {
                            id: Number(id)
                        }
                    });
                if (event) {
                    res.status(200).json(event);
                } else {
                    res.status(404).json({ error: 'Event not found' });
                }
                } else {
                    const events = await prisma.post.findMany();
                    if  (events) {
                        res.status(200).json(events);
                    } else {
                        res.status(404).json({ error: 'List of Events not found' });
                    }
                }
                break;
            // case 'POST':
            //     const { image, description, userId } = req.body.postData;

            //     const createdEvent = await prisma.posts.create({
            //         data: {
            //             image: image,
            //             description: description,
            //             userId: userId,
            //         }
            //     });
            //     res.status(200).json(createdEvent);
            //     break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
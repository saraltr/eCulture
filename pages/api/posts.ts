import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    try {
        switch (req.method) {
            case 'GET':
                const { id } = req.query;
                if (id) {
                    const post = await prisma.post.findUnique({
                        where: {
                            id: Number(id)
                        }
                    });
                if (post) {
                    res.status(200).json(post);
                } else {
                    res.status(404).json({ error: 'Post not found' });
                }
                } else {
                    const events = await prisma.post.findMany();
                    if  (events) {
                        res.status(200).json(events);
                    } else {
                        res.status(404).json({ error: 'List of Posts not found' });
                    }
                }
                break;
            case 'POST':
                const { image, description, username } = req.body;

                const createdPost = await prisma.post.create({
                    data: {
                        image: image,
                        description: description,
                        name: username,
                    }
                });
                res.status(200).json(createdPost);
                break;
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
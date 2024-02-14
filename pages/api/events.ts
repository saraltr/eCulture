import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    try {
        switch (req.method) {

            case 'GET':
                const { id } = req.query;
                if (id) {
                    const event = await prisma.events.findUnique({
                        where: {
                            id: String(id)
                        }
                    });
                if (event) {
                    res.status(200).json(event);
                } else {
                    res.status(404).json({ error: 'Event not found' });
                }
                } else {
                    const events = await prisma.events.findMany();
                    if  (events) {
                        res.status(200).json(events);
                    } else {
                        res.status(404).json({ error: 'List of Events not found' });
                    }
                }
                break;
            case 'POST':
                const { name, description, startDate, endDate, image, category } = req.body.eventData;
                if (!name) {
                    return res.status(400).json({ error: 'Name is required' });
                } if (!description) {
                    return res.status(400).json({ error: 'Description is required' });
                } if (!startDate) {
                    return res.status(400).json({ error: 'StardDacte is required' });
                } if (!image) {
                    return res.status(400).json({ error: 'Image is required' });
                } if (!category) {
                     return res.status(400).json({ error: 'Category is required' });
                }

                const createdEvent = await prisma.events.create({
                    data: {
                        name: name,
                        description: description,
                        startDate: startDate,
                        endDate: endDate,
                        image: image,
                        category: category,
                    }
                });
                res.status(200).json(createdEvent);
                break;
            case 'PUT' :
                const { eventId } = req.query;
                const { commentData } = req.body;
                try {
                    const updatedEvent = await prisma.events.update({
                        where: {id: String(eventId)},
                        data: {
                        comments: {
                            push: commentData,
                        },
                        }
                    });
                    res.status(200).json(updatedEvent);
                    } catch (error) {
                    console.error('Error updating product:', error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
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
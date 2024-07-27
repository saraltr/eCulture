import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    try {
        switch (req.method) {
            case 'GET':
                // gets single event using its id
                const { singleId } = req.query;
                if (singleId) {
                    const event = await prisma.event.findUnique({
                        where: {
                            id: Number(singleId)
                            
                        }, 
                        include: {
                            comments: true,
                        }
                    });
                if (event) {
                    res.status(200).json(event);
                } else {
                    res.status(404).json({ error: 'Event not found' });
                }
                } else {
                    // gets list of events
                    const events = await prisma.event.findMany();
                    if (events) {
                        res.status(200).json(events);
                    } else {
                        res.status(404).json({ error: 'List of Events not found' });
                    }
                }
                break;
            case 'POST':
                const { eventId } = req.query;

                const { name, description, location, startDate, endDate, image, category, likes, commentData, registerStatus } = req.body;

                if(commentData) {

                    if (typeof commentData !== 'object') {
                        return res.status(400).json({ error: 'Invalid commentData' });
                    }

                        if (!commentData.content || !commentData.username) {
                            return res.status(400).json({ error: 'Missing content or username in commentData' });
                        }

                        if (commentData.content.trim() === '') {
                            return res.status(400).json({ error: 'Empty comment' });
                        }

                        const updatedEvent = await prisma.comment.create({
                        data: {
                        content: commentData.content,
                        event: {
                            connect: {
                            id: Number(eventId)
                            }
                        },
                        profile: {
                            connectOrCreate: {
                            where: { username: commentData.username }, // check if profile with username exists
                            create: { username: commentData.username } // if not create a new profile
                            }
                        }
                        }
                    });
                res.status(200).json(updatedEvent);

                } else if (registerStatus) {

                    const existing = await prisma.registration.findFirst({
                        where: {
                            eventId: Number(eventId),
                            participant: registerStatus.participant
                        }
                    });

                    if (existing){
                        return res.status(400).json({ message: "You are already registered for this event"});
                    }
                    
                        const updatedRegistration = await prisma.registration.create({
                           data: {
                            event : {
                                connect: {
                                    id: Number(eventId)
                                }
                            },
                            profile: {
                                connectOrCreate: {
                                    where: { username: registerStatus.participant
                                    },
                                    create: {
                                        username: registerStatus.participant
                                    }
                                }
                            }
                           } 
                        });

                        res.status(200).json(updatedRegistration);

                } 
                // creates a new event
                else {

                if (typeof name !== 'string' || name.trim() === '') {
                    return res.status(400).json({ error: 'Invalid name' });
                }

                if (typeof description !== 'string') {
                    return res.status(400).json({ error: 'Invalid description' });
                }

                if (typeof location !== 'string') {
                    return res.status(400).json({ error: 'Invalid location' });
                }

                if (typeof startDate !== 'string' || isNaN(Date.parse(startDate))) {
                    return res.status(400).json({ error: 'Invalid startDate' });
                }

                if (typeof endDate !== 'string' || isNaN(Date.parse(endDate))) {
                    return res.status(400).json({ error: 'Invalid endDate' });
                }

                if (typeof image !== 'string' || !image.trim()) {
                    return res.status(400).json({ error: 'Invalid image URL' });
                }

                if (!Array.isArray(category) || category.some(cat => typeof cat !== 'string')) {
                    return res.status(400).json({ error: 'Invalid category' });
                }

                if (typeof likes !== 'number' && likes !== null) {
                    return res.status(400).json({ error: 'Invalid likes count' });
                }

                try {
                    const createEvent = await prisma.event.create({
                        data: {
                            name: name,
                            description: description,
                            location: location,
                            startDate: new Date(startDate),
                            endDate: new Date(endDate),
                            image: image,
                            category: category,
                            likes: likes
                        }
                    });

                    res.status(200).json(createEvent);
                } catch (error) {
                    console.error('Error creating event:', error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
                break;
            }
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
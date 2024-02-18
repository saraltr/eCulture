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
                    if  (events) {
                        res.status(200).json(events);
                    } else {
                        res.status(404).json({ error: 'List of Events not found' });
                    }
                }
                break;
            case 'POST' :
                const { eventId } = req.query;
                const { commentData, registerStatus } = req.body;
                try {
                    if (commentData){
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
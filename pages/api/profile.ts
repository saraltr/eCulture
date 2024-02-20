import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    try {
        switch (req.method) {
            case 'GET':
                try {
                    const { user } = req.query;
                    let profile = await prisma.profile.findUnique( {
                        where: {
                            username: String(user)
                        },
                        include: {
                            comments: true,
                            registrations: true,
                            posts: true
                        }
                    })
                    if (!profile) {
                        let profile = await prisma.profile.create({
                            data : {
                                username: String(user)
                            }
                        })
                    } 
                    res.status(200).json(profile);
                } catch(error) {
                    console.error(error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
                break

            case 'DELETE':
                const { id } = req.query;
                const { username } = req.body
                try{
                    
                await prisma.registration.deleteMany({
                    where: {
                        eventId: Number(id),
                        participant: username
                    }
                });
                
                res.status(204).end();
                } catch(error) {
                    console.error(error);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
                default:
                res.setHeader('Allow', ['GET', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);

        }
        } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
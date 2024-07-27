import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    try {
        switch (req.method) {
        case 'GET':
            const { id, mostLiked } = req.query;
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
            } else if (mostLiked === 'true') {
                const mostLikedPosts = await prisma.post.findMany({
                    take: 6,
                    where: {
                        likes: {
                            not: null
                        }
                    },
                    orderBy: {
                        likes: 'desc'
                    }
                });
                if (mostLikedPosts.length > 0) {
                    res.status(200).json(mostLikedPosts);
                } else {
                    res.status(404).json({ error: 'No most liked posts found' });
                }
            } else {
                const recentPosts = await prisma.post.findMany({
                    take: 10,
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
                if (recentPosts.length > 0) {
                    res.status(200).json(recentPosts);
                } else {
                    res.status(404).json({ error: 'No posts found' });
                }
            }
            break;
        case 'POST':
                const { image, description, username, likes } = req.body;

                if (!image || !description || !username) {
                    return res.status(400).json({ error: 'Missing image, description, or username' });
                }

                if (typeof image !== 'string') {
                    return res.status(400).json({ error: 'Invalid image URL' });
                }

                if (typeof username !== 'string' || username.trim() === '') {
                    return res.status(400).json({ error: 'Invalid username' });
                }

                const createdPost = await prisma.post.create({
                    data: {
                        image: image,
                        description: description,
                        name: username,
                        likes: likes
                    }
                });
                res.status(200).json(createdPost);
                break;
        case 'PUT': 
        // updates post's likes
                const { postId, action } = req.body;

                const incrementValue = action === true ? 1 : -1;

                const updateLikes = await prisma.post.update({
                    where: {
                        id: Number(postId)
                    },
                    data: {
                        likes: {
                            increment: incrementValue
                        } 
                    }
                });

                res.status(200).json(updateLikes);

            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}
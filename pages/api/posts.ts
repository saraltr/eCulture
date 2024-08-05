import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';
import { error } from 'console';

// disable default body parser for this API route to handle file uploads manually
export const config = {
  api: {
    bodyParser: false,
  },
};


const uploadDir = path.join(process.cwd(), 'public/posts');

// create the directory if it does not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const form = formidable({
  uploadDir, // directory where files will be uploaded
  keepExtensions: true, // preserve the original file extensions
  multiples: false,    // only expect a single file per field
});

// parse form data and extract fields and files
const parseForm = (req: NextApiRequest): Promise<{ fields: Fields, files: Files }> =>
  new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err); // reject the promise if there's an error
      resolve({ fields, files }); // resolve the promise with parsed fields and files
    });
  });

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
            const { fields, files } = await parseForm(req);

            const file = (files.file instanceof Array ? files.file[0] : files.file) as formidable.File;
            const description = Array.isArray(fields.description) ? fields.description[0] : fields.description || "";
            const username = Array.isArray(fields.username) ? fields.username[0] : fields.username;
            const likes = Array.isArray(fields.likes) ? Number(fields.likes[0]) : Number(fields.likes);

            if (!file) {
              res.status(400).json({error: "Missing image file"})
            } else if (!description) {
              res.status(400).json({error: "Missing description"})
            } else if (!username) {
              res.status(400).json({error: "Missing username"})
            }

            if (typeof username !== "string" || username.trim() === "") {
                return res.status(400).json({ error: "Invalid username" });
            }

                const createdPost = await prisma.post.create({
                    data: {
                        image: `/posts/${file.newFilename}`,
                        description: description as string,
                        name: username,
                        likes: isNaN(likes) ? 0 : likes,
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
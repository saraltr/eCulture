// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { parseForm, config } from '../../src/lib/formidable';
import { File } from 'formidable';

const prisma = new PrismaClient();

export { config };  // Re-export to disable Next.js body parsing

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { files } = await parseForm(req);

    // Type assertion to handle File[] | undefined type
    const file = (files.file instanceof Array ? files.file[0] : files.file) as File;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // const document = await prisma.document.create({
    //   data: {
    //     filename: file.newFilename,
    //     fileUrl: `/uploads/${file.newFilename}`,
    //   },
    // });

    res.status(200).json({ document });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save the document' });
  }
};

export default handler;
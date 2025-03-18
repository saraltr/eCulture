// lib/formidable.ts
import formidable, { Fields, Files } from "formidable";
import { NextApiRequest } from "next";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public/posts");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const form = formidable({
  uploadDir,
  keepExtensions: true,
  multiples: false,
});

export const parseForm = (req: NextApiRequest): Promise<{ fields: Fields, files: Files }> =>
  new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
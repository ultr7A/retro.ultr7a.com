import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/exhibit
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  const session = await getSession({ req });

  console.log("creating exhibit: ",
  {
     req,
     res,
     session  
  });

  const result = await prisma.exhibit.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
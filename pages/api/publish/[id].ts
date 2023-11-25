import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
export default async function handle(req, res) {
  const exhibitId = req.query.id;
  const exhibit = await prisma.exhibit.update({
    where: { id: exhibitId },
    data: { published: true },
  });
  res.json(exhibit);
}
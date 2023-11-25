import prisma from '../../../lib/prisma';

// DELETE /api/exhibit/:id
export default async function handle(req, res) {
  const exhibitId = req.query.id;
  
  if (req.method === 'DELETE') {
    
    const exhibit = await prisma.exhibit.delete({
      where: { id: exhibitId },
    });
    res.json(exhibit);
  } else {

    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
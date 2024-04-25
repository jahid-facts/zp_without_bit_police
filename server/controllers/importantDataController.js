const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
exports.getImportantData = async (req, res) => {
  const data = await prisma.Important_Data.findMany({
    include: {
      heading: true,
    },
  });
  res.json(data);
};

exports.getSingleImportantData = async (req, res) => {
  const data = await prisma.Important_Data.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json(data);
};

exports.saveImportantData = async (req, res) => {
  const data = await prisma.Important_Data.create({
    data: req.body,
  });
  res.json(data);
};
exports.updateImportantData = async (req, res) => {
  const { title, link, headingId } = req.body;
  const data = await prisma.Important_Data.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      title,
      link,
      headingId: Number(headingId),
    },
  });

  res.json(data);
};
exports.deleteImportantData = async (req, res) => {
  const data = await prisma.Important_Data.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json(data);
};

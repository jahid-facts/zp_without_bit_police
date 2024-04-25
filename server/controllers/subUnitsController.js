const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
exports.getSubUnits = async (req, res) => {
  const news = await prisma.Sub_Units.findMany({
    include: {
      unit: true,
    },
  });
  res.json(news);
};
exports.getSubUnitsCircle = async (req, res) => {
  const news = await prisma.Sub_Units.count({
    where: {
      unit: {
        title: "সার্কেল অফিস",
      },
    },
  });
  res.json(news);
};
exports.getSubUnitsThana = async (req, res) => {
  const news = await prisma.Sub_Units.count({
    where: {
      unit: {
        title: "থানা",
      },
    },
  });
  res.json(news);
};

exports.getSingleSubUnits = async (req, res) => {
  const user = await prisma.Sub_Units.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      forces: true,
      ex_forces: true,
    },
  });
  res.json(user);
};

exports.saveSubUnits = async (req, res) => {
  const { title, unitId, index, content } = req.body;
  const news = await prisma.Sub_Units.create({
    data: {
      title,
      unitId,
      index,
      content,
    },
  });
  res.json(news);
};
exports.updateSubUnits = async (req, res) => {
  try {
    const { title, unitId, index, content } = req.body;
    const updatedSubUnit = await prisma.Sub_Units.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title,
        unitId,
        index,
        content,
      },
    });

    res.json(updatedSubUnit);
  } catch (error) {
    // Handle errors gracefully
    console.error("Error updating sub unit:", error);
    res.status(500).json({ error: "Failed to update sub unit" });
  }
};

exports.deleteSubUnits = async (req, res) => {
  const news = await prisma.Sub_Units.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json(news);
};

const path = require("path");
const user = require("../models/users.model");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getImportantHeading = async (req, res) => {
  try {
    const headings = await prisma.Important_Heading.findMany({
      include: {
        importantData: true,
      },
    });
    res.json(headings);
  } catch (error) {
    console.error("Error fetching important headings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSingleImportantHeading = async (req, res) => {
  try {
    const heading = await prisma.Important_Heading.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(heading);
  } catch (error) {
    console.error("Error fetching single important heading:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.saveImportantHeading = async (req, res) => {
  try {
    const { title } = req.body;
    const heading = await prisma.Important_Heading.create({
      data: {
        title,
      },
    });
    res.json(heading);
  } catch (error) {
    console.error("Error saving important heading:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateImportantHeading = async (req, res) => {
  try {
    const { title } = req.body;
    const heading = await prisma.Important_Heading.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title,
      },
    });
    res.json(heading);
  } catch (error) {
    console.error("Error updating important heading:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteImportantHeading = async (req, res) => {
  try {
    const heading = await prisma.Important_Heading.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(heading);
  } catch (error) {
    console.error("Error deleting important heading:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

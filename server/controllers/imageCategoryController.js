const path = require("path");
const user = require("../models/users.model");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const fs = require("fs");

const prisma = new PrismaClient();
exports.getImageGalleryCategory = async (req, res) => {
  const slide = await prisma.image_Gallery_Category.findMany();
  res.json(slide);
};

// image upload
var Storage = multer.diskStorage({
  destination: function (req, file, cv) {
    cv(null, "./public/uploads/");
  },
  filename: function (req, file, cv) {
    cv(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

exports.getSingleImageGalleryCategory = async (req, res) => {
  const slide = await prisma.Image_Gallery_Category.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      imageGallery: true,
    },
  });
  res.json(slide);
};

exports.saveImageGalleryCategory = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "File upload error" });
    } else if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const { title } = req.body;
    const image = req.file.filename;

    try {
      const slide = await prisma.Image_Gallery_Category.create({
        data: {
          title,
          image,
        },
      });
      res.json(slide);
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  });
};

exports.updateImageGalleryCategory = async (req, res) => {
  const slideId = Number(req.params.id);
  try {
    const existingImageGalleryCategory =
      await prisma.Image_Gallery_Category.findUnique({
        where: { id: slideId },
      });

    if (!existingImageGalleryCategory) {
      return res.status(404).json({ error: "ImageGalleryCategory not found" });
    }

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "File upload error" });
      } else if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      const newImage = req?.file;
      const previousImagePath = path.join(
        "public",
        "uploads",
        existingImageGalleryCategory.image
      );
      if (newImage) {
        fs.unlinkSync(previousImagePath);
      }

      // Update slide with new image
      const updatedImageGalleryCategory =
        await prisma.Image_Gallery_Category.update({
          where: { id: slideId },
          data: {
            title: req.body.title,
            image: newImage
              ? newImage.filename
              : existingImageGalleryCategory.image,
          },
        });
      res.json(updatedImageGalleryCategory);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteImageGalleryCategory = async (req, res) => {
  const slide = await prisma.Image_Gallery_Category.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  const previousImagePath = path.join("public", "uploads", slide.image);
  if (previousImagePath) {
    fs.unlinkSync(previousImagePath);
  }
  res.json(slide);
};

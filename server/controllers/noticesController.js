const path = require("path");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const fs = require("fs");

const prisma = new PrismaClient();
exports.getNotice = async (req, res) => {
  const notice = await prisma.NoticeCategoryRelation.findMany({
    distinct: ["noticeId"],
    include: {
      category: true,
      notice: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  res.json(notice);
};

// get all notice
exports.getAllNotice = async (req, res) => {
  const notice = await prisma.Notices.findMany({
    orderBy: {
      id: "desc",
    },
  });
  res.json(notice);
};
exports.getNoticeSetup = async (req, res) => {
  const notice = await prisma.NoticeCategoryRelation.findMany({
    include: {
      category: true,
      notice: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  res.json(notice);
};
exports.getNoticeByCategoryId = async (req, res) => {
  const categoryId = Number(req.params.id);
  const page = parseInt(req.query.page) || 1; // Get the page number from query string, default to 1
  const perPage = 3; // Number of notices per page

  try {
    const notices = await prisma.NoticeCategoryRelation.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
        notice: true,
      },
      orderBy: {
        id: "desc",
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const totalCount = await prisma.NoticeCategoryRelation.count({
      where: {
        categoryId: categoryId,
      },
    });

    const totalPages = Math.ceil(totalCount / perPage);

    res.json({
      perPage: perPage,
      currentPage: page,
      totalPages: totalPages,
      notices: notices,
    });
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllNoticeByCategoryId = async (req, res) => {
  const categoryId = Number(req.params.id);

  try {
    const notices = await prisma.NoticeCategoryRelation.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
        notice: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
}).single("file");

exports.getSingleNoticeSetUp = async (req, res) => {
  const notice = await prisma.NoticeCategoryRelation.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      category: true,
      notice: true,
    },
  });
  res.json(notice);
};
exports.getSingleNotice = async (req, res) => {
  const notice = await prisma.Notices.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json(notice);
};

exports.saveNotice = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "File upload error" });
    } else if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const { published_in_news, content, title } = req.body;
    const file = req?.file?.filename ? req?.file?.filename : null;

    try {
      const notice = await prisma.Notices.create({
        data: {
          published_in_news: published_in_news === "true" ? true : false,
          content,
          title,
          file,
        },
      });
      const categoryIds = req.body.categories;
      console.log(categoryIds, "categoryIds");
      // Assuming you have already created the "notice" object

      async function associateNoticeWithCategories() {
        for (const categoryId of categoryIds) {
          console.log(categoryId, "id");
          await prisma.noticeCategoryRelation.create({
            data: {
              noticeId: notice.id,
              categoryId: parseInt(categoryId),
            },
          });
        }
      }

      // Call the function to associate the notice with categories
      associateNoticeWithCategories()
        .then(() => {
          console.log("Categories associated with the notice successfully.");
        })
        .catch((error) => {
          console.error("Error associating categories with the notice:", error);
        });

      res.json(notice);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Database error" });
    }
  });
};

exports.updateNotice = async (req, res) => {
  const noticeId = Number(req.params.id);
  try {
    const existingNotice = await prisma.Notices.findUnique({
      where: { id: noticeId },
    });

    if (!existingNotice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "File upload error" });
      } else if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      const file = req?.file;
      let previousImagePath = null; // Initialize as null

      if (existingNotice.file) {
        // Construct the previousImagePath if existingNotice.file is defined
        previousImagePath = path.join("public", "uploads", existingNotice.file);
      }

      if (file) {
        // Check if the previousImagePath is not null before unlinking
        if (previousImagePath) {
          fs.unlinkSync(previousImagePath);
        }
      }
      // Update notice with new image
      const { published_in_news, categories, content, title } = req.body;
      const updatedNotice = await prisma.Notices.update({
        where: { id: noticeId },
        data: {
          published_in_news: published_in_news === "true" ? true : false,
          content: content,
          title: title,
          file: file ? file.filename : existingNotice.file,
        },
      });

      // Delete existing associations with categories
      await prisma.noticeCategoryRelation.deleteMany({
        where: {
          noticeId: noticeId,
        },
      });

      // Create new associations with categories
      let categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];
      await Promise.all(
        categoriesArray.map(async (categoryId) => {
          await prisma.noticeCategoryRelation.create({
            data: {
              noticeId: noticeId,
              categoryId: parseInt(categoryId),
            },
          });
        })
      );

      res.json(updatedNotice);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.deleteNotice = async (req, res) => {
//   const notice = await prisma.NoticeCategoryRelation.delete({
//     where: {
//       id: Number(req.params.id),
//     },
//   });
//   // if (notice.file) {
//   //   const previousImagePath = path.join('public', 'uploads', notice.file);
//   //   if (previousImagePath) {
//   //     fs.unlinkSync(previousImagePath);
//   //   }
//   // }

//   res.json(notice);
// };
exports.deleteNotice = async (req, res) => {
  const noticeId = Number(req.params.id);

  try {
    // Delete all related records in the NoticeCategoryRelation table
    await prisma.NoticeCategoryRelation.deleteMany({
      where: {
        noticeId: noticeId,
      },
    });

    // Then, delete the notice itself
    await prisma.Notices.delete({
      where: {
        id: noticeId,
      },
    });

    res.json({ message: "Notice and its relations deleted successfully." });
  } catch (error) {
    console.error("Error deleting notice and its relations:", error);
    res.status(500).json({
      error: "An error occurred while deleting the notice and its relations.",
    });
  }
};

/// notice with category
exports.noticeWithCategory = async (req, res) => {
  const notice = await prisma.notices.findUnique({
    where: { id: Number(req.params.id) },
    include: { categories: true },
  });
  res.json(notice);
};

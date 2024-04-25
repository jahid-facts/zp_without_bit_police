/*
  Warnings:

  - Added the required column `imageCategoryId` to the `Image_Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image_gallery` ADD COLUMN `imageCategoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Image_Gallery_Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image_Gallery` ADD CONSTRAINT `Image_Gallery_imageCategoryId_fkey` FOREIGN KEY (`imageCategoryId`) REFERENCES `Image_Gallery_Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

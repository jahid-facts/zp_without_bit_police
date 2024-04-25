/*
  Warnings:

  - You are about to drop the column `userId` on the `bitnews` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `current_address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `fax` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `thanaId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bitnews` DROP FOREIGN KEY `BitNews_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_thanaId_fkey`;

-- AlterTable
ALTER TABLE `bitnews` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `address`,
    DROP COLUMN `current_address`,
    DROP COLUMN `designation`,
    DROP COLUMN `fax`,
    DROP COLUMN `index`,
    DROP COLUMN `location`,
    DROP COLUMN `mobile`,
    DROP COLUMN `status`,
    DROP COLUMN `thanaId`;

-- CreateTable
CREATE TABLE `Important_Heading` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Important_Data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,
    `headingId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Important_Data` ADD CONSTRAINT `Important_Data_headingId_fkey` FOREIGN KEY (`headingId`) REFERENCES `Important_Heading`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

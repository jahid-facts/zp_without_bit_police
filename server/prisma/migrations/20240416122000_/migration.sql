/*
  Warnings:

  - You are about to drop the `pagevisit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pagevisit`;

-- CreateTable
CREATE TABLE `Page_Visit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `totalVisits` INTEGER NOT NULL DEFAULT 0,
    `todayVisits` INTEGER NOT NULL DEFAULT 0,
    `lastUpdated` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

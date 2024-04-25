/*
  Warnings:

  - Added the required column `userId` to the `BitNews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bitnews` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `current_address` VARCHAR(191) NULL,
    ADD COLUMN `designation` VARCHAR(191) NULL,
    ADD COLUMN `fax` VARCHAR(191) NULL,
    ADD COLUMN `index` INTEGER NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `mobile` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL,
    ADD COLUMN `thanaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `BitNews` ADD CONSTRAINT `BitNews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_thanaId_fkey` FOREIGN KEY (`thanaId`) REFERENCES `Thana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

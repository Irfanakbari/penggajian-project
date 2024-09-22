/*
  Warnings:

  - You are about to drop the column `totalAlpha` on the `Salary` table. All the data in the column will be lost.
  - You are about to drop the column `totalSick` on the `Salary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Salary` DROP COLUMN `totalAlpha`,
    DROP COLUMN `totalSick`,
    ADD COLUMN `totalOff` INTEGER NOT NULL DEFAULT 0;

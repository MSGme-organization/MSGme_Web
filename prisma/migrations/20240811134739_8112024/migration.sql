/*
  Warnings:

  - You are about to drop the column `member` on the `Room` table. All the data in the column will be lost.
  - Added the required column `members` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "member",
ADD COLUMN     "members" INTEGER NOT NULL;

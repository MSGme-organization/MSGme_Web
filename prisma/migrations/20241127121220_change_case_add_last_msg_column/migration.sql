/*
  Warnings:

  - You are about to drop the column `created_at` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `group_image` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `group_name` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `public_key` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Friend_List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Friend_request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group_List` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reports` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupImage` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupName` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Group_room_id_idx";

-- DropIndex
DROP INDEX "Group_room_id_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "created_at",
DROP COLUMN "group_image",
DROP COLUMN "group_name",
DROP COLUMN "room_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "groupImage" TEXT NOT NULL,
ADD COLUMN     "groupName" TEXT NOT NULL,
ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isGroup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastMessage" TEXT,
ADD COLUMN     "lastMsgTimestamp" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "public_key",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "publicKey" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Friend_List";

-- DropTable
DROP TABLE "Friend_request";

-- DropTable
DROP TABLE "Group_List";

-- DropTable
DROP TABLE "Reports";

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "FriendRequestStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FriendList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GroupList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_senderId_receiverId_key" ON "FriendRequest"("senderId", "receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendList_roomId_key" ON "FriendList"("roomId");

-- CreateIndex
CREATE INDEX "FriendList_roomId_idx" ON "FriendList"("roomId");

-- CreateIndex
CREATE INDEX "FriendList_userId_idx" ON "FriendList"("userId");

-- CreateIndex
CREATE INDEX "FriendList_friendId_idx" ON "FriendList"("friendId");

-- CreateIndex
CREATE INDEX "GroupList_userId_idx" ON "GroupList"("userId");

-- CreateIndex
CREATE INDEX "GroupList_groupId_idx" ON "GroupList"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_roomId_key" ON "Group"("roomId");

-- CreateIndex
CREATE INDEX "Group_roomId_idx" ON "Group"("roomId");

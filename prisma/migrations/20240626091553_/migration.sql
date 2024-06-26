/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "Friend_request" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friend_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend_List" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,
    "room_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friend_List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "member" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "repoter_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,
    "group_image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group_List" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,

    CONSTRAINT "Group_List_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Friend_request_sender_id_idx" ON "Friend_request"("sender_id");

-- CreateIndex
CREATE INDEX "Friend_request_receiver_id_idx" ON "Friend_request"("receiver_id");

-- CreateIndex
CREATE INDEX "Friend_List_room_id_idx" ON "Friend_List"("room_id");

-- CreateIndex
CREATE INDEX "Friend_List_user_id_idx" ON "Friend_List"("user_id");

-- CreateIndex
CREATE INDEX "Friend_List_friend_id_idx" ON "Friend_List"("friend_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_room_id_key" ON "Group"("room_id");

-- CreateIndex
CREATE INDEX "Group_room_id_idx" ON "Group"("room_id");

-- CreateIndex
CREATE INDEX "Group_List_user_id_idx" ON "Group_List"("user_id");

-- CreateIndex
CREATE INDEX "Group_List_group_id_idx" ON "Group_List"("group_id");

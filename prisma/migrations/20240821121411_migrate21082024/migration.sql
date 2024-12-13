/*
  Warnings:

  - A unique constraint covering the columns `[sender_id,receiver_id]` on the table `Friend_request` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Friend_request_receiver_id_idx";

-- DropIndex
DROP INDEX "Friend_request_sender_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Friend_request_sender_id_receiver_id_key" ON "Friend_request"("sender_id", "receiver_id");

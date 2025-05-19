/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Refresh_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `Refresh_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Refresh_token" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_token_token_key" ON "Refresh_token"("token");

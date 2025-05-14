/*
  Warnings:

  - The primary key for the `_PermissoesToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permission_id` to the `Permissoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend_relation" DROP CONSTRAINT "Friend_relation_friend_id_fkey";

-- DropForeignKey
ALTER TABLE "_PermissoesToUser" DROP CONSTRAINT "_PermissoesToUser_B_fkey";

-- AlterTable
ALTER TABLE "Friend_relation" ALTER COLUMN "friend_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Permissoes" ADD COLUMN     "permission_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_PermissoesToUser" DROP CONSTRAINT "_PermissoesToUser_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_PermissoesToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refresh_token" (
    "id" TEXT NOT NULL,
    "expireIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_token_userId_key" ON "Refresh_token"("userId");

-- AddForeignKey
ALTER TABLE "Friend_relation" ADD CONSTRAINT "Friend_relation_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refresh_token" ADD CONSTRAINT "Refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissoesToUser" ADD CONSTRAINT "_PermissoesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

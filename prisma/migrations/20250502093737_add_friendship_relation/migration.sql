-- CreateTable
CREATE TABLE "Friend_relation" (
    "relation_id" SERIAL NOT NULL,
    "friend_id" INTEGER NOT NULL,

    CONSTRAINT "Friend_relation_pkey" PRIMARY KEY ("relation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Friend_relation_friend_id_key" ON "Friend_relation"("friend_id");

-- AddForeignKey
ALTER TABLE "Friend_relation" ADD CONSTRAINT "Friend_relation_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

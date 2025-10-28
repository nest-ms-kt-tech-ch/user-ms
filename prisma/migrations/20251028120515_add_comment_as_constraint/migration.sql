/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId,comment]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Comment_userId_movieId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Comment_userId_movieId_comment_key" ON "Comment"("userId", "movieId", "comment");

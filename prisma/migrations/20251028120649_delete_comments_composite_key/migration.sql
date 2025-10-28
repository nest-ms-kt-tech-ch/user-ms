-- DropIndex
DROP INDEX "public"."Comment_userId_movieId_comment_key";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentId" SERIAL NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId");

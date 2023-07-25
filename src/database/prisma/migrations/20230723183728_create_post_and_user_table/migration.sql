-- CreateTable
CREATE TABLE "Post" (
    "Id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "PostStatus" INTEGER NOT NULL,
    "CreatedById" TEXT NOT NULL,
    "UpdatedById" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_Id_key" ON "Post"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Id_key" ON "User"("Id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_CreatedById_fkey" FOREIGN KEY ("CreatedById") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_UpdatedById_fkey" FOREIGN KEY ("UpdatedById") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

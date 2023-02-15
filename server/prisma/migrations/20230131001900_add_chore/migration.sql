-- CreateTable
CREATE TABLE "Chore" (
    "chore_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" TIMESTAMP(3),

    CONSTRAINT "Chore_pkey" PRIMARY KEY ("chore_id")
);

-- CreateTable
CREATE TABLE "_house_chores" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_chores_todo" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_house_chores_AB_unique" ON "_house_chores"("A", "B");

-- CreateIndex
CREATE INDEX "_house_chores_B_index" ON "_house_chores"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_chores_todo_AB_unique" ON "_chores_todo"("A", "B");

-- CreateIndex
CREATE INDEX "_chores_todo_B_index" ON "_chores_todo"("B");

-- AddForeignKey
ALTER TABLE "_house_chores" ADD CONSTRAINT "_house_chores_A_fkey" FOREIGN KEY ("A") REFERENCES "Chore"("chore_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_house_chores" ADD CONSTRAINT "_house_chores_B_fkey" FOREIGN KEY ("B") REFERENCES "House"("house_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chores_todo" ADD CONSTRAINT "_chores_todo_A_fkey" FOREIGN KEY ("A") REFERENCES "Chore"("chore_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_chores_todo" ADD CONSTRAINT "_chores_todo_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

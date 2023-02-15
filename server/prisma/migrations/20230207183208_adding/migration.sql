-- CreateTable
CREATE TABLE "HouseUser" (
    "userId" TEXT NOT NULL,
    "houseId" INTEGER NOT NULL,

    CONSTRAINT "HouseUser_pkey" PRIMARY KEY ("userId","houseId")
);

-- AddForeignKey
ALTER TABLE "HouseUser" ADD CONSTRAINT "HouseUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseUser" ADD CONSTRAINT "HouseUser_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

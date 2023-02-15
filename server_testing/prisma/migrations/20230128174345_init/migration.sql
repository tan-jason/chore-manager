-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "chores" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "House" (
    "house_id" SERIAL NOT NULL,
    "participants" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chores" JSONB,
    "house_manager" TEXT NOT NULL,
    "house_name" TEXT NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("house_id")
);

-- CreateTable
CREATE TABLE "Chore" (
    "chore_id" SERIAL NOT NULL,
    "icon" JSONB NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" TIMESTAMP(3),

    CONSTRAINT "Chore_pkey" PRIMARY KEY ("chore_id")
);

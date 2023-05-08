import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createHouse: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { houseName, ownerId } = req.body;

    const houseCode = Math.random().toString(36).substring(6);
    const house = await prisma.house.create({
      data: {
        houseName: houseName,
        ownerId: ownerId,
        houseCode: houseCode,
      },
    });
    await prisma.houseUser.create({
      data: {
        userId: ownerId,
        houseId: house.id,
      },
    });
    res.status(200).json({
      message: "house created successfully",
      houseCode: house.houseCode,
    });
  } catch (error) {
    res.status(400).json({ message: "there was an issue with your request" });
  }
};

export const getAllHouses: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const houses = await prisma.house.findMany({});
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: "request unsuccessful" });
  }
};

export const getHouseById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const house = await prisma.house.findUnique({
      where: {
        id: Number(id),
      },
      include: { houseOwner: true, chores: true, users: true },
    });
    res.status(200).json(house);
  } catch (error) {
    res.status(404).json("house not found");
  }
};

export const getHouseByHouseCode: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { houseCode } = req.params;
    const house = await prisma.house.findUnique({
      where: {
        houseCode: String(houseCode),
      },
      include: { houseOwner: true, chores: true, users: true },
    });
    res.status(200).json(house);
  } catch (error) {
    res.status(404).json("house not found");
  }
};

export const deleteHouse: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await prisma.houseUser.deleteMany({
      where: {
        houseId: Number(id),
      },
    });
    await prisma.chore.deleteMany({
      where: {
        houseId: Number(id),
      },
    });
    await prisma.house.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "house deleted" });
  } catch (error) {
    res.status(404).json("request unsuccessful");
  }
};

export const updateHouse: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await prisma.house.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: { chores: true, houseOwner: true, users: true },
    });
    res.status(200).json({ message: "house updated successfully" });
  } catch (error) {
    res.status(400).json("an error occurred");
  }
};

import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs, { read } from "fs";
import path from "path";

require("dotenv").config();

const prisma = new PrismaClient();

const readJwtFile = () => {
  try {
    const text = fs.readFileSync(path.join(__dirname, "./jwt.txt"), "utf8");
    return text;
  } catch (error) {
    return { message: error };
  }
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username: String(username),
      },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { user_id: user.id, username },
        process.env.TOKEN_KEY!,
        {
          expiresIn: "2w",
        }
      );
      await prisma.user.update({
        where: {
          username: String(username),
        },
        data: {
          token: token,
        },
      });
      fs.writeFile(
        "./src/app/middleware/jwt.txt",
        String(token),
        "utf8",
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      res.status(200).json({ message: "successfully logged in" });
    } else {
      res
        .status(400)
        .json({ message: "your username or password is incorrect" });
    }
  } catch (error) {
    res.status(404).json({ message: "an error has occurred" });
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  const savedToken = readJwtFile();
  if (savedToken) token = savedToken;
  if (token) {
    const user = await prisma.user.findUnique({
      where: {
        token: String(token),
      },
    });

    if (user && user.token === token) {
      req.user = user.username;
      next();
    }
  } else {
    res.status(403).json({ message: "required token for authentication" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY!);
    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(422).json({ message: "an error has occurred" });
  }
};

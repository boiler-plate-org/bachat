import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { ErrorHandler } from "../utils/errorhandler";
import { db } from "../config/db";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { fetchPortfolio } from "../utils/web3";

const controller = {
  changeLimit: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const userId = req.user.id;
      const payload = req.body;

      const updateAcc = await db.account.update({
        where: { userId: userId },
        data: { limit: payload.limit },
      });

      return res.status(200).json({
        success: true,
        message: updateAcc,
      });
    }
  ),

  changeBalance: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const userId = req.user.id;
      const payload = req.body;

      const updateAcc = await db.account.update({
        where: { userId: userId },
        data: { balance: payload.balance },
      });

      return res.status(200).json({
        success: true,
        message: updateAcc,
      });
    }
  ),

  fetchWeb3Balance: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const address: string = req.params.address;
      const pubkey: PublicKey = new PublicKey(address);

      const balance: number = await fetchPortfolio(pubkey);

      return res.status(200).json({
        success: true,
        message: balance / LAMPORTS_PER_SOL,
      });
    }
  ),

  fetchAccount: CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.clearCookie("token");
        const message: string = "Unauthorized";
        return next(new ErrorHandler(message, 400));
      }

      const userId = req.user.id;

      const response = await db.account.findFirst({
        where: { userId: userId },
      });

      return res.status(200).json({
        success: true,
        message: response,
      });
    }
  ),
};

export default controller;

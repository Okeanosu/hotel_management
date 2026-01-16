import { cloudinary } from "../index.js";
import Account from "../models/account.model.js";
import createError from "../utils/createError.js";

export const getAccount = async (req, res, next) => {
  const accountId = req.accountId;
  const account = await Account.findById(accountId);
  res.status(200).send(account);
};

export const updateAccount = async (req, res, next) => {
  const accountId = req.accountId;
  let newAccount = {
    email: req.body.email,
    phone: req.body.phone,
    desc: req.body.desc,
  };
  if (req.body.avatar) {
    const avatarUrl = await (
      await cloudinary.uploader.upload(req.body.avatar)
    ).secure_url;
    newAccount = { ...newAccount, avatar: avatarUrl };
  }
  try {
    const updateAccount = await Account.findByIdAndUpdate(
      accountId,
      newAccount
    );
    res.status(200).send(updateAccount);
  } catch (err) {
    next(createError(500, "Cập nhật tài khoản thất bại!"));
  }
};

export const deleteAccount = async (req, res, next) => {
  const accountId = req.accountId;
  try {
    await Account.findByIdAndDelete(accountId);
    res.status(200).send("Deleted.");
  } catch (err) {
    next(createError(500, "Xóa tài khoản thất bại!"));
  }
};

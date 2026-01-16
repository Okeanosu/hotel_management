import Account from "../models/account.model.js";
import CreateError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newAccount = new Account({
      ...req.body,
      password: hash,
    });

    await newAccount.save();
    res.status(201).send("Tạo tài khoản thành công!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const account = await Account.findOne({
      username: req.body.username,
    });

    if (!account) return next(CreateError(404, "Không tìm thấy tài khoản!"));

    const isCorrect = bcrypt.compareSync(req.body.password, account.password);
    if (!isCorrect)
      return next(CreateError(400, "Sai tài khoản hoặc mật khẩu!"));

    const token = jwt.sign(
      {
        id: account._id,
        isAdmin: account.isAdmin,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = account._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("Đăng xuất thành công!");
};

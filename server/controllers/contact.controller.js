import Contact from "../models/contact.model.js";
import createError from "../utils/createError.js";

export const getAllContact = async (req, res, next) => {
  try {
    const allContact = await Contact.find({});
    res.status(200).send(allContact);
  } catch (err) {
    next(createError(500, "Tìm kiếm tất cả contact không thành công!"));
  }
};

export const createContact = async (req, res, next) => {
  const newContact = req.body;
  try {
    await Contact.create(newContact);
    res.status(201).json({
      success: true,
      message: "Tạo contact thành công!",
      newContact,
    });
  } catch (err) {
    next(createError(500, "Tạo contact thất bại!"));
  }
};

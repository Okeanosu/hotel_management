import Showcase from "../models/showcase.model.js";
import Image from "../models/image.model.js";
import createError from "../utils/createError.js";

export const getShowcase = async (req, res, next) => {
  const ShowcaseId = req.params.id;
  try {
    const showcase = await Showcase.findById(ShowcaseId).populate("image");
    res.status(200).send(showcase);
  } catch (err) {
    next(createError(500, "Tìm kiếm món ăn không thành công!"));
  }
};

export const getAllShowcase = async (req, res, next) => {
  try {
    const allShowcase = await Showcase.find({}).populate("image");
    res.status(200).send(allShowcase);
  } catch (err) {
    next(createError(500, "Tìm kiếm tất cả món ăn không thành công!"));
  }
};

export const createShowcase = async (req, res, next) => {
  const newShowcase = req.body;
  try {
    await Showcase.create(newShowcase);
    res.status(201).json({
      success: true,
      message: "Tạo Showcase thành công!",
      newShowcase,
    });
  } catch (err) {
    next(createError(500, "Tạo món ăn thất bại!"));
  }
};

export const deleteShowcase = async (req, res, next) => {
  const showcaseId = req.params.id;
  try {
    const Showcase = await Showcase.findById(ShowcaseId);
    if (!Showcase) {
      return res.status(404).send("Không tìm thấy món ăn!");
    }
    await Image.findByIdAndDelete(Showcase.image);
    await Showcase.deleteOne(Showcase);
    res.status(200).json({
      success: true,
      message: "Xóa món ăn thành công!",
    });
  } catch (err) {
    next(createError(500, "Xóa món ăn thất bại!"));
  }
};

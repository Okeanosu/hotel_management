import Food from "../models/food.model.js";
import Image from "../models/image.model.js";
import createError from "../utils/createError.js";

export const getFood = async (req, res, next) => {
  const foodId = req.params.id;
  try {
    const Food = await Food.findById(foodId).populate("image");
    res.status(200).send(Food);
  } catch (err) {
    next(createError(500, "Tìm kiếm món ăn không thành công!"));
  }
};

export const getAllFood = async (req, res, next) => {
  try {
    const allFood = await Food.find({}).populate("image");
    res.status(200).send(allFood);
  } catch (err) {
    next(createError(500, "Tìm kiếm tất cả món ăn không thành công!"));
  }
};

export const createFood = async (req, res, next) => {
  const newFood = req.body;
  try {
    await Food.create(newFood);
    res.status(201).json({
      success: true,
      message: "Tạo food thành công!",
      newFood,
    });
  } catch (err) {
    next(createError(500, "Tạo món ăn thất bại!"));
  }
};

export const deleteFood = async (req, res, next) => {
  const foodId = req.params.id;
  try {
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).send("Không tìm thấy món ăn!");
    }
    await Image.findByIdAndDelete(food.image);
    await Food.deleteOne(food);
    res.status(200).json({
      success: true,
      message: "Xóa món ăn thành công!",
    });
  } catch (err) {
    next(createError(500, "Xóa món ăn thất bại!"));
  }
};

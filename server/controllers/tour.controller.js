import Tour from "../models/tour.model.js";
import createError from "../utils/createError.js";

export const getTour = async (req, res, next) => {
  const tourId = req.params.id;
  try {
    const tour = await Tour.findById(tourId).populate("images");
    res.status(200).send(tour);
  } catch (err) {
    next(createError(500, "Tìm kiếm phòng không thành công!"));
  }
};

export const getAllTour = async (req, res, next) => {
  try {
    // const allTour = await Tour.find({}).populate("image");
    const allTour = await Tour.find({}).populate("images");

    res.status(200).send(allTour);
  } catch (err) {
    next(createError(500, "Tìm kiếm tất cả phòng không thành công!"));
  }
};

export const createTour = async (req, res, next) => {
  const data = req.body;
  try {
    const newTour = await Tour.create(data);

    res.status(201).json({
      success: true,
      message: "Tạo chuyến du lịch thành công!",
      newTour,
    });
    console.log(newTour);
  } catch (err) {
    next(createError(500, "Tạo chuyến du lịch thất bại!"));
  }
};

export const updateTour = async (req, res, next) => {
  const TourId = req.params.id;
  try {
    // todo
    const TourUpdate = await Tour.findByIdAndUpdate(TourId, req.body);

    res.status(200).json({
      success: true,
      message: "Cập nhật phòng thành công!",
    });
  } catch (err) {
    next(createError(500, "Cập nhật phòng thất bại!"));
  }
};

export const deleteTour = async (req, res, next) => {
  const TourId = req.params.id;
  try {
    await Tour.findByIdAndDelete(TourId);

    res.status(201).json({
      success: true,
      message: "Xóa phòng thành công!",
    });
  } catch (err) {
    next(createError(500, "Xóa phòng thất bại!"));
  }
};

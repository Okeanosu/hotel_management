import Room from "../models/room.model.js";
import createError from "../utils/createError.js";

export const getRoom = async (req, res, next) => {
  const roomId = req.params.id;

  try {
    const room = await Room.findById(roomId).populate("images");
    res.status(200).send(room);
  } catch (err) {
    next(createError(500, "Tìm kiếm phòng không thành công!"));
  }
};

export const getAllRoom = async (req, res, next) => {
  try {
    // const allRoom = await Room.find({}).populate("image");
    const allRoom = await Room.find({}).populate("images");

    res.status(200).send(allRoom);
  } catch (err) {
    next(createError(500, "Tìm kiếm tất cả phòng không thành công!"));
  }
};

export const createRoom = async (req, res, next) => {
  const data = req.body;
  try {
    const newRoom = await Room.create(data);

    res.status(201).json({
      success: true,
      message: "Tạo phòng thành công!",
      newRoom,
    });
    console.log(newRoom);
  } catch (err) {
    next(createError(500, "Tạo phòng thất bại!"));
  }
};

export const updateRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    // todo
    const roomUpdate = await Room.findByIdAndUpdate(roomId, req.body);

    res.status(200).json({
      success: true,
      message: "Cập nhật phòng thành công!",
    });
  } catch (err) {
    next(createError(500, "Cập nhật phòng thất bại!"));
  }
};

export const deleteRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    await Room.findByIdAndDelete(roomId);

    res.status(201).json({
      success: true,
      message: "Xóa phòng thành công!",
    });
  } catch (err) {
    next(createError(500, "Xóa phòng thất bại!"));
  }
};

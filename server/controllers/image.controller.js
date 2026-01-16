import { cloudinary } from "../index.js";
import Image from "../models/image.model.js";
import createError from "../utils/createError.js";

export const getImage = async (req, res, next) => {
  const folder = req.query.folder || "";
  try {
    let image;
    if (folder) {
      image = await Image.findOne({ folder: folder, isShow: true });
    } else {
      image = await Image.find({ isShow: true });
    }
    res.status(200).send(image);
  } catch (err) {
    next(createError(500, "Lấy ảnh thất bại!"));
  }
};

export const createImage = async (req, res, next) => {
  const { file, name, folder } = req.body;
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      // width: 300,
      // height: 300,
      // crop: "scale"
    });
    const newImg = await Image.create({
      name,
      folder,
      publicId: result.public_id,
      url: result.secure_url,
    });
    res.status(201).json({
      success: true,
      message: "Tạo ảnh mới thành công!",
      image: newImg,
    });
  } catch (error) {
    next(createError(500, "Tạo ảnh mới thất bại!"));
  }
};

export const updateImage = async (req, res, next) => {
  const id = req.params.id;
  const { image, name, folder } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder,
      // width: 300,
      // height: 300,
      // crop: "scale"
    });
    const updateImg = await Image.findByIdAndUpdate(id, {
      name,
      folder,
      publicId: result.public_id,
      url: result.secure_url,
    });
    res.status(201).json({
      success: true,
      message: "Cập nhật ảnh thành công!",
      image: updateImg,
    });
  } catch (error) {
    next(createError(500, "Cập nhật ảnh thất bại!"));
  }
};

export const deleteImage = async (req, res, next) => {
  const { idImage } = req.params;
  try {
    await Image.findByIdAndDelete(idImage);
    res.status(201).json({
      success: true,
      message: "Xóa hình ảnh thành công!",
    });
  } catch (error) {
    next(createError(500, "Xóa hình ảnh thất bại!"));
  }
};

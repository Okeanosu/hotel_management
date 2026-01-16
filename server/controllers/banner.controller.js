import Banner from "../models/banner.model.js";
import Image from "../models/image.model.js";
import createError from "../utils/createError.js";

export const getBanner = async (req, res, next) => {
  const slug = req.query.slug;
  try {
    const allBanner = await Banner.findOne({ slug: slug }).populate("image");
    res.status(200).send(allBanner);
  } catch (err) {
    next(createError(500, "Tìm kiếm banner không thành công!"));
  }
};

export const createBanner = async (req, res, next) => {
  const slug = req.query.slug;
  const image = req.body;
  try {
    const newBanner = await Banner.findOneAndUpdate(
      {
        slug: slug,
      },
      {
        $addToSet: { image: [image] },
      }
    );

    res.status(201).json({
      success: true,
      message: "Tạo banner thành công!",
      newBanner,
    });
  } catch (err) {
    next(createError(500, "Tạo banner thất bại!"));
  }
};

export const updateBanner = async (req, res, next) => {
  const { imageOldId, imageNewId } = req.body;
  try {
    const updateOldImg = await Image.findByIdAndUpdate(imageOldId, {
      isShow: false,
    });

    const updateNewImg = await Image.findByIdAndUpdate(imageNewId, {
      isShow: true,
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật banner thành công!",
    });
  } catch (err) {
    next(createError(500, "Cập nhật banner thất bại!"));
  }
};

export const deleteBanner = async (req, res, next) => {
  const slug = req.query.slug;
  const imageId = req.query.imageId;
  try {
    const banner = await Banner.findOne({ slug: slug });
    if (!banner) {
      return res.status(404).send("Không tìm thấy banner!");
    }
    banner.image.pull(imageId);
    await banner.save();
    await Image.findByIdAndDelete(imageId);
    res.status(200).json({
      success: true,
      message: "Xóa banner thành công!",
    });
  } catch (err) {
    next(createError(500, "Xóa banner thất bại!"));
  }
};

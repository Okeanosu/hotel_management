import Post from "../models/post.model.js";
import createError from "../utils/createError.js";

export const getPost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    res.status(200).send(post);
  } catch (err) {
    next(createError(500, "Tìm kiếm bài viết không thành công!"));
  }
};

export const getAllPost = async (req, res, next) => {
  try {
    const allPost = await Post.find({}).populate("images");
    res.status(200).send(allPost);
  } catch (err) {
    next(createError(500, "Tìm kiếm tất cả bài viết không thành công!"));
  }
};

export const createPost = async (req, res, next) => {
  const data = req.body;
  try {
    const newPost = await Post.create(data);
    res.status(201).json({
      success: true,
      message: "Tạo bài viết thành công!",
      newPost,
    });
  } catch (err) {
    next(createError(500, "Tạo bài viết thất bại!"));
  }
};

export const updatePost = async (req, res, next) => {
  const postId = req.params.id;
  const data = req.body;
  try {
    const postUpdate = await Post.findByIdAndUpdate(postId, data);
    res.status(200).json({
      success: true,
      message: "Cập nhật bài viết thành công!",
      data: postUpdate,
    });
  } catch (err) {
    next(createError(500, "Cập nhật bài viết thất bại!"));
  }
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    await Post.findByIdAndDelete(postId);

    res.status(201).json({
      success: true,
      message: "Xóa bài viết thành công!",
    });
  } catch (err) {
    next(createError(500, "Xóa bài viết thất bại!"));
  }
};

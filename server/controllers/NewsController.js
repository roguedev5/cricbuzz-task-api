const News = require("../models/news");

const postNews = async (req, res, next) => {
  try {
    let news = new News({ ...req.body });
    await news.save();
    return res.json({ message: "news inserted sucessfully" });
  } catch (err) {
    next(err);
  }
};

const getNews = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const count = await News.find({}).count();
    let news = await News.find()
      .skip(limit * (page - 1))
      .limit(limit);
    return res.json({ count, news });
  } catch (err) {
    next(err);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.query;
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      throw new Error("News Id doesn't exists!");
    }
    return res.status(200).json({ message: "Deleted sucessfully" });
  } catch (err) {
    next(err);
  }
};

const latestNews = async (req, res, next) => {
  try {
    const latest = await News.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json(latest);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postNews,
  getNews,
  deleteNews,
  latestNews,
};

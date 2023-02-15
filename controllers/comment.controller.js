const BlogPost = require("../model/BlogPost");
const Comment = require("../model/Comment");
const { CheckValues } = require("../utils/CheckValues");
const { GetUser, GetToken } = require("../utils/token");

exports.create = async (req, res, next) => {
  try {
    CheckValues(['message', 'blog_id'], req.body);
    if (req.body.blog_id.length !== 24) return res.status(400).json({ message: 'Invalid blog post id.' });
    let blog_data = await BlogPost.findOne({ _id: req.body.blog_id });
    if (blog_data === null) {
      return res.status(400).json({ message: 'Invalid blog post id.' });
    }
    await Comment.create({
      author: GetUser(GetToken(req))._id,
      message: req.body.message.replace(/(\b)(on\S+)(\s*)=|javascript|<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/ig, '').trim(),
      blog_id: req.body.blog_id
    });
    return res.status(200).json({ message: 'Comment successfully created.' });
  } catch (err) {
    next(err);
  }
}

exports.delete = async (req, res, next) => {
  try {
    CheckValues(['comment_id'], req.body);
    if (req.body.comment_id.length !== 24) return res.status(400).json({ message: 'Invalid comment id.' });
    let comment_data = await Comment.findOne({ _id: req.body.comment_id });
    if (comment_data === null) return res.status(404).json({ message: 'No comment found with this id.' });
    let UserData = GetUser(GetToken(req));
    if (comment_data.author.toString() !== UserData._id.toString()) {
      return res.status(401).json({ message: 'You are not authorized for this event.' });
    }
    await comment_data.delete({ _id: req.body.comment_id });
    return res.status(200).json({ message: 'Comment deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
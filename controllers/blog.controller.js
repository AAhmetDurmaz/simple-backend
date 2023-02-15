const { GetUser, GetToken } = require('../utils/token');
const { CheckValues, CheckFiles } = require('../utils/CheckValues');
const { BASE_URL, ALLOWED_CATEGORIES } = require('../Constants');
const { DeleteKeys } = require('../utils/utils');

// Import model.
const BlogPost = require('../model/BlogPost');
const User = require('../model/User');
const Comment = require('../model/Comment');

const CreateURL = (title) => {
  return title.trim().replace(' ', '-').replace(/ /g, '').toLowerCase() + '-' + Math.floor(Math.random() * 90000 + 10000).toString();
}

exports.list = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    if (page < 0) page = 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    const posts = await BlogPost.find().skip(skip).limit(perPage);
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No blog post found with this page.' });
    }
    const response = new Object();
    response.posts = posts;
    response.page = page;
    let temp_url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    response.next = temp_url.origin + temp_url.pathname + '?page=' + (page + 1).toString();

    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

exports.get = async (req, res, next) => {
  try {
    let url = req.params.url;
    let blog_data = await BlogPost.findOne({ url: url });
    if (blog_data === null) return res.status(404).json({ message: 'Not found.' });
    let author_data = await User.findOne({ _id: blog_data.author });
    if (author_data === null) return res.status(404).json({ message: 'Not found.' });

    blog_data = blog_data.toObject();
    author_data = author_data.toObject();
    delete blog_data.author;
    delete blog_data._id;
    author_data = DeleteKeys(author_data, ['_id', 'password', 'email', 'created_at', 'updated_at']); // Delete given keys from given object.
    blog_data.author = author_data;

    if (blog_data.comments.length > 0) {
      let comment_data = await Comment.find({ _id: { $in: blog_data.comments } });
      if (comment_data !== null) {
        for (let i = 0; i < comment_data.length; i++) {
          let user_data = await User.findOne({ _id: comment_data[i].author })
          comment_data[i].author = {
            author_name: user_data.name,
            author_username: user_data.username
          };
        }
        blog_data.comments = comment_data;
      }
      // TODO(Ahmet): There should be a pagination here.
    }
    let categories_of_post = blog_data.categories;
    let suggested_posts = BlogPost.find({ categories: { $in: categories_of_post } }).sort({ created_at: -1 }).limit(5);
    blog_data.suggested_posts = suggested_posts;
    return res.status(200).json(blog_data);
  } catch (err) {
    next(err);
  }
}

exports.search = async (req, res, next) => {
  try {
    CheckValues(
      ['query'],
      req.query
    );
    let search_query = await BlogPost.find({ title: { $regex: req.query.query, $options: 'i' } }).sort({ created_at: -1 }).limit(10);
    let deleted_query = DeleteKeys(search_query, ['_id', 'text_html', 'comments', 'author', 'categories']);
    return res.status(200).json(deleted_query);
  } catch (err) {
    console.log(err)
    next(err);
  }
}

exports.create = async (req, res, next) => {
  try {
    CheckValues(
      ['title', 'text_html', 'categories'],
      req.body
    );
    CheckFiles(req.file);
    const { title, text_html } = req.body;
    let banner_url = BASE_URL + req.file.path.replace(/\\/g, '/');
    const url = CreateURL(title);
    let author = GetUser(GetToken(req))._id;
    let categories = JSON.parse(req.body.categories);
    for (let i = 0; i < categories.length; i++) {
      if (typeof (categories[i]) !== 'number' || !ALLOWED_CATEGORIES.includes(categories[i])) {
        return res.status(400).json({ message: 'Invalid category id.' });
      }
    }

    await BlogPost.create({
      banner_url: banner_url,
      url: url,
      title: title,
      text_html: text_html,
      author: author,
      categories: categories
    }).then(() => {
      return res.status(200).json({ message: 'Blog post successfully created.' })
    });

  } catch (err) {
    next(err);
  }
}

exports.delete = async (req, res, next) => {
  try {
    CheckValues(['id'], req.body);
    let post_data = await BlogPost.findOne({ _id: req.body.id });
    if (post_data === null) {
      return res.status(404).json({ message: 'No post found with this id.' });
    }
    const UserData = GetUser(GetToken(req)); // WARN(Ahmet): i think this is a bad usage.
    if (post_data.author.toString() !== UserData._id.toString()) {
      return res.status(401).json({ message: 'You are not authorized for this event.' });
    }
    await BlogPost.deleteOne({ _id: post_data._id });
    return res.status(200).json({ message: 'Blog post successfully deleted.' })
  } catch (err) {
    next(err);
  }
}
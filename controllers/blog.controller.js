const { GetUser, GetToken } = require('../utils/token');
const { CheckValues, CheckFiles } = require('../utils/CheckValues');
const { BASE_URL } = require('../Constants');

// Import model.
const BlogPost = require('../model/BlogPost');
const User = require('../model/User');
const { DeleteKeys } = require('../utils/utils');

const CreateURL = (title) => {
  return title.replace(' ', '-').replace(/ /g, '').toLowerCase() + '-' + Math.floor(Math.random() * 90000 + 10000).toString();
}

exports.get = async (req, res, next) => {
  try {
    let url = req.params.url;
    let blog_data = await BlogPost.findOne({ url: url });
    if (blog_data === null) return res.status(404).json({ message: 'Not found.' })
    let author_data = await User.findOne({ _id: blog_data.author });
    if (author_data === null) return res.status(404).json({ message: 'Not found.' })
    blog_data = blog_data.toObject();
    author_data = author_data.toObject();
    delete blog_data.author;
    author_data = DeleteKeys(author_data, ['_id', 'password', 'created_at', 'updated_at']); // Delete given keys from given object.
    blog_data.author = author_data;
    // TODO(Ahmet): Comments bilgileri de dahil edilmeli.
    return res.status(200).json(blog_data);
  } catch (err) {
    next(err);
  }
}

exports.create = async (req, res, next) => {
  try {
    CheckValues(
      ['title', 'text_html'],
      req.body
    );
    CheckFiles(req.file);
    const { title, text_html } = req.body;
    let banner_url = BASE_URL + req.file.path.replace(/\\/g, '/');
    const url = CreateURL(title);
    let author = GetUser(GetToken(req))._id;
    await BlogPost.create({
      banner_url: banner_url,
      url: url,
      title: title,
      text_html: text_html,
      author: author
    }).then(() => {
      return res.status(200).json({ message: 'Blog post successfully created.' })
    });

  } catch (err) {
    next(err);
  }
}
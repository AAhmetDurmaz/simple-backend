const { GetUser } = require('../utils/token');
const CheckValues = require('../utils/CheckValues');

// Import model.
const BlogPost = require('../model/BlogPost');

exports.create = (req, res, next) => {
  try {
    CheckValues(
      ['banner_url', 'title', 'text_html', 'comments', 'author'],
      req.body
    );
    const { banner_url, title, text_html, comments, author } = req.body;
    // TODO(Ahmet): Url otomatik oluşturulmalı, gerekli bilgiler düzenlenip
    // db eklenmeli.
  } catch (err) {
    next(err);
  }
}
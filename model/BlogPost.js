const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    banner_url: { type: String, required: true, trim: true },
    url: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    text_html: { type: String, required: true },
    comments: { type: [mongoose.ObjectId], default: [] },
    author: { type: mongoose.ObjectId, required: true }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model("BlogPost", BlogPostSchema);
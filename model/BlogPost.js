const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    banner_url: { type: String, required: true, trim: true },
    url: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    text_html: { type: String, required: true },
    comments: { type: [mongoose.Types.ObjectId], default: [] },
    author: { type: mongoose.Types.ObjectId, required: true },
    categories: { type: [Number], default: [] }
    /*
    1: Category A,
    2: Category B,
    3: Category C
    This is an example.
    */
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
  }
);

module.exports = mongoose.model("BlogPost", BlogPostSchema);
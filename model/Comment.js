const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true },
    message: { type: String, required: true },
    blog_id: { type: mongoose.Types.ObjectId, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
  }
);

module.exports = mongoose.model("comment", CommentSchema);
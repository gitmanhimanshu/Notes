const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    tags: { type: [String], default: [] },
    pinned: { type: Boolean, default: false },
    color: { type: String, default: '#ffffff' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);



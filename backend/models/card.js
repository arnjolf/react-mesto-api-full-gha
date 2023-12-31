const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный адрес URL',
    },
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{ type: ObjectId }],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

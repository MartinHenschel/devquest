const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  senha: {
    type: String,
    required: true
  },

  xp: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
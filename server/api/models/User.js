import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // Vardas kaip kreipsimes ir kontaktuos admin
  name: { type: String, required: true },
  // Susisiekimo opcija
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: { type: String, required: true },
  // Amzius kad pilnametis
  dateOfBirth: { type: Date, required: true },
  // Susisiekimo opcija
  phoneNumber: { type: String, required: true },
  // Adresas / Galima default priskirti rezervacijos metu
  address: { type: String, required: true },
  // Role
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  // Turimi irankiai
  rentedTools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tools' }],
  // Istorija

  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  //Turimos rezervacijos
  rentalHistory: [
    {
      tool: { type: mongoose.Schema.Types.ObjectId, ref: 'Tools' },
      rentedAt: Date,
      returnedAt: Date
    }
  ]
});

// Ar pilnametis
userSchema.virtual('age').get(function () {
  return Math.floor((Date.now() - this.dateOfBirth) / (365.25 * 24 * 60 * 60 * 1000));
});

export default mongoose.model('User', userSchema);

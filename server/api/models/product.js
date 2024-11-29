import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const toolsSchema = new Schema({
  toolType: { type: String, required: true },
  description: {
    nameRetail: { type: String, required: true },
    basePrice: { type: String, required: true },
    imageURIs: [String],
    details: {}
  },
  isAvailable: { type: Boolean, required: true },
  isVisible: { type: Boolean, default: true },
  isDraft: { type: Boolean, required: true },
  reservation: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reservationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
    dateRange: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true }

    }
  }],
  reviews: [{ type: String, default: '' }]
});


export default mongoose.model('Tools', productSchema);











// import mongoose from 'mongoose';

// const productSchema = mongoose.Schema({

//   _id: mongoose.Schema.Types.ObjectId,
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
//   id: String,
//   toolType: String,
//   description: {
//     nameRetail: String,
//     basePrice: Number,
//     imageURIs: [String],
//     details: Object
//   },
//   isAvailable: String,
//   isVisible: String,
//   isDraft: String,
//   reservations: [Object],
//   reviews: [Object]
// });

// export default mongoose.model('Tools', productSchema);





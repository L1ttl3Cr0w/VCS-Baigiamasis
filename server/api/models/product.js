import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  id: String,
  toolType: String,
  description: {
    nameRetail: String,
    basePrice: Number,
    imageURIs: [String],
    details: Object
  },
  isAvailable: String,
  isVisible: String,
  isDraft: String,
  reservations: [Object],
  reviews: [Object]
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





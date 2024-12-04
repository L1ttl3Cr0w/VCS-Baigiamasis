import mongoose from 'mongoose';
import Stores from '../models/Stores.js';

export const procureStores = async (req, res, next) => {
  Stores.find()
    .exec()
    .then((docs) => {
      console.log(docs)
      const response = {
        count: docs.length,
        stores: docs.map((doc) => {
          return {
            _id: doc._id,
            location_city: doc.location_city,
            stores_data: doc.stores,
            geo_location: doc.geo_location
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
};
export const procureStore = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(400).json({ error: 'No such store exists' });
  }
  Stores.findById(id)
    .select('_id location_city stores')
    .exec()
    .then((doc) => {
      console.log('From databse', doc);
      if (doc) {
        res.status(200).json({
          store: doc,
          request: {
            type: 'GET',
            description: 'Get one store',
            url: 'http://localhost:3000/stores',
          },
        });
      } else {
        res.status(404).json({
          message: 'No valid store was found with ID.',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
export const produceStore = async (req, res, next) => {
  const store = new Stores(req.body);
  store
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created store succesfully',
        createdStore: {
          _id: result._id,
          request: {
            type: 'POST',
            url: 'http://localhost:3000/stores/' + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
export const reformStore = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(400).json({ error: 'No such store was found' });
  }
  const updateOps = req.body;
  Stores.findByIdAndUpdate({ _id: id }, updateOps, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Store information updated',
        request: {
          type: 'PATCH',
          url: 'https://localhost:3000/stores/' + id,
          description: 'Update store',
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    });
};
export const eradicateStore = async (req, res, next) => {
  const { id } = req.params;
  Stores.deleteOne({ _id: id })
    .exec()
    .then((results) => {
      res.status(200).json({
        message: 'Store deleted',
        id,
        request: {
          type: 'DELETE',
          url: 'http://localhost:3000/stores',
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

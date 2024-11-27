import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

import Product from '../models/product.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/admin.js';

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.description.nameRetail,
            price: doc.description.basePrice,
            description: doc.description.details,
            images: doc.description.imageURIs
          };
        })
      };
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
});

router.post('/', auth, adminAuth, (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created product succesfully',
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          description: result.description,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products' + result._id
          }
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id description')
    .exec()
    .then((doc) => {
      console.log('From database', doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            description: 'Get all products',
            url: 'http://localhost:3000/products'
          }
        });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID.' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch('/:productId', auth, adminAuth, (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products' + id,
          description: 'Get all products'
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message
      });
    });
});

router.delete('/:productId', auth, adminAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product deleted',
        id,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products',
          body: { name: 'String', price: 'Number' }
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

export default router;

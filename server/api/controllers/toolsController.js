import mongoose from 'mongoose';
import Tools from '../models/product.js';

export const procureTools = async (req, res, next) => {
  Tools.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        tools: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.description.nameRetail,
            price: doc.description.basePrice,
            description: doc.description,
            images: doc.description.imageURIs,
            toolType: doc.toolType,
          };
        })
      };
      res.status(200).json(response);
    })
    .catch((err) => console.log(err));
};
export const procureTool = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(400).json({ error: 'No such tool was found' });
  }

  Tools.findById(id)
    .select('_id description toolType') // Added toolType to selection
    .exec()
    .then((doc) => {
      console.log('From database', doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            description: 'Get one tool',
            url: 'http://localhost:3000/tools'
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
};
export const produceTool = async (req, res, next) => {
  const tool = new Tools(req.body.itemEdit);
  tool
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created product succesfully',
        createdProduct: {
          _id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/tools/' + result._id
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
};
export const reformTool = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(400).json({ error: 'No such tool was found' });
  }
  const updateOps = req.body.itemEdit;
  Tools.findByIdAndUpdate({ _id: id }, updateOps, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'PATCH',
          url: 'http://localhost:3000/tools/' + id,
          description: 'Update tool'
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err.message
      });
    });
};
export const eradicateTool = async (req, res, next) => {
  const { id } = req.params;
  Tools.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product deleted',
        id,
        request: {
          type: 'DELETE',
          url: 'http://localhost:3000/tools',
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
};

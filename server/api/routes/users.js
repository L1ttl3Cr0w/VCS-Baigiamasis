import express from 'express';
import * as userController from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;

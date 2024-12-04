import express from 'express';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/admin.js';
import * as controller from '../controllers/storesController.js';
const router = express.Router();

router.get('/', controller.procureStores);

router.get('/:id', controller.procureStore);

router.post('/', auth, adminAuth, controller.produceStore);

router.patch('/:id', auth, adminAuth, controller.reformStore);

router.delete('/:id', auth, adminAuth, controller.eradicateStore);

export default router;

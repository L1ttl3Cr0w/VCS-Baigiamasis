import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/admin.js';
import * as controller from '../controllers/toolsController.js';

router.get('/', controller.procureTools);

router.get('/:id', controller.procureTool);

router.post('/', controller.produceTool);

router.patch('/:id', controller.reformTool);

router.delete('/:id', controller.eradicateTool);

export default router;
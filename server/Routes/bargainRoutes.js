import express from 'express';
import { 
    createBargain, 
    getBargainsByUser, 
    updateBargainStatus 
} from '../Controller/bargainController.js';
import { authenticate } from '../Middleware/auth.js';
import { validateBargain } from '../Middleware/validation.js';

const router = express.Router();

router.post('/', authenticate, validateBargain, createBargain);
router.get('/', authenticate, getBargainsByUser);
router.patch('/:id/status', authenticate, updateBargainStatus);

export default router;
import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';

const router = Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.list);
router.get('/:id', CategoryController.getById);
router.patch('/:id', CategoryController.update);
router.delete('/:id', CategoryController.softDelete);

export default router;

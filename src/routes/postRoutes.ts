import { Router } from 'express';
import { PostController } from '../controllers/postController';

const router = Router();

router.post('/', PostController.create);
router.get('/', PostController.list);
router.get('/:id', PostController.getById);
router.patch('/:id', PostController.update);
router.delete('/:id', PostController.softDelete);

export default router;
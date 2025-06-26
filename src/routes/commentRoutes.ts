import { Router } from 'express';
import { CommentController } from '../controllers/commentController';

const router = Router();

router.post('/', CommentController.create);
router.get('/', CommentController.list);
router.get('/:id', CommentController.getById);
router.patch('/:id', CommentController.update);
router.delete('/:id', CommentController.delete);

export default router;
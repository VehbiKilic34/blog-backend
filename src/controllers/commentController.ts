import { Request, Response } from 'express';
import { CommentModel } from '../models/commentModel';

export const CommentController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { post_id, content, commenter_name } = req.body;
      if (!post_id || !content || !commenter_name) {
        res.status(400).json({ error: 'post_id, content ve commenter_name zorunludur.' });
        return;
      }

      const [created] = await CommentModel.create({ post_id, content, commenter_name });
      res.status(201).json(created);
    } catch (error) {
      console.error('Yorum oluşturulamadı:', error);
      res.status(500).json({ error: 'Yorum eklenemedi.' });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        post: req.query.post ? Number(req.query.post) : undefined,
        commenter: req.query.commenter?.toString()
      };

      const comments = await CommentModel.findAll(filters);
      res.json(comments);
    } catch (error) {
      console.error('Yorumlar alınamadı:', error);
      res.status(500).json({ error: 'Yorumlar getirilemedi.' });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const comment = await CommentModel.findById(id);
      if (!comment) {
        res.status(404).json({ error: 'Yorum bulunamadı.' });
        return;
      }
      res.json(comment);
    } catch (error) {
      console.error('Yorum alınamadı:', error);
      res.status(500).json({ error: 'Yorum getirilemedi.' });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await CommentModel.update(id, req.body);
      if (!updated || updated.length === 0) {
        res.status(404).json({ error: 'Yorum bulunamadı veya güncellenemedi.' });
        return;
      }
      res.json(updated[0]);
    } catch (error) {
      console.error('Yorum güncellenemedi:', error);
      res.status(500).json({ error: 'Yorum güncellenemedi.' });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await CommentModel.delete(id);
      if (!deleted) {
        res.status(404).json({ error: 'Yorum zaten silinmiş ya da bulunamadı.' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Yorum silinemedi:', error);
      res.status(500).json({ error: 'Silme işlemi sırasında hata oluştu.' });
    }
  }
};
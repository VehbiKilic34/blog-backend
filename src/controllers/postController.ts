import { Request, Response } from 'express';
import { PostModel } from '../models/postModel';

export const PostController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { category_id, title, content, published_at } = req.body;
      if (!category_id || !title || !content) {
        res.status(400).json({ error: 'category_id, title ve content alanları zorunludur.' });
        return;
      }

      const [created] = await PostModel.create({ category_id, title, content, published_at });
      res.status(201).json(created);
    } catch (error) {
      console.error('Gönderi oluşturulamadı:', error);
      res.status(500).json({ error: 'Gönderi oluşturulamadı.' });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        category: req.query.category ? Number(req.query.category) : undefined,
        status: (req.query.status as 'published' | 'draft' | 'all') || 'all',
        showDeleted: (req.query.showDeleted as 'true' | 'false' | 'onlyDeleted') || 'false'
      };

      const posts = await PostModel.findAll(filters);
      res.json(posts);
    } catch (error) {
      console.error('Gönderiler getirilemedi:', error);
      res.status(500).json({ error: 'Gönderiler alınamadı.' });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const post = await PostModel.findById(id);
      if (!post) {
        res.status(404).json({ error: 'Gönderi bulunamadı.' });
        return;
      }
      res.json(post);
    } catch (error) {
      console.error('Gönderi görüntülenemedi:', error);
      res.status(500).json({ error: 'Gönderi getirilemedi.' });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await PostModel.update(id, req.body);
      if (!updated || updated.length === 0) {
        res.status(404).json({ error: 'Gönderi bulunamadı veya güncellenemedi.' });
        return;
      }
      res.json(updated[0]);
    } catch (error) {
      console.error('Gönderi güncellenemedi:', error);
      res.status(500).json({ error: 'Güncelleme işlemi başarısız.' });
    }
  },

  async softDelete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await PostModel.softDelete(id);
      if (!result || result === 0) {
        res.status(404).json({ error: 'Gönderi zaten silinmiş ya da bulunamadı.' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Gönderi silinemedi:', error);
      res.status(500).json({ error: 'Silme işlemi sırasında hata oluştu.' });
    }
  }
};
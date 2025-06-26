import { Request, Response } from 'express';
import { CategoryModel } from '../models/categoryModel';

export const CategoryController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Kategori adı gereklidir.' });
        return;
      }

      const [created] = await CategoryModel.create({ name });
      res.status(201).json(created);
    } catch (error) {
      console.error('Kategori oluşturma hatası:', error);
      res.status(500).json({ error: 'Kategori oluşturulamadı.' });
    }
  },

  async list(req: Request, res: Response): Promise<void> {
    try {
      const showDeleted = req.query.showDeleted === 'true';
      const categories = await CategoryModel.findAll(showDeleted);
      res.json(categories);
    } catch (error) {
      console.error('Kategori listeleme hatası:', error);
      res.status(500).json({ error: 'Kategoriler getirilemedi.' });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const category = await CategoryModel.findById(id);
      if (!category) {
        res.status(404).json({ error: 'Kategori bulunamadı.' });
        return;
      }
      res.json(category);
    } catch (error) {
      console.error('Kategori getirme hatası:', error);
      res.status(500).json({ error: 'Kategori gösterilemedi.' });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const updated = await CategoryModel.update(id, req.body);
      if (!updated || updated.length === 0) {
        res.status(404).json({ error: 'Kategori bulunamadı veya güncellenemedi.' });
        return;
      }
      res.json(updated[0]);
    } catch (error) {
      console.error('Kategori güncelleme hatası:', error);
      res.status(500).json({ error: 'Güncelleme sırasında hata oluştu.' });
    }
  },

  async softDelete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await CategoryModel.softDelete(id);
      if (!result || result === 0) {
        res.status(404).json({ error: 'Kategori zaten silinmiş ya da bulunamadı.' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Kategori silme hatası:', error);
      res.status(500).json({ error: 'Silme sırasında hata oluştu.' });
    }
  }
};
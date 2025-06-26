import db from '../db/knex';

export const PostModel = {
  async create(data: {
    category_id: number;
    title: string;
    content: string;
    published_at?: string | null;
  }) {
    return db('posts').insert(data).returning('*');
  },

  async findAll(filters: {
    category?: number;
    status?: 'published' | 'draft' | 'all';
    showDeleted?: 'true' | 'false' | 'onlyDeleted';
  }) {
    return db('posts')
      .modify((queryBuilder) => {
        if (filters.category) {
          queryBuilder.where('category_id', filters.category);
        }

        if (filters.status === 'published') {
          queryBuilder.whereNotNull('published_at');
        } else if (filters.status === 'draft') {
          queryBuilder.whereNull('published_at');
        }

        if (filters.showDeleted === 'onlyDeleted') {
          queryBuilder.whereNotNull('deleted_at');
        } else if (filters.showDeleted === 'false' || !filters.showDeleted) {
          queryBuilder.whereNull('deleted_at');
        }
      })
      .orderBy('created_at', 'desc');
  },

  async findById(id: number) {
    return db('posts').where({ id }).whereNull('deleted_at').first();
  },

  async update(id: number, data: Partial<{ title: string; content: string; published_at: string | null }>) {
    return db('posts')
      .where({ id })
      .whereNull('deleted_at')
      .update(data)
      .returning('*');
  },

  async softDelete(id: number) {
    return db('posts')
      .where({ id })
      .whereNull('deleted_at')
      .update({ deleted_at: db.fn.now() });
  }
};
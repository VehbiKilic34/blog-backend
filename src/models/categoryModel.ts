import db from '../db/knex';

export const CategoryModel = {
  async create(data: { name: string }) {
    return db('categories').insert(data).returning('*');
  },

  async findAll(showDeleted = false) {
    return db('categories')
      .modify((queryBuilder) => {
        if (!showDeleted) {
          queryBuilder.whereNull('deleted_at');
        }
      })
      .orderBy('created_at', 'desc');
  },

  async findById(id: number) {
    return db('categories')
      .where({ id })
      .whereNull('deleted_at')
      .first();
  },

  async update(id: number, data: { name?: string }) {
    return db('categories')
      .where({ id })
      .whereNull('deleted_at')
      .update(data)
      .returning('*');
  },

  async softDelete(id: number) {
    return db('categories')
      .where({ id })
      .whereNull('deleted_at')
      .update({ deleted_at: db.fn.now() });
  }
};
import db from '../db/knex';

export const CommentModel = {
  async create(data: {
    post_id: number;
    content: string;
    commenter_name: string;
  }) {
    return db('comments').insert(data).returning('*');
  },

  async findAll(filters: {
    post?: number;
    commenter?: string;
  }) {
    return db('comments')
      .modify((qb) => {
        if (filters.post) {
          qb.where('post_id', filters.post);
        }
        if (filters.commenter) {
          qb.whereILike('commenter_name', `%${filters.commenter}%`);
        }
      })
      .orderBy('created_at', 'desc');
  },

  async findById(id: number) {
    return db('comments').where({ id }).first();
  },

  async update(id: number, data: Partial<{ content: string; commenter_name: string }>) {
    return db('comments')
      .where({ id })
      .update(data)
      .returning('*');
  },

  async delete(id: number) {
    return db('comments').where({ id }).del();
  }
};
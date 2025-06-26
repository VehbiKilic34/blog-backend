export async function up(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('published_at').nullable();
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex) {
  return knex.schema.dropTable('posts');
}
exports.up = function(knex) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary("article_id");
    articlesTable.string("title");
    articlesTable.string("body", 2000).notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic").references("topics.slug");
    articlesTable
      .string("author")
      .references("users.username")
      .notNullable();
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("articles");
};

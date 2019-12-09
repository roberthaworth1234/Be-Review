exports.up = function (knex) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.string('username').unique().primary('username');
    usersTable.string('avatar_url');
    usersTable.string('name');
  });

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')

};


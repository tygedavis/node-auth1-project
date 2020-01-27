
exports.up = function(knex) {
  user.increments();

  users
    .string('username')
    .notNullable()
    .unique();
  
  users
    .string('password', 128)
    .notNullable();
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users';)
};

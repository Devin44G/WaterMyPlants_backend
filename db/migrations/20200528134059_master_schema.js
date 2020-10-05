/*
NOTE: Created one "Master Schema" migrations file, being that I only created two tables
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();

      tbl.string('username', 25)
        .notNullable()
        .unique();

      tbl.string('password', 128)
        .notNullable();
    })
    .createTable('plants', tbl => {
      tbl.increments();

      tbl.string('nickname', 128)
        .notNullable();

      tbl.string('species', 128);

      tbl.string('h2o_frequency', 25)
        .notNullable();

      tbl.string('image', 255);

      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users');
};

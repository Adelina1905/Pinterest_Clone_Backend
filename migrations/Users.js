/**
 * User fields: id, email, password, birth_date, created_at

    One to many connection: User → Pin, User ->Board
 * 
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
// export const shorthands = undefined;
    // const {PgLiteral} = require("node-pg-migrate");
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const up = (pgm) => {
    pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(50)', unique: true },
    password: { type: 'varchar(30)', notNull: true },
    birth_date: { type: 'date', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  })

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
      pgm.dropTable('users')

};

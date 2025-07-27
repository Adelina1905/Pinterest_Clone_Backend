/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */

export const up = (pgm) => {
  pgm.createTable('pins', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    board_id: {
      type: 'integer',
      notNull: false,
      references: '"boards"',
      onDelete: 'cascade',
    },
    title: { type: 'varchar(100)', notNull: true },
    description: { type: 'text', notNull: false },
    link: { type: 'varchar(255)', notNull: false },
    tags: { type: 'text[]', notNull: false },
    allow_comments: { type: 'boolean', default: true },
    alt_text: { type: 'varchar(255)', notNull: false },
    image: { type: 'bytea', notNull: true },
    mimetype: { type: 'varchar(255)', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};

export const down = (pgm) => {
  pgm.dropTable('pins');
};

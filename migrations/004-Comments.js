/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */

export const up = (pgm) => {
  pgm.createTable('comments', {
    id: 'id',
    pin_id: {
      type: 'integer',
      notNull: true,
      references: '"pins"',
      onDelete: 'cascade',
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    content: { type: 'varchar(255)', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};

export const down = (pgm) => {
  pgm.dropTable('comments');
};

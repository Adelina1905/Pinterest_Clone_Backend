/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
    pgm.createTable('boards', {
      id: 'id',
      name: { type: 'varchar(50)', notNull: true }, 
      private: { type: 'boolean', default: false },
      user_id: { 
        type: 'integer', 
        notNull: true, 
        references: '"users"', 
        onDelete: 'cascade'
      }
    });
  };
  
  export const down = (pgm) => {
    pgm.dropTable('boards');
  };
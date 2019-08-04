const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface =>
    queryInterface.createTable('action', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'user',
          key: 'id'
        }
      },
      budget_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'budget',
          key: 'id'
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('action')
};

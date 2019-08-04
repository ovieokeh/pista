const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface =>
    queryInterface.createTable('budget', {
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
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      start_date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATE
      },
      completed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }),
  down: queryInterface => queryInterface.dropTable('budget')
};

const { DataTypes } = require('sequelize');

module.exports = {
  up: async queryInterface =>
    queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      avatar_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      has_pending_budget: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }),
  down: queryInterface => queryInterface.dropTable('user')
};

const {
  hasPendingBudget,
  hasPendingBudgetTrigger
} = require('../functions/hasPendingBudget');

module.exports = {
  up: queryInterface =>
    queryInterface.sequelize
      .query(hasPendingBudget)
      .then(() => queryInterface.sequelize.query(hasPendingBudgetTrigger)),
  down: () => ({})
};

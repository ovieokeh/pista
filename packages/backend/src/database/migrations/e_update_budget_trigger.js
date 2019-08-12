const {
  updateBudget,
  updateBudgetTrigger
} = require('../functions/updateBudget');

module.exports = {
  up: queryInterface =>
    queryInterface.sequelize
      .query(updateBudget)
      .then(() => queryInterface.sequelize.query(updateBudgetTrigger)),
  down: () => ({})
};

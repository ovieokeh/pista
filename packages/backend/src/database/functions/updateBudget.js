const updateBudget = `
CREATE OR REPLACE FUNCTION update_budget_amount()
  RETURNS TRIGGER AS $$
BEGIN
IF NEW.type = 'savings' THEN
  UPDATE "budget" SET amount = amount + NEW.amount
    WHERE id = NEW.budget_id;
ELSE
  UPDATE "budget" SET amount = amount - NEW.amount
    WHERE id = NEW.budget_id;
END IF;
RETURN NEW;
END;
$$
LANGUAGE plpgsql;
`;

const updateBudgetTrigger = `
CREATE TRIGGER update_budget_amount
BEFORE INSERT ON action
FOR EACH ROW EXECUTE
PROCEDURE update_budget_amount();
`;

module.exports = { updateBudget, updateBudgetTrigger };

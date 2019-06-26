const hasPendingBudget = `
CREATE OR REPLACE FUNCTION update_has_pending_budget()
  RETURNS TRIGGER AS $$
BEGIN
IF NEW.completed = TRUE THEN
  UPDATE "user" SET has_pending_budget = false
    WHERE id = NEW.user_id;
ELSE
  UPDATE "user" SET has_pending_budget = true
    WHERE id = NEW.user_id;
END IF;
RETURN NEW;
END;
$$
LANGUAGE plpgsql;
`;

const hasPendingBudgetTrigger = `
CREATE TRIGGER update_has_pending_budget
BEFORE INSERT OR UPDATE ON budget
FOR EACH ROW EXECUTE
PROCEDURE update_has_pending_budget();
`;

module.exports = { hasPendingBudget, hasPendingBudgetTrigger };

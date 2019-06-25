import { Model, DataTypes, BuildOptions } from 'sequelize';
import sequelize from './index';

interface iBudgetModel extends Model {
  id: string;
  userId: string;
  amount: number;
  startDate: string;
  endDate: string;
}

type BudgetModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): iBudgetModel;
};

const BudgetModel = <BudgetModelStatic>sequelize.define(
  'Budget',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
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
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    tableName: 'budget'
  }
);

export default BudgetModel;

import { Model, DataTypes, BuildOptions } from 'sequelize';
import sequelize from './index';

export interface iBudget {
  id: string;
  userId: string;
  amount: number;
  startDate: string;
  endDate: string;
  completed: boolean;
}

interface iBudgetModel extends iBudget, Model {
  dataValues: any;
}

type BudgetModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): iBudgetModel;
};

export const BudgetModel = <BudgetModelStatic>sequelize.define(
  'BudgetModel',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      onDelete: 'cascade',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    completed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'budget',
    underscored: true,
    freezeTableName: true,
    updatedAt: false,
    createdAt: false
  }
);

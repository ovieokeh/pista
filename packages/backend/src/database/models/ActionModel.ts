import { Model, DataTypes, BuildOptions } from 'sequelize';
import sequelize from './index';

export interface iAction {
  id: string;
  userId: string;
  budgetId: string;
  type: string;
  amount: number;
  note: string;
  createdAt: string;
}

interface iActionModel extends iAction, Model {
  dataValues: any;
}

type ActionModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): iActionModel;
};

export const ActionModel = <ActionModelStatic>sequelize.define(
  'Action',
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
    budgetId: {
      type: DataTypes.UUID,
      references: {
        model: 'Budget',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM('expense', 'savings'),
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    underscored: true,
    freezeTableName: true,
    tableName: 'action',
    updatedAt: false
  }
);

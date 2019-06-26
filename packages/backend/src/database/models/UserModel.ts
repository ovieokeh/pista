import { Model, DataTypes, BuildOptions } from 'sequelize';
import sequelize from '.';
import { BudgetModel, iBudget } from './BudgetModel';
import { ActionModel, iAction } from './ActionModel';

export interface iUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: Date;
  hasPendingBudget: boolean;
}

interface iUserModel extends iUser, Model {
  dataValues: any;
  getBudgets(): iBudget[];
  getActions(): iAction[];
}

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): iUserModel;
};

export const UserModel = <UserModelStatic>sequelize.define(
  'UserModel',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'password'
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hasPendingBudget: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'user',
    underscored: true,
    freezeTableName: true,
    updatedAt: false
  }
);

UserModel.hasMany(BudgetModel, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'budgets'
});

BudgetModel.hasMany(ActionModel, {
  sourceKey: 'id',
  foreignKey: 'budget_id',
  as: 'actions'
});

BudgetModel.belongsTo(UserModel, {
  targetKey: 'id',
  as: 'user'
});

ActionModel.belongsTo(BudgetModel, {
  targetKey: 'id',
  as: 'budget'
});

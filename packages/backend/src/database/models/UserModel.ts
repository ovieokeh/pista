import { Model, DataTypes, BuildOptions } from 'sequelize';
import sequelize from '.';

export interface iUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: Date;
}

interface iUserModel extends iUser, Model {
  dataValues: any;
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
    }
  },
  {
    tableName: 'user',
    underscored: true,
    freezeTableName: true,
    updatedAt: false
  }
);

import { DataTypes } from 'sequelize'
import sequelize from './dataSource'

const users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    //? foreign key example
    // feed_id: {
    //     type: DataTypes.INTEGER,

    //     references: {
    //         model: feed,
    //         key: 'id'
    //     }
    // }
}, 
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    }
)

export default {
    get_all_users () {
        return users.findAll()
    }
}

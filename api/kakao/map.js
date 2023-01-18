import { DataTypes } from 'sequelize'
import sequelize from '../model/dataSource'

const markers = sequelize.define('markers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
},
{
    timestamps: false,
    freezeTableName: true,
})

markers.sync()

export default {
    get_markers : async (req, res) => {
        try {

            const positions = await markers.findAll({
                attributes: ['latitude', 'longitude']
            })
            res.status(200).json({positions})

        } catch (err) {
            res.status(400).json(err)
        }

    }
}
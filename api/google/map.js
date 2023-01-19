import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../model/dataSource'

const companies = sequelize.define('companies', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: false
  }
},
{
    query: true
});

companies.sync();

//! create 2000 random companies
//! check i initialize !!
// var coordinates = []
// for (var i = 2000; i < 4000; i++) {
//   var lat = (Math.random() * 180) - 90;  // generates a random decimal between -90 and 90
//   var lng = (Math.random() * 360) - 180; // generates a random decimal between -180 and 180
//   coordinates.push({name: 'company ' + (i+1).toString(), location: Sequelize.fn('ST_GeomFromText',`POINT (${lng} ${lat})`) });
// }
// console.log(coordinates)
// companies.bulkCreate(coordinates)
// .then(() => {
// console.log('Data has been successfully inserted!');
// })
// .catch((error) => {
// console.log('Error while inserting data:', error);
// });

const centerLat = '-159.9613975616936'
const centerLng = '-79.61498929174193'
const distance = '300' // kilometer

export default {
    get_companies : async (req, res) => {
        const locations = await companies.findAll({
            where: { name : 'company 2' }
        }
        );
        res.status(200).json({locations})
    },

    get_nearby : async (req, res) => {
        const boundingBox = sequelize.literal(`ST_GeomFromText('Polygon((
            ${centerLng - distance} ${centerLat - distance}, ${centerLng - distance} ${centerLat + distance}, 
            ${centerLng + distance} ${centerLat + distance}, ${centerLng + distance} ${centerLat - distance}, 
            ${centerLng - distance} ${centerLat - distance}
            ))')`);
        
        const [nearby_locations] = await sequelize.query(`
        SELECT 
            c.id, c.name, c.location, c.createdAt, c.updatedAt 
        FROM 
            companies AS c 
        WHERE 
            MBRCONTAINS(
                ST_LINESTRINGFROMTEXT(
                    CONCAT(
                        'LINESTRING(', 
                            ${centerLat} -  IF(${centerLat} < 0, 1, -1) * ${distance * 1000} / 2 / ST_DISTANCE_SPHERE(POINT(${centerLat}, ${centerLng}), POINT(${centerLat} + IF(${centerLat} < 0, 1, -1), ${centerLng})), 
                            ' ', 
                            ${centerLng} -  IF(${centerLat} < 0, 1, -1) * ${distance * 1000} / 2 / ST_DISTANCE_SPHERE(POINT(${centerLat}, ${centerLng}), POINT(${centerLat}, ${centerLng} + IF(${centerLng} < 0, 1, -1))), 
                            ',', 
                            ${centerLat} +  IF(${centerLat} < 0, 1, -1) * ${distance * 1000} / 2 / ST_DISTANCE_SPHERE(POINT(${centerLat}, ${centerLng}), POINT(${centerLat} + IF(${centerLat} < 0, 1, -1), ${centerLng})), 
                            ' ', 
                            ${centerLng} +  IF(${centerLat} < 0, 1, -1) * ${distance * 1000} / 2 / ST_DISTANCE_SPHERE(POINT(${centerLat}, ${centerLng}), POINT(${centerLat}, ${centerLng} + IF(${centerLng} < 0, 1, -1))),
                        ')'
                    )
                ), 
                location
            )
    `);

    console.log(nearby_locations)
    res.status(200).json(nearby_locations)
    }
}

/////////////////

// let query = `SELECT 
// estate.id,
// concat(img.path) AS img,
// estate.room_type,
// estate.type,
// estate.title,
// estate.inner_area_size_1,
// estate.road_addr,
// estate.detail_addr,
// estate.info,
// estate.index_x,
// estate.index_y,
// estate.is_new,
// estate.price_type,
// estate.start_date,
// estate.price_cost_1,
// -- estate.end_date,
// ST_DISTANCE_SPHERE(POINT('${user_x}', '${user_y}'), fclty_loc) AS meter
// FROM estates AS estate FORCE INDEX FOR JOIN (\`six-library_in_seoul-fclty_loc\`)
// INNER JOIN (SELECT id, estates_id, name FROM img_groups GROUP BY estates_id) AS groups
// ON groups.estates_id = estate.id
// INNER JOIN (SELECT path, img_groups_id FROM imgs GROUP BY img_groups_id) AS img
// ON img.img_groups_id = groups.id        
// WHERE
// estate.is_start = 1 AND
// ${where.search_key}
// ${where.type} AND
// ${where.room_type} AND
// ${where.priceType} AND
// ${where.priceRange} AND
// ${where.subway_distance} AND
// ${where.loan_percent} AND
// ${where.management_fee} AND
// ${where.car_park} AND
// ${where.elevator} AND
// ${where.price_type} AND
// ${where.pets} ${where.price_type1} ${where.price_type2} AND ${where.estate_x} ${where.estate_y}
// MBRCONTAINS(
//     ST_LINESTRINGFROMTEXT(
//         CONCAT(
//             'LINESTRING(', 
//                 ${user_x} -  IF(${user_x} < 0, 1, -1) * ${length * 1000} / 2 / ST_DISTANCE_SPHERE(POINT(${user_x}, ${user_y}), POINT(${user_x} + IF(${user_x} < 0, 1, -1), ${user_y})), 
//                 ' ', 
//                 ${user_y} -  IF(${user_x} < 0, 1, -1) * ${length * 1000} / 2 / ST_DISTANCE_SPHERE(POINT(${user_x}, ${user_y}), POINT(${user_x}, ${user_y} + IF(${user_y} < 0, 1, -1))), 
//                 ',', 
//                 ${user_x} +  IF(${user_x} < 0, 1, -1) * ${length * 1000} / 2 / ST_DISTANCE_SPHERE(POINT(${user_x}, ${user_y}), POINT(${user_x} + IF(${user_x} < 0, 1, -1), ${user_y})), 
//                 ' ', 
//                 ${user_y} +  IF(${user_x} < 0, 1, -1) * ${length * 1000} / 2 / ST_DISTANCE_SPHERE(POINT(${user_x}, ${user_y}), POINT(${user_x}, ${user_y} + IF(${user_y} < 0, 1, -1))),
//             ')'
//         )
//     ), 
//     fclty_loc
// )
// ORDER BY meter ASC
// ${offset}`
// let a = `
//     SELECT
//     c.name,
//     c.address,
//     c.phone_number,
//     c.email,
//     c.hours,
//     c.profile_image,
//     FROM company AS c
    
// `

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

var coordinates = []
for (var i = 0; i < 2000; i++) {
  var lat = (Math.random() * 180) - 90;  // generates a random decimal between -90 and 90
  var lng = (Math.random() * 360) - 180; // generates a random decimal between -180 and 180
  coordinates.push({name: 'company ' + (i+1).toString(), location: [lat, lng]});
}
console.log(coordinates)

companies.bulkCreate(coordinates)
    .then(() => {
    console.log('Data has been successfully inserted!');
    })
    .catch((error) => {
    console.log('Error while inserting data:', error);
    });
// for (let i=0; i<coordinates.length; i++){
//     const point = { type: 'Point', coordinates: coordinates[i] };

//     companies.create({
//     name: 'company '+ (i+1).toString(),
//     location: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(point))
//     });    
// }
//bulkCreate

const centerLng = '45'
const centerLat = '45'
const distance = '.09'

export default {
    get_companies : async (req, res) => {
        const locations = await companies.findAll({
            where: { name : 'company 2' }
        }
        );
        res.status(200).json({locations})
    },

    get_nearby : (req, res) => {
        const boundingBox = sequelize.literal(`ST_GeomFromText('Polygon((
            ${centerLng - distance} ${centerLat - distance}, ${centerLng - distance} ${centerLat + distance}, 
            ${centerLng + distance} ${centerLat + distance}, ${centerLng + distance} ${centerLat - distance}, 
            ${centerLng - distance} ${centerLat - distance}
            ))')`);
        
        const nearby_locations = companies.query(`
        SELECT 
            id, name, location, createdAt, updatedAt 
        FROM 
            companies AS companies 
        WHERE 
            ST_Contains(
                ST_Transform(
                    ST_GeomFromText(
                        Polygon(
                            ${centerLng - distance} ${centerLat - distance}, ${centerLng - distance} ${centerLat + distance}, 
                            ${centerLng + distance} ${centerLat + distance}, ${centerLng + distance} ${centerLat - distance}, 
                            ${centerLng - distance} ${centerLat - distance}
                        )
                    ), 
                    4326
                )
            )
       `);
        res.status(200).json({nearby_locations})
    }
}




/////////////////
// const centerLat = 37.7749;
// const centerLng = -122.4194;
// const distance = 0.1;





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
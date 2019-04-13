const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'siscot'
});

module.exports.query = async (queryStr, params = []) => {
    // connection.connect();
    const result = await makeQueryPromise({
        sql: queryStr,
        values: params
    });
    // connection.end();
    return result;
}

makeQueryPromise = (queryObj) => {
    return new Promise((resolve, reject) => {
        connection.query(queryObj, (error, results, fields) => {
            if(error) return reject(error);
            resolve(results);
        })
    })
}
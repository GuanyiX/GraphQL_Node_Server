'use strict';

const pool = require('../db/dbConnection');

const resolvers = {
    Query: {
        getClients: () => {

            return new Promise((resolve, reject) => {
                pool.query('select * from client', (err, results) => {
                    if (err) {
                        console.log("Something wrong");
                        return;
                    }

                    let res = JSON.parse(JSON.stringify(results))

                    resolve(res)
                })

            })

        }
    }
}

module.exports = resolvers
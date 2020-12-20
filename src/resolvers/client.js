'use strict';

const { AuthenticationError } = require('apollo-server');
const { getUserByToken } = require('../common/common');

const pool = require('../db/dbConnection');


const getClients = () => {

    return new Promise((resolve, reject) => {
        pool.query('select * from client', (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            let res = JSON.parse(JSON.stringify(results))

            resolve(res)
        })

    })

}

const resolvers = {
    Query: {
        getClients: async (parent, args, { token }) => {

            const user = await getUserByToken(token);
            if (user.roleId === 1) {
                try {
                    const res = await getClients();
                    return res
                } catch (err) {
                    console.log(err)
                }
            }else {
                throw new AuthenticationError('You cannot get clients')
            }

        }
    }
}

module.exports = resolvers
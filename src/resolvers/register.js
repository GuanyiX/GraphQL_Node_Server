'use strict';

const bcrypt = require('bcryptjs');
const { ValidationError } = require('apollo-server');
const { getUser } = require('../common/common');

const pool = require('../db/dbConnection');


const saveUser = (userLogin, prefName, password, roleId) => {

    return new Promise((resolve, reject) => {

        pool.query(
            'insert into user (userLogin, prefName, roleId, password, MFAEnabled, MFALastActivity, LoginRetries, loginBlockedUntilDT, createdDT, createdUserId) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                userLogin,
                prefName,
                roleId,
                password,
                0,
                null,
                0,
                null,
                new Date(),
                1
            ],
            (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                let res = JSON.parse(JSON.stringify(results))

                const user = {
                    id: res.insertId,
                    username: prefName,
                    email: userLogin,
                    roleId
                }

                resolve(user)

            }
        )
    })
}

const resolvers = {
    Mutation: {

        createUser: async (_, { input }) => {
            let { userLogin, prefName, password, roleId } = input;

            const user = await getUser(userLogin);
            if (user.length !== 0) throw new ValidationError('This email has been used!');

            password = await bcrypt.hash(password, 10);

            const res = await saveUser(userLogin, prefName, password, roleId);

            if (res) {
                return true;
            } else {
                return false;
            }

        }
    }
}

module.exports = resolvers;
'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUser } = require('../common/common');
require('dotenv').config();

const getToken = ({ id, username, email, roleId }) => {
    return jwt.sign(
        {
            id,
            username,
            email,
            roleId
        },
        process.env.JWT_SECRET
    )
}

const resolvers = {
    Query: {

        loginUser: async (_, args) => {
            let { userLogin, password } = args;

            const user = await getUser(userLogin);
            if (user.length === 0) throw new ValidationError('You need to register!');

            const match = await bcrypt.compare(password, user[0].password);


            if (match) {
                const res = await getToken({
                    id: user[0].userId,
                    username: user[0].prefName,
                    email: user[0].userLogin,
                    roleId: user[0].roleId
                })

                return {
                    id: user[0].userId,
                    token: res
                }
                
            } else {
                return;
            }
        }
    }
}

module.exports = resolvers;
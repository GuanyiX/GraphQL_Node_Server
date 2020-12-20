'use strict';

const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const pool = require('../db/dbConnection');
require('dotenv').config();

const getUser = (userLogin) => {

    return new Promise((resolve, reject) => {

        pool.query(
            'select * from user where userLogin = ?',
            userLogin,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                let res = JSON.parse(JSON.stringify(results))
                resolve(res)
            }
        )
    })
}


const getUserByToken = async (auth) => {

    if(!auth) throw new AuthenticationError('You must be logged in');

    const token = auth.split('Bearer ')[1];
    if(!token) throw new AuthenticationError('You must provide a token');

    const user = await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) throw new AuthenticationError('invalid token');
        return decoded;
    })

    return user;
}

module.exports = {
    getUser,
    getUserByToken
}
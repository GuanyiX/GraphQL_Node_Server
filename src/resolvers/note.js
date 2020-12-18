'use strict';

const pool = require('../db/dbConnection');

const resolvers = {
    Query: {
        getNotes: (parent, args, context, info) => {
            const { entityId } = args;

            return new Promise((resolve, reject) => {
                pool.query('select * from note where entityId = ?', entityId, (err, results) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    let res = JSON.parse(JSON.stringify(results))

                    resolve(res)
                })
            })
        }
    },
    Mutation: {
        createNote: (parent, { input }, context, info) => {
            const { category, alert, entity, entityId, focus, focusId, content, createdUserId } = input;

            return new Promise((resolve, reject) => {
                pool.query(
                    'insert into note (category, alert, entity, entityId, focus, focusId, content, createdDT, createdUserId) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        category,
                        alert,
                        entity,
                        entityId,
                        focus,
                        focusId,
                        content,
                        new Date(),
                        createdUserId
                    ],
                    (err, results) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        let res = JSON.parse(JSON.stringify(results))

                        resolve(res.insertId)
                    }
                )
            })
        },
        updateNote: (parent, arg, context, info) => {
            const { noteId, content } = arg;

            return new Promise((resolve, reject) => {
                pool.query(
                    'update note set content = ? where noteId = ?',
                    [
                        content,
                        noteId
                        
                    ],
                    (err, results) => {
                        if (err) {
                            console.log(err)
                            return;
                        }

                        let res = JSON.parse(JSON.stringify(results))

                        resolve(res.changedRows)
                    }
                )
            })
        },
        deleteNote: (parent, arg, context, info) => {
            const { noteId } = arg;

            return new Promise((resolve, reject) => {
                pool.query(
                    'delete from note where noteId = ?',
                    noteId,
                    (err, results) => {
                        if (err) {
                            console.log(err)
                            return;
                        }

                        let res = JSON.parse(JSON.stringify(results))

                        resolve(res.affectedRows)
                    }
                )
            })
        }
    }
}

module.exports = resolvers;
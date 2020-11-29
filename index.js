const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require("mysql");


const pool = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'YATB2011iop!',
    database : 'graphql_test'
  });

 
const app = express();

const schema = buildSchema(`
   type Query {
       authors: [Author]
   }

   type Mutation {
       createAuthor(input: AuthorType): Author,
       updateAuthor(id: ID!, input: AuthorType): Author
   }

   input AuthorType {
       name: String,
       address: String
   }

   type Author {
       name: String,
       address: String
   }
`);


const root = {
    authors: () => {
        return new Promise((resolve, reject) => {
            pool.query('select * from authors', (err, results) => {
                if(err) {
                    console.log("Something wrong");
                    return;
                }
    
                const newArr = [];
                for(let i = 0; i < results.length; i++) {
                    newArr.push({
                        name: results[i].name,
                        address: results[i].address
                    })
                }

                resolve(newArr)
            })
            
        })
        
    },
    createAuthor: ({input}) => {
        const data = {
            name: input.name,
            address: input.address
        }

        return new Promise((resolve, reject) => {

            pool.query('insert into authors set ?', data, (err) => {
                if(err) {
                    console.log("Error happens")
                    return;
                }

                resolve(data)
    
            })
        })
    },
    updateAuthor: ({id, input}) => {
        const data = input;

        return new Promise((resolve, reject) => {

            pool.query('update authors set ? where name = ?', [data, id], (err) => {
                if(err) {
                    console.log(err);
                    return;
                }

                resolve(data)
            })
        })
    }
}
 
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
 
app.listen(8000, () => {
    console.log("Server starts to listen port 8000")
});
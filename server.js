const app = require('express')();
const express_graphql = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const { con }  = require('./configs')
const util = require('util')
const query = util.promisify(con.query).bind(con)
const PORT = process.env.PORT || 8021

// GraphQL schema
const schema = buildSchema(`
    type Query {
        listname: [listed]
        getByID(id: Int!): [listed]
        delBYID(id: Int!): [listed]
    },
    
    type Mutation {
        updateData(id: Int!, name: String!): [listed]
        addData(name: String!, jobs: String!, university: String!): [listed]
    }

    type listed {
        id: Int
        name: String
        avatar_user: String
        jobs: String
        university: String
        message: String
        bool: Boolean
    }

`);

// resolver for graphql
const root = {
    listname: async() => {
        try {
            let data = await query("SELECT * FROM data_fake")
            return data
        } catch(err) {
            return [{"message": "Your data no found", "bool": false}]
        }
    },

    getByID: async({id}) => {
        try {
            let rows = await query(`SELECT * FROM data_fake WHERE id=${id}`)
            return rows
        } catch(err) {
            return [{"message": "Your data no found", "bool": false}]
        }
    },

    delBYID: async({id}) => {
        try {
            await query(`DELETE FROM data_fake WHERE id=${id}`)
            return [{"message": "Your data was success to delete", "bool": true}]
        } catch(err) {
            return [{"message": "Your data was failed to delete", "bool": false}]
        }
    },

    updateData: async({id, name}) => {
        try {
            await query(`UPDATE data_fake SET name = '${name}' WHERE id = ${id}`)
            return [{"message": "Your data was success to update", "bool": true}]
        } catch(err) {
            return [{"message": "Your data was failed to update", "bool": false}]
        }
    },

    addData: async({name, jobs, university}) => {
        try {
            await query(`INSERT INTO data_fake (name, jobs, university) values ('${name}', '${jobs}', '${university}')`)
            return [{"message": "Your data was success to insert", "bool": true}]
        } catch(err) {
            return [{"message": "Your data was failed to insert", "bool": false}]
        }
    }

};

// Create an express server and a GraphQL endpoint
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// check database connection active or died
con.connect((err) => {
    if(err) console.log(" -- database not connect YO -- ")
    console.log(" -- database connect dude -- ")
})

app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));
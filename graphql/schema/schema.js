const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = require('graphql')
const _ = require('lodash')
const Author = require('../../models/Author');
const Book = require('../../models/Book');

var books = [
    { name: 'Name of The Wild', genre: 'Fantasy', id:'1', authorID:'1' },
    { name: 'The Final Empire', genre: 'Fantasy', id:'2', authorID:'2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id:'3', authorID:'3' },
]
var authors = [
    { name: 'Gurkaran', age:25, id:'1' },
    { name: 'Ankit', age:25, id:'2' },
    { name: 'Sumit', age:25, id:'3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, { id: parent.authorID})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorID: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: { id: { type:GraphQLID }},
            resolve(parent, args){
                return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let NewAuthor = new Author({
                    name: args.name,
                    age: args.age
                })
                return NewAuthor.save()
            }
        },
        addBook: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorID: { type: GraphQLID }
            },
            resolve(parent, args){
                let NewBook = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID
                })
                return NewBook.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
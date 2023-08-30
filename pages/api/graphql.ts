import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import apiRequest from '@/utils/apiRequest';

const typeDefs = `
type Query{
    getPosts: [Post]
    getPost(id: ID!): Post
}
type Post {
    text: String   
}

input PostInput{
    text: String
}

type Mutation{
    createPost(postCreateInput: PostInput!): String
    deletePost(id: ID!): String
    updatePost(id: ID! postUpdateInput: PostInput!): String
}

`

const resolvers = {
    Query: {
        getPosts: async () => {
            const result = await apiRequest('find', {})
            return result.documents
        },
        getPost: async (_:never, args: { id: any; }) => {
            const result = await apiRequest('findOne', {
                filter: {
                    _id: {
                        $oid: args.id
                    }
                }
            })
            return result.document
        }
    },
    Mutation: {
        createPost: async (_: never, args: { postCreateInput: { text: string; }; }) => {
            const result = await apiRequest('insertOne', {
                document: {
                    text: args.postCreateInput.text
                }
            })
            console.log(result)
            return result.insertedId
        },
        deletePost: async (_:never, args:any) => {
            const result = await apiRequest('deleteOne', {
                filter : {
                    _id: {$oid: args.id}
                }
            })
            return result.deletedCount;
        },
        updatePost: async (_:never, args: { id: any; postUpdateInput: { text: any; }; }) => {
            const result = await apiRequest('updateOne', {
                filter : {
                    _id: {$oid: args.id}
                },
                update: {
                    $set: {
                        text: args.postUpdateInput.text
                    }
                }
            })
        }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  export default startServerAndCreateNextHandler(server);
import { gql } from 'apollo-server'

const typeDefs = gql`
    type Usuario {
        id: ID!
        nome: String!
        tipo: Boolean
    }

    type Mensagem {
        id: ID!
        conteudo: String!
        usuario: Usuario!
    }
    type Query {
        mensagens: [Mensagem]!
        usuarios: [Usuario]!
        me: Usuario
    }
    type Mutation {
        novaMensagem(usuarioId: ID!, conteudo: String!): Mensagem
        login(nome: String!, tipo: Boolean): Usuario
        logoff(usuarioId: ID!): Usuario
    }
`

export default typeDefs
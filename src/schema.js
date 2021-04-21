import { gql } from 'apollo-server'

const typeDefs = gql`
    type Usuario {
        id: ID!
        nome: String!
        tipo: Tipo!
    }

    type Mensagem {
        id: ID!
        conteudo: String!
        usuario: Usuario!
    }
    enum Tipo {
        HOMEM
        MULHER
    }
    type Query {
        mensagens: [Mensagem]!
        usuarios: [Usuario]!
        me: Usuario
    }
    type Mutation {
        novaMensagem(usuarioId: ID!, conteudo: String!): Mensagem
        login(nome: String!, tipo: Tipo): Usuario
        logoff(usuarioId: ID!): Usuario
    }
`

export default typeDefs
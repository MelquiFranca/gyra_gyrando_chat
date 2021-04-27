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
        data: String!
    }
    type Query {
        mensagens: [Mensagem]!
        usuarios: [Usuario]!
        me: Usuario
    }
    type Mutation {
        novaMensagem(usuarioId: ID, conteudo: String!): Mensagem
        login(nome: String!, tipo: Boolean!, id: ID): Usuario
        logoff(usuarioId: ID!): Usuario
    }
    type Subscription {
        atualizarMensagens: Mensagem
        entradaUsuario: Usuario
        saidaUsuario: Usuario
    }
`

export default typeDefs
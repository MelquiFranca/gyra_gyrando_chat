import { PubSub } from "graphql-subscriptions"

const pubsub = new PubSub()

export default {
    Query: {
        mensagens: (_, __, { dataSources }) => dataSources.mensagemAPI.getMensagens(),
        usuarios: (_, __, { dataSources }) => dataSources.usuarioAPI.getUsuarios(),
        me: (_, __, { dataSources }) => dataSources.usuarioAPI.loginUsuario(),
    },
    Mutation: {
        login: (_, { nome, tipo }, { dataSources }) => {
            pubsub.publish('USUARIO_LOGADO', { entradaUsuario: { nome, tipo } })
            return dataSources.usuarioAPI.loginUsuario({ nome, tipo })
        },

        novaMensagem: (_, { usuarioId, conteudo }, { dataSources }) => {
            const retorno = dataSources.mensagemAPI.novaMensagem({ usuarioId, conteudo })
            pubsub.publish('USUARIO_DESLOGADO', retorno)
            return retorno
        },        
        logoff: (_, { usuarioId }, { dataSources }) => {
            dataSources.usuarioAPI.logoffUsuario({usuarioId})
        },
    },
    Subscription: {
        entradaUsuario: {
            subscribe:  pubsub.asyncIterator(['USUARIO_LOGADO'])
        },
        saidaUsuario: {
            subscribe:  pubsub.asyncIterator(['USUARIO_DESLOGADO'])
        },
        atualizarMensagens: {
            subscribe:  pubsub.asyncIterator(['NOVA_MENSAGEM'])
        },
    }
}
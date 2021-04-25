import { PubSub } from "graphql-subscriptions"

const pubsub = new PubSub()

export default {
    Query: {
        mensagens: (_, __, { dataSources }) => dataSources.mensagemAPI.getMensagens(),
        usuarios: (_, __, { dataSources }) => dataSources.usuarioAPI.getUsuarios(),
        me: (_, __, { dataSources }) => dataSources.usuarioAPI.loginUsuario(),
    },
    Mutation: {
        login: async (_, { nome, tipo }, { dataSources }) => {
            const retorno = await dataSources.usuarioAPI.loginUsuario({ nome, tipo })
            pubsub.publish('USUARIO_LOGADO', { entradaUsuario: retorno })
            return retorno
        },

        novaMensagem: async(_, { usuarioId, conteudo }, { dataSources }) => {
            const retorno = await dataSources.mensagemAPI.novaMensagem({ usuarioId, conteudo })
            return pubsub.publish('NOVA_MENSAGEM', {atualizarMensagens: retorno})
        },        
        logoff: async (_, { usuarioId }, { dataSources }) => {
            const retorno = await dataSources.usuarioAPI.logoffUsuario({usuarioId})
            return pubsub.publish('USUARIO_DESLOGADO', retorno)
        },
    },
    Subscription: {
        entradaUsuario: {
            subscribe: _ =>  pubsub.asyncIterator(['USUARIO_LOGADO'])
        },
        saidaUsuario: {
            subscribe:  _ => pubsub.asyncIterator(['USUARIO_DESLOGADO'])
        },
        atualizarMensagens: {
            subscribe:  _ => pubsub.asyncIterator(['NOVA_MENSAGEM'])
        },
    }
}
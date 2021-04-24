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

        novaMensagem: async (_, { usuarioId, conteudo }, { dataSources }) => {
            const usuario = await dataSources.usuarioAPI.getUsuarioId(usuarioId)
            // pubsub.publish('NOVA_MENSAGEM', {conteudo, usuario})
            return dataSources.mensagemAPI.novaMensagem({ usuarioId, conteudo })
        },        
        logoff: (_, { usuarioId }, { dataSources }) => 
            dataSources.usuarioAPI.logoffUsuario({usuarioId}),
    },
    Subscription: {
        entradaUsuario: {
            subscribe:  pubsub.asyncIterator(['USUARIO_LOGADO'])
        },
        atualizarMensagens: {
            subscribe:  pubsub.asyncIterator(['NOVA_MENSAGEM'])
        },
    }
}
export default {
    Query: {
        mensagens: (_, __, { dataSources }) => dataSources.mensagemAPI.getMensagens(),
        usuarios: (_, __, { dataSources }) => dataSources.usuarioAPI.getUsuarios(),
        me: (_, __, { dataSources }) => dataSources.usuarioAPI.pesquisarOuCriarUsuario(),
    },
    Mutation: {
        login: (_, { nome, tipo }, { dataSources }) => dataSources.usuarioAPI.pesquisarOuCriarUsuario({ nome, tipo })
    }
}
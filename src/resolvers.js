export default {
    Query: {
        mensagens: (_, __, { dataSources }) => dataSources.mensagemAPI.getMensagens(),
        usuarios: (_, __, { dataSources }) => dataSources.usuarioAPI.getUsuarios(),
        me: (_, __, { dataSources }) => dataSources.usuarioAPI.loginUsuario(),
    },
    Mutation: {
        login: (_, { nome, tipo }, { dataSources }) => 
            dataSources.usuarioAPI.pesquisarOuCriarUsuario({ nome, tipo }),

        novaMensagem: (_, { usuarioId, conteudo }, { dataSources }) => 
            dataSources.mensagemAPI.novaMensagem({ id: usuarioId, conteudo }),
        
        logoff: (_, __, { dataSources }) => 
            dataSources.usuarioAPI.logoffUsuario(),
    }
}
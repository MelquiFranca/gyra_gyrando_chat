import { ApolloServer } from 'apollo-server'
import typeDefs from './schema.js'
import UsuarioAPI from './datasources/usuario.js'
import MensagemAPI from './datasources/mensagem.js'
import createStore from './store.js'
import resolvers from './resolvers.js'

const store = createStore({url: 'mongodb://localhost/gyragyrando'})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        usuarioAPI: new UsuarioAPI({ store }),
        mensagemAPI: new MensagemAPI({ store })
    })
})

server.listen({port: 4001}).then((data) => {
    console.log(`
        Servidor Iniciado!
    `)
})
import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server'
import typeDefs from './schema.js'
import UsuarioAPI from './datasources/usuario.js'
import MensagemAPI from './datasources/mensagem.js'
import createStore from './store.js'
import resolvers from './resolvers.js'

dotenv.config()

const store = createStore({url: 'mongodb://localhost/gyragyrando'})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const nome = req && req.headers.usuario || null
        const tipo = req && req.headers.usuario || null

        if(!nome || !tipo) return { usuario: null }

        const usuario = await this.store.usuarios.create({
            nome,
            tipo
        })

        return { usuario }
    },
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
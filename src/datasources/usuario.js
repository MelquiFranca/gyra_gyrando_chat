import { DataSource } from 'apollo-datasource'

class UsuarioAPI extends DataSource {
    constructor({ store }) {
        super()
        this.store = store
    }

    initialize(config) {
        this.context = config.context
    }
    async criarUsuario({ nome, tipo } = {}) {
        if(!nome || !tipo) return null

        const usuario = await this.store.usuarios.findOne({nome})

        if(usuario) 
            return this.usuarioReducer(usuario)

        const usuarios = await this.store.usuarios.create({
            nome,
            tipo
        })

        return usuarios ? this.usuarioReducer(usuario) : null
    }
    async removerUsuario({ id, nome }) { //Definir se irá buscar pelo 'id' ou pelo 'nome' direto
        if(!id) return null

        const usuario = await this.store.usuarios.findOneAndDelete({ id })
        return usuario 
            ? this.usuarioReducer(usuario) 
            : null
    }
    async getUsuarios() {
        const usuarios = await this.store.usuarios.find()
        return usuarios
            ? usuarios.map(usuario => this.usuarioReducer(usuario))
            : []
    }
    usuarioReducer(usuario) {
        return {
            id: usuario._id,
            nome: usuario.nome,
            tipo: usuario.tipo
        }
    }
}

export default UsuarioAPI
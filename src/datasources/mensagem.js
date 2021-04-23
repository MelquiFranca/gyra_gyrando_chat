import { DataSource } from 'apollo-datasource'

class MensagemAPI extends DataSource { 
    constructor({ store }) {
        super()
        this.store = store
    }

    initialize(config) {
        this.context = config.context
    }

    async novaMensagem({ id, conteudo }) {
        if(!conteudo) return null

        const  usuarioLogado = this.context.usuario
        const usuario = await this.store.usuario.findOne({ _id: id })
        
        if(!usuarioLogado && !usuario) return null
        
        if(!usuario) return null
        
        const mensagem = await this.store.mensagens.create({ conteudo, usuario: usuario || usuarioLogado })

        return  mensagem
            ? this.mensagemReduce(mensagem._doc)
            : null
    }
    async getMensagens() {
        const mensagens = await this.store.mensagens.find()
        return mensagens
            ? mensagens.map(mensagem => this.mensagemReducer(mensagem._doc))
            : []
    }
    mensagemReducer(mensagem) {
        return {
            id: mensagem._id,
            conteudo: mensagem.conteudo,
            usuario: {
                id: mensagem.usuario._id,
                nome: mensagem.usuario.nome,
                tipo: mensagem.usuario.tipo,
            }
        }
    }
}

export default MensagemAPI
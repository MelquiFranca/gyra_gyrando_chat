import { DataSource } from 'apollo-datasource'

class MensagemAPI extends DataSource { 
    constructor({ store }) {
        super()
        this.store = store
    }

    initialize(config) {
        this.context = config.context
    }

    async novaMensagem({ conteudo }) {
        const usuario = this.context.usuario
        if(!conteudo || !usuario.id) return null
        
        const mensagem = await this.store.mensagens.create({ conteudo, usuario })

        return  mensagem
            ? this.mensagemReduce({mensagem})
            : null
    }
    async getMensagens() {
        const mensagens = await this.store.mensagens.find()
        return mensagens
            ? mensagens.map(mensagem => this.mensagemReducer({mensagem}))
            : []
    }
    mensagemReducer({mensagem}) {
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
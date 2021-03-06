import { DataSource } from 'apollo-datasource'

class MensagemAPI extends DataSource { 
    constructor({ store }) {
        super()
        this.store = store
    }

    initialize(config) {
        this.context = config.context
    }

    async novaMensagem({ usuarioId, conteudo }) {
        if(!conteudo) return null

        const usuario = await this.store.usuarios.findOne({ _id: usuarioId })
        if(!usuario) return null

        const mensagem = await this.store.mensagens.create({ conteudo, usuarioId: usuario.id })

        return  mensagem
            ? this.mensagemReducer({mensagem, usuario})
            : null
    }
    async getMensagens() {
        const mensagens = await this.store.mensagens.find()
        return mensagens
            ? mensagens.map(async mensagem => {
                const usuario = await this.store.usuarios.findOne({  _id: mensagem.usuarioId }).sort({created_at:-1})
                return this.mensagemReducer({mensagem, usuario: usuario || {id: '0', nome: 'Não identificado', tipo: null}})
            })
            : []
    }
    mensagemReducer({mensagem, usuario}) {
        return {
            id: mensagem._id,
            conteudo: mensagem.conteudo,
            data: mensagem.created_at,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                tipo: usuario.tipo,
            }
        }
    }
}

export default MensagemAPI
import mongoose from 'mongoose'
const store = ({ url }) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    
    const usuarioSchema = new mongoose.Schema({
        nome: {
            type: String,
            required: true,
            unique: true,
        },
        tipo: {
            type: String,
            required: true
        }
    })
    const usuarios = mongoose.model('Usuarios', usuarioSchema)

    const mensagemSchema = new mongoose.Schema({
        conteudo: {
            type: String,
            required: true,
        },
        usuarioId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        }        
    })    
    const mensagens = mongoose.model('Mensagens', mensagemSchema)

    return {
        usuarios,
        mensagens
    }
}

export default store
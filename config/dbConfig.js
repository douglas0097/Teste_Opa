// Configuração do banco
require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        const dbUser = process.env.DB_USER;
        const dbPass = process.env.DB_PASS;

        const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster1.eguyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

        require('dotenv').config();
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;
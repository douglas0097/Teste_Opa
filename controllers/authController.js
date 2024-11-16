//Chamada das dependencias
require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const checkToken = require('../middlewares/auth');

//Models
const User = require('../models/User')

//Rotas
const router = express.Router();

//////////////////////////////////////////////////////////////////////////////////////////////////
//Criação do usuário
router.post('/register', async (req, res) => {
    const {name, email, password, confirmpassword} = req.body

    // Validações
    if(!name){
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }
    if(!email){
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }

    if(password !== confirmpassword){
        return res.status(422).json({msg: 'Senhas divergentes!'})
    }

    // Checar de email ja foi cadastrado
    const userExists = await User.findOne({email: email})

    if(userExists){
        return res.status(422).json({msg: 'Email já cadastrado'})
    }

    //Criação de senha com hash
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Criação de usuário
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try{
        await user.save()
        res.status(201).json({msg: "Usuário criado com sucesso"})

    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Ocorreu um erro, tente novamente"})
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//ROTA PRIVADA
router.get("/user/:id", checkToken, async (req, res) =>{
    const id = req.params.id

    //Checar se usuário existe

    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({msg: 'Usuário não cadastrado!'})
    }

    res.status(200).json({user})
})

//////////////////////////////////////////////////////////////////////////////////////////////////
//LOGIN DO USUARIO
router.post("/login", async (req, res) => {
    const {email, password} = req.body

    //Validações
    if(!email){
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }
    if(!password){
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }

    //Checar de usuário existe
    const user = await User.findOne({email: email})

    if(!user){
        return res.status(404).json({msg: 'Usuário não cadastrado!'})
    }

    //Checar senha
    const checkPassword = await bcrypt.compare(password, user.password)
    
    if(!checkPassword){
        return res.status(422).json({msg: 'Senha inválida!'})
    }

    try{
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
        },secret,
    )
    res.status(200).json({msg:'Login feito com sucesso!',token})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:'Ocorreu um erro, tente novamente'})
    }
})

module.exports = app => app.use('/auth', router)
const express = require('express')
const Category = require('../models/Category')
const checkToken = require('../middlewares/auth')
const Product = require('../models/Product')

const router = express.Router()

/////////////////////////////////////////////////////////////////////////////////////
//CRIAR CATEGORIA
router.post('/register', checkToken, async (req, res) =>{
    const{name, description} = req.body

    //Validações
    if(!name || !description){
        return res.status(422).json({msg:'Preencha todos os campos!'})
    }

    //Adicionando categoria
    try{
        const category = new Category({
            name,
            description
        })
        await category.save()
        res.status(201).json({msg:'Categoria adicionada com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao adicionar a categoria'})
    }
})

/////////////////////////////////////////////////////////////////////////////////////
//EDITAR CATEGORIA

router.put('/update/:id', checkToken, async (req, res) =>{
    const {id} = req.params
    const {name, description} = req.body;

    try{
        const updateCategory = await Category.findByIdAndUpdate(
            id,
            {name, description},
            {new:true}
        )
        if (!updateCategory){
            return res.status(404).json({msg:'Categoria não encontrada!'})
        }

        res.status(200).json({msg:'Categoria atualizada com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao atualizar categoria!'})
    }
})
/////////////////////////////////////////////////////////////////////////////////////
//DELETAR CATEGORIA
router.delete('/delete/:id', checkToken, async (req, res) =>{
    const {id} =  req.params;

    try{
        const deleteCategory = await Category.findByIdAndDelete(id)

        if(!deleteCategory){
            return res.status(404).json({msg:'Categoria não encontrada'})
        }

        res.status(200).json({msg: 'Categoria deletada com sucesso!'})
    }catch(error){
        res.status(500).json({msg: 'Erro ao deletar categoria'})
    }
})

/////////////////////////////////////////////////////////////////////////////////////
//BUSCAR TODAS AS CATEGORIAS

router.get('/', async (req, res) => {
    try{
        const categories = await Category.find()
        res.status(200).json({categories})
    }catch(error){
        res.status(500).json({msg:'Erro ao buscar categorias'})
    }
})
/////////////////////////////////////////////////////////////////////////////////////
//BUSCAR CATEGORIA POR ID

router.get('/:id', async (req, res) =>{

    const{id} = req.params

    try{
        const category = await Category.findById(id)

        if(!category){
            return req.status(404).json({msg:'Categoria não encontrada!'})
        }

        res.status(200).json({category})
    }catch(error){
        res.status(500).json({msg:'Erro ao buscar categoria'})
    }
})


module.exports = app => app.use('/categories', router)
const express = require('express')
const Category = require('../models/Category')
const checkToken = require('../middlewares/auth')
const Product = require('../models/Product')

const router = express.Router()

/////////////////////////////////////////////////////////////////////////////////////
//CRIAR CATEGORIA

router.post('/register', checkToken, async (req, res) =>{
    const{name, description} = req.body

    //Validar campos
    if(!name || !description){
        return res.status(422).json({msg:'Preencha todos os campos!'})
    }

    //Criar categoria
    try{
        const category = new Category({
            name,
            description
        })
        await category.save()
        res.status(201).json({msg:'Categoria criada com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao adicionar a categoria'})
    }
})

/////////////////////////////////////////////////////////////////////////////////////
//EDITAR CATEGORIA

router.put('/edit/:id', checkToken, async (req, res) =>{
    const {id} = req.params
    const {name, description} = req.body

    if(!name || !description){
        return res.status(422).json({msg:'Preencha todos os campos!'})
    }
    
    try{
        const editCategory = await Category.findByIdAndUpdate(
            id,
            {name, description},
            {new:true}
        )
        if (!editCategory){
            return res.status(404).json({msg:'Categoria não encontrada!'})
        }

        res.status(200).json({msg:'Categoria editada com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao editar categoria!'})
    }
})

/////////////////////////////////////////////////////////////////////////////////////
//ATUALIZAR CATEGORIA

router.patch('/update/:id', async (req, res) =>{
    const {id} = req.params
    const {name, description} = req.body

    try{
        const updateCategory = await Category.findByIdAndUpdate(
            id,
            {name, description},
            {new:true}
        )
        if (!updateCategory){
            return res.status(404).json({msg:'Categoria não encontrada'})
        }

        res.status(200).json({msg:'Categoria atualizada com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao atualizar categoria!'})
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

/////////////////////////////////////////////////////////////////////////////////////
//DELETAR CATEGORIA

router.delete('/delete/:id', checkToken, async (req, res) =>{
    const {id} =  req.params

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

module.exports = app => app.use('/categories', router)
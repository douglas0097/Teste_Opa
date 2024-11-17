const express = require('express')
const Product = require('../models/Product')
const checkToken = require('../middlewares/auth');
const Category = require('../models/Category')

const router = express.Router()

//////////////////////////////////////////////////////////////////////////////////
//CRIAÇÃO DE PRODUTO

router.post('/register', checkToken, async (req, res) => {
    const {name,description, amount, price, categories} = req.body
    
    //Validar campos
    if(!name || !description || !amount || !price){
        return res.status(422).json({msg:'Preencha todos os campos!'})
    }

    try{


        let categoryIds = []

        //Validar se foi adicionado categoria e se existe
        if(categories && categories.length > 0){
            for (const categoryName of categories){
                const category = await Category.findOne({name:categoryName})
                if(!category){
                    return res.status(404).json({msg:`Categoria ${categoryName} não encontrada`})
                }
                categoryIds.push(category._id);
            }
        }

    //Criar produto
        const product = new Product({
            name,
            description,
            amount,
            price,
            categories: categoryIds
        })
        await product.save()
        res.status(201).json({msg:'Produto adicionado com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao adicionar o produto'})
    }
})

//////////////////////////////////////////////////////////////////////////////////
//EDITAR PRODUTO

router.put('/edit/:id', checkToken, async (req, res) =>{
    const {id} = req.params
    const {name,description, amount, price, categories} = req.body

    //Validar campos
    if(!name || !description || !amount || !price || !categories){
        return res.status(422).json({msg:'Preencha todos os campos!'})
    }

    try{
        let categoryIds = [];

        //Validar se foi adicionado categoria e se existe
        if(categories && categories.length > 0){
            for (const categoryName of categories){
                const category = await Category.findOne({name:categoryName})
                if(!category){
                    return res.status(404).json({msg:`Categoria ${categoryName} não encontrada`})
                }
                categoryIds.push(category._id);
            }
        }

        //Editar produto
        const editProduct = await Product.findByIdAndUpdate(
            id,
            {name,description, amount, price, categories: categoryIds},
            {new: true}
        )
        if(!editProduct){
            res.status(404).json({msg:'Produto não encontrado!'})
        }
        res.status(200).json({msg:'Produto editado com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao editar produto!'})
    }
})

//////////////////////////////////////////////////////////////////////////////////
//ATUALIZAR PRODUTO

router.patch('/update/:id', async(req, res) =>{
    const {id} = req.params
    const {name,description, amount, price, categories} = req.body

    try{

        //Validar se foi adicionado categoria e se existe
        //Se não for adicionado, usar categoria ja existente
        const existingProduct = await Product.findById(id)

        let categoryIds = existingProduct.categories

        if(categories && categories.length > 0){
            categoryIds = []
            for (const categoryName of categories){
                const category = await Category.findOne({name:categoryName})
                if(!category){
                    return res.status(404).json({msg:`Categoria ${categoryName} não encontrada`})
                }
                categoryIds.push(category._id)
            }
        }

        //Atualizar produto
        const updateProduct = await Product.findByIdAndUpdate(
            id,
            {name,description, amount, price, categories: categoryIds},
            {new: true}
        )
        if(!updateProduct){
            res.status(404).json({msg:'Produto não encontrado!'})
        }
        res.status(200).json({msg:'Produto atualizado com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao atualizar produto!'})
    }
})

//////////////////////////////////////////////////////////////////////////////////
//BUSCAR TODOS OS PRODUTOS

router.get('/', async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).json({products})
    }catch(error){
        res.status(500).json({msg:'Erro ao buscar produtos'})
    }
})

//////////////////////////////////////////////////////////////////////////////////
//BUSCAR PRODUTO POR ID

router.get('/:id', async (req, res) => {
    const{id} = req.params

    try{
        const product = await Product.findById(id)

        if(!product){
            return req.status(404).json({msg:'Produto não encontrado!'})
        }

        res.status(200).json({product})
    }catch(error){
        res.status(500).json({msg:'Erro ao buscar produto'})
    }
})

//////////////////////////////////////////////////////////////////////////////////
// BUSCAR PRODUTOS POR CATEGORIA

router.get('/by-category/:categoryName', async (req, res) => {
    const { categoryName } = req.params;

    try {
        // Encontrar a categoria pelo nome
        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({ msg: `Categoria "${categoryName}" não encontrada!` });
        }

        // Buscar produtos associados a categoria
        const products = await Product.find({ categories: category._id });

        if (products.length === 0) {
            return res.status(404).json({ msg: `Nenhum produto encontrado para a categoria "${categoryName}"!` });
        }

        res.status(200).json({ msg: 'Produtos encontrados:', products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao buscar produtos pela categoria.', error });
    }
});

//////////////////////////////////////////////////////////////////////////////////
//DELETAR PRODUTO

router.delete('/delete/:id', checkToken, async (req, res) => {
    const {id} = req.params

    try{
        const deleteProduct = await Product.findByIdAndDelete(id)

        if(!deleteProduct){
            res.status(404).json({msg:'Produto não encontrado!'})
        }

        res.status(200).json({msg:'Produto deletado com sucesso!'})
    }catch(error){
        res.status(500).json({msg:'Erro ao deletar produto!'})
    }
})


module.exports = app => app.use('/products', router)
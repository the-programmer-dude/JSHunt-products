const mongoose = require('mongoose')
const requireDir = require('require-dir')

requireDir('../models/')
const Product = mongoose.model('product')

exports.create = async (req, res) => {
    const { title, description, url } = req.body
    if(!title || !description || !url) return res.status(400).json({ status: 400, message: 'Bad Request' })
    
    const newProd = await Product.create(req.body)
    return res.json(newProd)
} 
exports.index = async (req, res) => {
    let { page = 1 } = req.query
    if(typeof page === 'string') page = Math.floor(page)
    let prods = await Product.paginate({}, { page, limit: 10 })

    return res.json(prods)
} 
exports.delete = async (req, res) => {
    try{
        const element = await Product.findByIdAndRemove(req.params.id)

        return res.send()
    }catch(err){
        return res.status(404).json({ message: 'ID not found' })
    }
}

exports.show = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)

        return res.json(product)
    }catch(err){
        return res.status(404).json({ message: 'ID not found' })
    }
}

exports.update = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        return res.status(201).json(product)
    }catch(err){
        return res.status(404).json({ message: 'ID not found' })
    }
}
exports.deleteAll = async (req, res) => {
    const { password } = req.body
    if(!password) return res.status(400).json({ message: 'Bad request, your need to pass a password in the body' })

    if(password !== 'SENHA_AEEEE_MDS_N_AGUENTO') { 
        return res.status(403).json({ message: 'Access denied' }) 
    }else{
        await Product.deleteMany({})

        return res.status(204).json({})
    }
}
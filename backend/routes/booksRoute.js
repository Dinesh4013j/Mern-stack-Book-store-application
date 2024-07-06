import express from 'express';
const router =express.Router();

import { Book } from '../models/bookModels.js';
router.get('/',async(request,response)=>{
    try{
        const book=await Book.find({})
        return response.status(201).send(book)
    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})
router.post('/',async(request,response)=>{
    try{
        if(
            !request.body.title || 
            !request.body.author ||
            !request.body.publishYear

        ){
            return response.status(400).send(
                {
                    message:'send all required fields:title,author,publishYear' 
                }
            );
        }
        const newBook ={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book=await Book.create(newBook);
        return response.status(201).send(book);
    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message});
    }

});

router.get('/:id',async(request,response)=>{
    try{
        const {id}=request.params;
        const book=await Book.findById(id);
        return response.status(200).json(book);
    }catch(error){
        console.log(error.message)
        response.status(500).send({message:"book not found "})
    }
})

router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.title || 
        !request.body.author ||
        !request.body.publishYear
        ){
            return response.status(400).send({
                message:'send all required fields of title, author, publishyear'
            })
        }
        const {id}=request.params;
        const result=await Book.findByIdAndUpdate(id,request.body)
        if(!result){
            return response.status(400).json({message:'book not found'})
        }
        return response.status(200).send({message:'book updated successfully'})
        
    }  
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

router.delete('/:id',async(request,response)=>{
    const {id}=request.params;
    const result=await Book.findByIdAndDelete(id);
    if(!result){
        return response.status(400).json({message:'book not found'})
    }
    return response.status(200).send({emssage:"book deleted successfully"})

})

export default router;
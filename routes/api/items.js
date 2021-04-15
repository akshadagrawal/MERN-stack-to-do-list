const express= require('express');
const router= express.Router();
const auth = require('../../middleware/auth');

//Item model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public

router.get('/', (req,res)=>{
    Item.find()
    .sort({date: -1})
    .then((items)=>res.json(items));
})

// @route   POST api/items
// @desc    Create a items
// @access  Private

router.post('/',auth, (req,res)=>{
    const newItem= new Item({
        name: req.body.name, //body parser helps with that
    });

    newItem.save()
    .then(item=> res.json(item));
})

// @route   DELETE api/items/id
// @desc    DELETE  a item
// @access  Private

router.delete('/:id', auth, (req,res)=>{
   Item.findById(req.params.id)
   .then(item=>Item.deleteOne(item).then(()=> res.json({success: true})))
   .catch(err=>res.status(404).json({success:false}))
})


module.exports= router;
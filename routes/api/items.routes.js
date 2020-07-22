const express = require('express'),
      router = express.Router(),
      Item = require('../../models/item.model');

router.get('/', (req, res) => {
    Item.find({}, (err, items)=>{
        res.json(items)
    })
    // Item.find()
    //     .sort({date: -1})
    //     .then(items => res.json(items))
})
router.post('/', (req, res) => {
    // const item = req.body.name;
    // Item.create(item, (err, newItem) => {
    //     if(err) {
    //         console.log(err)
    //     }
    //     else {
    //         console.log(newItem)
    //         res.redirect('/')
    //     }
    // })
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => res.json(item))
})
router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})

module.exports = router;
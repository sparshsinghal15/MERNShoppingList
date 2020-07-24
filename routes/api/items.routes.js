const express = require('express'),
	router = express.Router(),
	auth = require('../../middleware/auth'),
	Item = require('../../models/item.model');

router.get('/', (req, res) => {
	// Item.find({}, (err, items) => {
	// 	res.json(items);
	// });
	Item.find().sort({ date: -1 }).then((items) => res.json(items));
});
router.post('/', auth, (req, res) => {
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
	});

	newItem.save().then((item) => res.json(item));
});
router.delete('/:id', auth, (req, res) => {
	// Item.findByIdAndDelete(req.params.id, (err) => {
	//     if (err) {
	//         console.log(err)
	//     }
	//     else {
	//         res.redirect('/')
	//     }
	// })
	try {
		const item = Item.findById(req.params.id);
		if (!item) throw Error('No item found');

		const removed = item.remove();
		if (!removed) throw Error('Something went wrong while trying to delete the item');

		res.status(200).json({ success: true });
	} catch (e) {
		res.status(400).json({ msg: e.message, success: false });
	}
});

module.exports = router;

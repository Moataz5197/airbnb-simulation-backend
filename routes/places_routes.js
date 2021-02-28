const placesControllers=require('../controllers/places_controllers');
const express= require('express');
const router=express.Router();


router.get('/',placesControllers.all);


router.get('/:id',placesControllers.spec);

router.post('/add',placesControllers.add);

router.put('/edit/:id',placesControllers.edit);

router.delete('/delete/:id',placesControllers.delete);

module.exports=router;


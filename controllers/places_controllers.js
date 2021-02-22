const Places=require('../models/Places');

module.exports={

    all(req,res,next){
        const limit = parseInt(req.query.limit) || '';
        Places.find({}).limit(limit)
        .then(places => res.status(200).send(places))
        .catch(next);
    },

    async spec(req,res){
       try{
        const place = await Places.findById(req.params.id);
        res.status(200).json(place);
       }
       catch (e) {
        res.send({ message: "This place couldn't be found" });
      }
    },

    async add(req,res,next){
        const {
          place_type,
          space_allowed,
          num_guests,
          total_bedrooms,
          total_bathrooms,
          num_beds,
          title,
          summary,
          address,
          amenities,
          images,
          price_per_night,
          cancellation_option
        } = req.body;
        // console.log(req.body);

        try {
          let place = await Places.findOne(
            {place_type,space_allowed,num_guests,total_bedrooms,total_bathrooms,num_beds,
              title,summary,address,amenities,images,price_per_night,cancellation_option});
          if (place) {
              return res.status(400).json({
                  msg: "Place Already Exists"
              });
          }
          place = new Places({
            place_type,
            space_allowed,
            num_guests,
            total_bedrooms,
            total_bathrooms,
            num_beds,
            title,
            summary,
            address,
            amenities,
            images,
            price_per_night,
            cancellation_option
          });

          // console.log(place);
          await place.save();
          req.placeId=place["_id"]
          next();
        //   res.status(200).json(
        //     place
        // );
          } 
          catch (err){
            // console.log(err.message);
            res.status(500).send("Error in Saving");
          }
    },

     edit(req,res,next){
      Places.findByIdAndUpdate({_id: req.params.id},req.body)
      .then(() => res.status(200).send('Place edited'))
      .catch(next);
    },

    delete(req,res,next){
      Places.findByIdAndDelete({_id: req.params.id})
      .then(() => res.status(200).send('Place deleted'))
      .catch(next);
    }

}
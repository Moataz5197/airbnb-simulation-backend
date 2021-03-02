const Places=require('../models/Places');

module.exports={

    all(req,res){
        let limit , skip , city = '' ;
        
        if(req.query.limit){
        const query = req.query.limit.split("?");
          console.log(query.length,query[0]);
         if (query.length >= 1 )limit = parseInt(query[0]) || '';
         if (query.length >= 2 )skip =  parseInt(query[1].split('=')[1]) || '';
         if (query.length == 3 )city =  query[2].split('=')[1] || '';
        }
        console.log(limit,skip,city);
        if(limit !== undefined && skip  !== undefined){
          Places.find({}).skip(skip).limit(limit)
          .then(places => res.status(200).send(places))
          .catch(console.error);
        }
        if(city!==''){
          Places.find({'address.city':city})
          .then(places => res.status(200).send(places))
          .catch(console.error);
        }
        if(city === ''&& limit === undefined && skip === undefined){
          Places.find({})
          .then(places => res.status(200).send(places))
          .catch(console.error);
        }
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
      const userId = req.user.id;
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
      
        try {
          let place = await Places.findOne({
            user_id: userId,
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
            cancellation_option,
          });
          if (place) {
              return res.status(400).json({
                  msg: "Place Already Exists"
              });
          }
          place = new Places({
            place_type,
            user_id: userId,
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
            cancellation_option,
          });

          await place.save();
          console.log(place);

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
const Hosts = require("../models/host");
const {
    add: addPlace
} = require("../controllers/places_controllers");
const Places = require("../models/Places");
module.exports = {

    spec(req, res, next) {
        const userId = req.user.id;
        Hosts.findOne({
                user_id: userId
            })
            .then((hosts) => {
                let hostingIds = hosts["listings"]
                res.status(200).send(hostingIds)
            })
            .catch(next);
    },

    all(req, res, next) {
        Hosts.find({})
            .then((hosts) => {
                res.status(200).json(hosts)
            })
            .catch(next);
    },

    async add(req, res, next) {
        try {            
            placeId=req.placeId
            const userId = req.user.id;
            hosts = await Hosts.findOne({
                user_id: userId
            })

            if (hosts) {
                hosts["listings"]["place_ids"].push({
                    place_id: placeId,
                    start_date: new Date(),
                    end_date: new Date()
                })
            
                await Hosts.findByIdAndUpdate({
                    _id: hosts["_id"]
                }, hosts)
                res.status(200).send(hosts);
            } 
            else {
                console.log("hosts not exist")
                host = new Hosts({
                    user_id: userId,
                    listings: {
                        place_ids: [{
                            place_id: placeId,
                            start_date: new Date(),
                            end_date: new Date()
                        }],
                        experience_ids: []
                    }
                })
                await host.save();
                res.status(200).send(host);
            }
        } catch (err) {
            console.log(err)
        }
    },



    delete(req, res, next) {
        const userId = req.user.id;
        const placeId = req.params.id;
        Hosts.findOne({
                user_id: userId
            })
            .then((hosts) => {
                for (let index = 0; index < hosts["listings"]["place_ids"].length; index++) {
                    let palce = hosts["listings"]["place_ids"][index]["place_id"]
                    if (palce == placeId) {
                        hosts["listings"]["place_ids"].splice(index, 1)
                        console.log("deleted")
                        break;
                    }
                }
                Hosts.findByIdAndUpdate({
                    _id: hosts["_id"]
                }, hosts).then(() => {
                next();
                })
            })
            .catch(next);
    },
    
    deleteFromAdmin(req, res, next) {
        // const userId = req.user.id;
        const placeId = req.params.id;
        Places.findOne({
            _id: placeId

        })
        .then((place)=>{
           Hosts.findOne({
                   user_id: place.user_id
               })
               .then((hosts) => {
                   for (let index = 0; index < hosts["listings"]["place_ids"].length; index++) {
                       let palce = hosts["listings"]["place_ids"][index]["place_id"]
                       if (palce == placeId) {
                           hosts["listings"]["place_ids"].splice(index, 1)
                           console.log("deleted")
                           break;
                       }
                   }
                   Hosts.findByIdAndUpdate({
                       _id: hosts["_id"]
                   }, hosts).then(() => {
                   next();
                   })
               })
        })
            .catch(next);
    }
};
const Hosts = require("../models/host");
module.exports={

all(req,res,next){
    const userId = req.user.id;
    Hosts.findOne({user_id:userId})
    .then((hosts) =>{
        let hostingIds = hosts["listing"]
        res.status(200).send(hostingIds)
    })
    .catch(next);
},
add(req,res,next){

},
delete(req,res,next){
    const userId = req.user.id;
    const placeId = req.params.id;
    Hosts.findOne({user_id:userId})
    .then((hosts) =>{
        for (let index = 0; index < hosts["listing"]["place_ids"].length; index++) {
            let palce = hosts["listing"]["place_ids"][index]["place_id"]
            if (palce==placeId) {
                hosts["listing"]["place_ids"].splice(index,1)
                console.log("deleted")
                break;
            }
        }
    Hosts.findByIdAndUpdate({_id:hosts["_id"]},hosts).then(()=>{
        res.status(204).json({ message: "Deleted Successfully" })
    })
    })
    .catch(next);
}

};
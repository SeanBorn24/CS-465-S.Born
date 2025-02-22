const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

//GET: /trips -list all the trips
//Reguardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) //no filter, return all records
        .exec();

        //un comment the following to show results of query 
        //on the console
        //console.log(q);

        if(!q)
        { //database returned no data
            return res  
                    .status(404)
                    .json(err);
        } else {//return resulting trip list
            return res
                .status(200)
                .json(q);
        }

};

//GET:/trips/:tripCode -lists a single trip
//reguardless of outcome response must include HTML status code
//and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) //return a single record
        .exec();

        //uncomment the following line to show results of querey
        //on the console
        //console.log(q);

    if(!q)
    {//database returned no data
        return res
                .status(404)
                .json(err);
    } else { //return resulting trip list
        return res
            .status(200)
            .json(q);
        }
};


module.exports = {
    tripsList,
    tripsFindByCode
};
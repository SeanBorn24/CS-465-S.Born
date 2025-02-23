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


//POST: /trips - Adds a new trip
//reguardless of outcome, response must include html status code
//and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q)
        { //database retuened no data
            return res
                .status(400)
                .json(err);
        } else {//return new trip
            return res
                .status(201)
                .json(q);
        }

        //uncomment the following line to show results results of operation 
        //on the console
        //console.log(q);
};

//PUT: /trips/:tripCode -Adds a new 
//reguardless of outcome response must include HTML status code
//and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {

    //uncomment for debugging
    //console.log(req.params);
    //console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            {'code': req.params.tripCode},
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if(!q)
            { //database retuened no data
                return res
                    .status(400)
                    .json(err);
            } else {//return resulting updated trip
                return res
                    .status(201)
                    .json(q);
            }

            //uncomment the following line to show results of operation 
            //on console
            //console.log(q);
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
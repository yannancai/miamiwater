
const Spot = require('../models/spot');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
//const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: "pk.eyJ1IjoieWFubmFuY2FpIiwiYSI6ImNsMmM0djF2dDAwcTAzZHA2eWRmbG90ODkifQ.yo5Vb2ZO16B-TTHm_fsb_w" })

//render index page
module.exports.index = async (req, res) => {
    const { activity } = req.query;
    if (activity) {
        const spots = await Spot.find({ activity });
        //console.log(spots)
        res.render('spots/index', { spots, activity })
    }
    else {
        const spots = await Spot.find({});
        //console.log(spots)
        res.render('spots/index', { spots, activity: 'Watersports' })
    }
}

//render new spot submission
module.exports.renderNewForm = (req, res) => {
    res.render('spots/new');
}

module.exports.createSpot = async (req, res) => {
    //console.log(req.body);
    const geoData = await geocoder.forwardGeocode({
        query: req.body.name,
        limit: 1
    })
        .send()

    const newspot = new Spot(req.body);
    newspot.geometry = geoData.body.features[0].geometry;
    newspot.author = req.user._id;
    await newspot.save();
    console.log(newspot);
    req.flash('success', 'Successfully uploaded a new spot!');
    res.redirect(`/spots/${newspot._id}`)
}

//render individual spot
module.exports.showSpot = async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findById(id).populate({
        //a nested population first for review and review's author
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author'); //outsider population for spot's author
    if (!spot) {
        req.flash('error', 'cannot find the spot');
        return res.redirect('/spots');
    }
    res.render('spots/individual', { spot })
}

//eidt exiting spot
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findById(id);
    if (!spot) {
        req.flash('error', 'cannot find the spot');
        return res.redirect('/spots');
    }
    res.render('spots/edit', { spot })
}

module.exports.updateSpot = async (req, res) => { //this needs to use method override
    const { id } = req.params;
    const geoData = await geocoder.forwardGeocode({
        query: req.body.name,
        limit: 1
    })
        .send()
    const updatedspot = await Spot.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    updatedspot.geometry = geoData.body.features[0].geometry;
    await updatedspot.save();
    console.log(updatedspot);
    req.flash('success', 'Successfully updated the spot!');
    res.redirect(`/spots/${updatedspot._id}`)
}

//delete individual page
module.exports.deleteSpot = async (req, res) => {
    const { id } = req.params;
    await Spot.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the spot');
    res.redirect('/spots');
}
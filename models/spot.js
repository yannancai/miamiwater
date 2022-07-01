const mongoose = require('mongoose')
const Review = require('./review')
const Schema = mongoose.Schema;


const spotSchema = new Schema({
    name: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: {
        type: Number,
        enum: [0, 1, 2, 3]
    },
    activity: {
        type: String,
        lowercase: true,
    },
    image: String,
    description: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

spotSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})


const spot = mongoose.model('spot', spotSchema)

module.exports = spot
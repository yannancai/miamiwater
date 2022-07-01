//connect with mongoose
const mongoose = require('mongoose');

const Spot = require('../models/spot')

mongoose.connect('mongodb://localhost:27017/waterSportsSpots')
    .then(() => {
        console.log('Mongo connected')
    })
    .catch(err => {
        console.log('mongo not conencted');
        console.log(err)
    })

const seedspots = [
    {
        name: 'South Pointe',
        location: 'Miami',
        author: '625a16a0ad4126914bd38da9',
        price: 0,
        activity: 'Snorkeling',
        image: 'https://golatinos.net/wp-content/uploads/2019/01/Pelican-Island-New-day-docks-photo2.jpg',
        description: 'sdkfjslak skjfksdfalkdfjks skdjfsjalskfjksd'

    },
    {
        name: 'Pelican Island',
        location: 'Miami',
        author: '625a16a0ad4126914bd38da9',
        price: 1,
        activity: 'paddle boarding',
        image: 'https://golatinos.net/wp-content/uploads/2019/01/Pelican-Island-New-day-docks-photo2.jpg',
        description: 'sdkfjslak skjfksdfalkdfjks skdjfsjalskfjksd'

    },
    {
        name: 'Oleta River',
        location: 'Miami',
        author: '625a16a0ad4126914bd38da9',
        price: 2,
        activity: 'kayaking',
        image: 'https://golatinos.net/wp-content/uploads/2019/01/Pelican-Island-New-day-docks-photo2.jpg',
        description: 'sdkfjslak skjfksdfalkdfjks skdjfsjalskfjksd'
    },
    {
        name: 'Haulover beach',
        location: 'Miami',
        author: '625a16a0ad4126914bd38da9',
        price: 0,
        activity: 'beach day',
        image: 'https://golatinos.net/wp-content/uploads/2019/01/Pelican-Island-New-day-docks-photo2.jpg',
        description: 'sdkfjslak skjfksdfalkdfjks skdjfsjalskfjksd'
    }
]


const seedDB = async () => {
    await Spot.deleteMany({});
    Spot.insertMany(seedspots)
        .then(res => {
            console.log(Spot)
        })
        .catch(err => {
            console.log(err)
        })
}
seedDB();



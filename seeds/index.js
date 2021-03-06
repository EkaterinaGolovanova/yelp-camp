const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities.js');
const { descriptors, places } = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("Database connected");
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6194993099f9d21038175dc2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dkff3rol1/image/upload/v1640058213/YelpCamp/newhikkyzdo9oxzbljt2.jpg',
                  filename: 'YelpCamp/newhikkyzdo9oxzbljt2',
                },
                {
                  url: 'https://res.cloudinary.com/dkff3rol1/image/upload/v1640058214/YelpCamp/sztgkssvq7alvpywp14a.jpg',
                  filename: 'YelpCamp/sztgkssvq7alvpywp14a',
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates harum non dolorem atque, cumque delectus nihil facere eaque alias officia amet architecto neque consequuntur totam? Ad vitae asperiores mollitia sed?",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
    await camp.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})
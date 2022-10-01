const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log('database is connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '62d98047ca50492cc5226a05',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dg0qfmgrn/image/upload/v1658837472/YelpCamp/minzmkcgpymt6jul7sdt.jpg',
                    filename: 'YelpCamp/minzmkcgpymt6jul7sdt'
                },
                {
                    url: 'https://res.cloudinary.com/dg0qfmgrn/image/upload/v1658830627/YelpCamp/munzbiwy0onjqd2oa0vq.png',
                    filename: 'YelpCamp/munzbiwy0onjqd2oa0vq'
                }
            ]
        });

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
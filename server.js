const express = require('express');

const app = express();

const restaurants = require('./default_restaurants');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/rr");

var Schema = mongoose.Schema;
var restaurantSchema = new Schema({
    restaurant: {
        name: String
    }
});
var Restaurant = mongoose.model('Restaurant', restaurantSchema);
Restaurant.find({ 'restaurant.name': 'Pizza Di Rocco' }, function (err, restaurant) {
    console.log('err', err);
    console.log('restaurant', restaurant);
});

//var rest = new Restaurant({ 'restaurant.name': "Troy's Super Deli" });
//rest.save();


/*
{
	"_id" : ObjectId("580e6925e32d58af64571f7b"),
	"restaurant" : {
		"R" : {
			"res_id" : 5701978
		},
		"apikey" : "39075b374a5c0d9ee98fcc8e52d0a07c",
		"id" : "5701978",
		"name" : "Pizza Di Rocco",
		"url" : "https://www.zomato.com/abudhabi/pizza-di-rocco-al-dhafrah?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
		"location" : {
			"address" : "Near Corner of Salam and Al Falah Street (9th Street), Salam Street, Al Dhafrah, Abu Dhabi",
			"locality" : "Al Dhafrah",
			"city" : "Abu Dhabi",
			"city_id" : 57,
			"latitude" : "24.4852540000",
			"longitude" : "54.3821740000",
			"zipcode" : "",
			"country_id" : 214
		},
		"cuisines" : "Italian, Pizza",
		"average_cost_for_two" : 150,
		"price_range" : 3,
		"currency" : "AED",
		"offers" : [ ],
		"thumb" : "https://b.zmtcdn.com/data/pictures/8/5701978/70c5c8c2688faedeb2ecd3b0f1c5dc55_featured_v2.jpg",
		"user_rating" : {
			"aggregate_rating" : "4.3",
			"rating_text" : "Very Good",
			"rating_color" : "5BA829",
			"votes" : "417"
		},
		"photos_url" : "https://www.zomato.com/abudhabi/pizza-di-rocco-al-dhafrah/photos#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
		"menu_url" : "https://www.zomato.com/abudhabi/pizza-di-rocco-al-dhafrah/menu#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
		"featured_image" : "https://b.zmtcdn.com/data/pictures/8/5701978/70c5c8c2688faedeb2ecd3b0f1c5dc55.jpg",
		"has_online_delivery" : 1,
		"is_delivering_now" : 1,
		"deeplink" : "zomato://restaurant/5701978",
		"order_url" : "https://www.zomato.com/abudhabi/pizza-di-rocco-al-dhafrah/order?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
		"order_deeplink" : "",
		"has_table_booking" : 0,
		"events_url" : "https://www.zomato.com/abudhabi/pizza-di-rocco-al-dhafrah/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
		"establishment_types" : [ ]
	}
}
*/

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/public/css`));
app.use(express.static(`${__dirname}/public/js`));

//const db = mongoose.connect('mongodb://127.0.0.1:27017/restaurant_rater');


    /*
    console.log('errrrrrrrrrrrrr', err);
    console.log('dbbbbbbbbbbbbbb', db);
  if(err) {
    return console.dir(err);
  }

  var collection = db.collection('restaurants');

  collection.find().toArray(function(err, kittens) {
        console.log(kittens)
    });
});
*/


app.get('/', (req, res) => {
  if (res.statusCode === 200) {
    res.render('restaurant_page',
    { tgi_pic: restaurants[0].picture,
      tgi: restaurants[0].name,
      tgi_address: restaurants[0].address,
      tgi_neighbourhood: restaurants[0].neighbourhood,
      gauchos_pic: restaurants[1].picture,
      gauchos: restaurants[1].name,
      gauchos_address: restaurants[1].address,
      gauchos_neighbourhood: restaurants[1].neighbourhood,
      sushi_samba_pic: restaurants[2].picture,
      sushi_samba: restaurants[2].name,
      sushi_samba_address: restaurants[2].address,
      sushi_samba_neighbourhood: restaurants[2].neighbourhood,
    });
  }
});

app.get('/search', (req, res) => {
  if (res.statusCode === 200) {
    res.render('search');
  }
});

app.get('/search/:query', (req, res) => {
  if (res.statusCode === 200) {
    let userInput = req.params.query
    var restaurantResults = retrieveWords(londonRestaurants, userInput);
    res.end(JSON.stringify(restaurantResults));
  }
});

app.listen(8080);

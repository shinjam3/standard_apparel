const MongoClient = require('mongodb').MongoClient;
const config = require('config');

let url = config.get('db');
if(!url.includes('&w=majority')) {
	url = url + '&w=majority';
};

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
	if (err) throw err;
	
	// Replace "your_db" with the name of your database. Make sure the name is a string.
	// If you are using an Atlas cloud database, make sure to use your database name, not the name of your cluster (unless they are the same).
	const dbo = db.db("your_db");
	
	const catalogItems = [
	  {
		category: 'tops',
		title: 'Blue Denim Dress',
		price: 29.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomentop1.jpg',
		'new': 0,
		section: 'women',
		id: 1
	  },
	  {
		category: 'tops',
		title: 'Blue Collar Shirt',
		price: 19.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomentop2.jpg',
		'new': 0,
		section: 'women',
		id: 2
	  },
	  {
		category: 'tops',
		title: 'Black Suit Jacket',
		price: 179.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomentop3.jpg',
		'new': 1,
		section: 'women',
		id: 3
	  },
	  {
		category: 'bottoms',
		title: 'Red Chino',
		price: 29.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomenbottom4.jpg',
		'new': 1,
		section: 'women',
		id: 4
	  },
	  {
		category: 'bottoms',
		title: 'Salmon Jogger Pants',
		price: 29.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomenbottom3.jpg',
		'new': 0,
		section: 'women',
		id: 5
	  },
	  {
		category: 'bottoms',
		title: 'Grey Ripped Jean',
		price: 29.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomenbottom2.jpg',
		'new': 0,
		section: 'women',
		id: 6
	  },
	  {
		category: 'bottoms',
		title: 'Blue Denim Shorts',
		price: 19.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomenbottom1.jpg',
		'new': 0,
		section: 'women',
		id: 7
	  },
	  {
		category: 'accessories',
		title: 'Straw Hat',
		price: 19.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomenaccessory3.jpg',
		'new': 0,
		section: 'women',
		id: 8
	  },
	  {
		category: 'accessories',
		title: 'Yellow Beanie',
		price: 9.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomenaccessory2.jpg',
		'new': 1,
		section: 'women',
		id: 9
	  },
	  {
		category: 'accessories',
		title: 'Black Bucket Hat',
		price: 19.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashwomenaccessory1.jpg',
		'new': 0,
		section: 'women',
		id: 10
	  },
	  {
		category: 'tops',
		title: 'Black Leather Jacket',
		price: 79.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmentop4.jpg',
		'new': 1,
		section: 'men',
		id: 11
	  },
	  {
		category: 'tops',
		title: 'Black Suit Jacket',
		price: 199.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmentop3.jpg',
		'new': 0,
		section: 'men',
		id: 12
	  },
	  {
		category: 'tops',
		title: 'Bronze Hoodie',
		price: 39.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmentop2.jpg',
		'new': 1,
		section: 'men',
		id: 13
	  },
	  {
		category: 'tops',
		title: 'White T-Shirt',
		price: 9.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmentop1.jpg',
		'new': 0,
		section: 'men',
		id: 14
	  },
	  {
		category: 'bottoms',
		title: 'Black Jean',
		price: 59.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmenbottom1.jpg',
		'new': 1,
		section: 'men',
		id: 15
	  },
	  {
		category: 'bottoms',
		title: 'Khaki Chino',
		price: 59.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmenbottom2.jpg',
		'new': 0,
		section: 'men',
		id: 16
	  },
	  {
		category: 'bottoms',
		title: 'Slim Blue Jean',
		price: 59.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmenbottom3.jpg',
		'new': 0,
		section: 'men',
		id: 17
	  },
	  {
		category: 'accessories',
		title: 'Cream Sneakers',
		price: 49.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmenaccessory1.jpg',
		'new': 0,
		section: 'men',
		id: 18
	  },
	  {
		category: 'accessories',
		title: 'White Cap',
		price: 14.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmenaccessory2.jpg',
		'new': 0,
		section: 'men',
		id: 19
	  },
	  {
		category: 'accessories',
		title: 'Brown Boots',
		price: 79.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmenaccessory3.jpg',
		'new': 1,
		section: 'men',
		id: 20
	  },
	  {
		category: 'tops',
		title: 'Girls Denim Tutu',
		price: 14.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidstop1.jpg',
		'new': 1,
		section: 'kids',
		id: 21
	  },
	  {
		category: 'tops',
		title: 'Girls Denim Jacket',
		price: 39.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidstop2.jpg',
		'new': 1,
		section: 'kids',
		id: 22
	  },
	  {
		category: 'tops',
		title: 'Girls Colored Skirt',
		price: 9.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidstop3.jpg',
		'new': 0,
		section: 'kids',
		id: 23
	  },
	  {
		category: 'bottoms',
		title: 'Boys Green Chino Shorts',
		price: 14.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidsbottom3.jpg',
		'new': 0,
		section: 'kids',
		id: 24
	  },
	  {
		category: 'bottoms',
		title: 'Girls Pink Joggers',
		price: 19.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidsbottom2.jpg',
		'new': 1,
		section: 'kids',
		id: 25
	  },
	  {
		category: 'bottoms',
		title: 'Boys Ripped Denim Shorts',
		price: 19.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidsbottom1.jpg',
		'new': 0,
		section: 'kids',
		id: 26
	  },
	  {
		category: 'accessories',
		title: 'Striped Bucket Hat',
		price: 14.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidsaccessory3.jpg',
		'new': 0,
		section: 'kids',
		id: 27
	  },
	  {
		category: 'accessories',
		title: 'Circle Sunglasses',
		price: 11.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidsaccessory2.jpg',
		'new': 0,
		section: 'kids',
		id: 28
	  },
	  {
		category: 'accessories',
		title: 'Orange Frame Sunglasses',
		price: 11.99,
		imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashkidsaccessory1.jpg',
		'new': 0,
		section: 'kids',
		id: 29
	  }
	];
	
	dbo.collection("catalog").insertMany(catalogItems, function(err, res) {
		if (err) throw err;
		
		console.log("Number of documents inserted: " + res.insertedCount);
		db.close();
	});
});
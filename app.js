const mysql = require('mysql');
const express = require('express')
const app = express()
const port = 3000
const https = require('https')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "XO52eg?!wb",
  database: "retail"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});




app.get('/', (req, res) => {
	
	con.query('SELECT DISTINCT banner FROM stores', (err,stores) => {
		if(err) throw err;

  		console.log('Data received from Db:');
  		console.log(stores);
  		res.render("home", {renderList: stores});
	});

});

app.get('/', (req, res) => {
	
	con.query('SELECT DISTINCT banner FROM stores', (err,stores) => {
		if(err) throw err;

  		console.log('Data received from Db:');
  		console.log(stores);
  		res.render("home", {renderList: stores});
	});

});


app.get('/banner/:id', (req, res) => {
    let bannerreturn = req.params.id;
    console.log(bannerreturn)
    con.query('SELECT street FROM stores WHERE banner = ' + '"' + bannerreturn + '"' , (err,stores) => {
		if(err) throw err;

  		console.log('Data received from Db:');
  		console.log(stores);
  		res.render("stores", {renderList: stores});
	});    
});

app.get('/banner/store/:id', (req, res) => {
    let storereturn = req.params.id;
    console.log(storereturn)




    con.query('SELECT * FROM stores s LEFT JOIN donation d ON d.ceres_id = s.ceres_id WHERE s.street = ' + '"' + storereturn + '"' + "ORDER BY d.month DESC LIMIT 3", (err,stores) => {
		if(err) throw err;

  		console.log('Data received from Db:');
  		console.log(stores);
  		// res.render("stores", {renderList: stores});
	});
    
    
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})






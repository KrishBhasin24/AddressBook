var express = require('express')
var app = express()
 

app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM addressbook LIMIT 0, 10', function (error, results, fields) {
	      if (error) throw error;
	      res.send(JSON.stringify(results));
	    });
    })
});

app.post('/add', function(req, res, next){   
	
	/*
		{
			"fname": "Joe",
			"lname": "Deo",
			"email": "deo@gmail.com",
			"phone": 4378842124
		}
	*/

	var user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone
	}
     req.getConnection(function(error, conn) {
            conn.query('INSERT INTO addressbook SET ?', user, function(err, result) {
            	if (err) {
            		res.send(err);
            	}
        		else{
        			res.send(JSON.stringify("One user Added"));
        		}
        	});
        });
 });


app.get('/view/(:id)', function(req, res, next){
	 req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM addressbook WHERE id = ' + req.params.id, function(err, rows, fields) {
       		res.send(JSON.stringify(rows[0]));
        });
    });
});


app.put('/edit/(:id)', function(req, res, next) {
    console.log(req.body);
	var user = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone
	}
	req.getConnection(function(error, conn) {
        conn.query('UPDATE addressbook SET ? WHERE id = ' + req.params.id, user, function(err, result)
        {
        	if (err) {
            		res.send(JSON.stringify(err));
            	}
    		else{
    				res.send(JSON.stringify("record updated"));
				}
        });
    });
});


app.delete('/delete/(:id)', function(req, res, next) {
	req.getConnection(function(error, conn) {
        conn.query('DELETE FROM addressbook WHERE id = ?',  req.params.id, function(err, result) {
        	if (err) {
               res.send(err);
            } else {
            	res.send(JSON.stringify("Deleted"));
            }
        });
    });
});



module.exports = app;
var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all foods in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all foods
    app.get('/api/food', function (req, res) {
        // use mongoose to get all foods in the database
        getFoods(res);
    });

    // create food and send back all foods after creation
    app.post('/api/food', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        Food.create({
            food_name: req.body.food_name,
            price: req.body.price
//            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getFoods(res);
        });

    });

    // delete a food
    app.delete('/api/food/:food_name', function (req, res) {
        Food.remove({
            food_name: req.params.food_name
        }, function (err, food) {
            if (err)
                res.send(err);
            //console.log('food_name-'+ req.params.food_name);
            getFoods(res);
        });
    });

    // get sum of food prices
    app.get('/api/total', function (req, res) {
           Food.aggregate(
            [
                {
                    $group:{
                        _id: 'subtotal',
                        total: {
                        $sum : "$price"
                        }
                    }
                }
            ],
                function(err,results){
                if(err){
                    console.log(err);
                }
                else if(results.length > 0){
                    var temp = results[0].total;
                    var taxed_total = temp + (temp*0.075);
                }
                else{
                    var taxed_total = 0;    
                }    
                res.json(taxed_total);        
            });        
    });
    
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/food', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
        
    });

    // create todo and send back all todos after creation
    app.post('/api/food', function (req, res) {

        console.log('food - ' + req.body.food_name);
        console.log('price - ' + req.body.price);
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            food_name: req.body.food_name,
            price: req.body.price
//            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/food/:food_id', function (req, res) {
        Todo.remove({
            _id: req.params.food_name
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // get sum of food prices
    app.get('/api/total', function (req, res) {
           Todo.aggregate(
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
                    return;
                }
                var temp = results[0].total;
                var taxed_total = temp + (temp*0.075);
                res.json(taxed_total);        
            });        
    });
    
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
        
    
};
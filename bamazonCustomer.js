var mysql = require("mysql");
var inquirer = require("inquirer");

// createConnection is a method in the mysql package

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// method "connect" has a callback function, 
// threadId is given out by the connection
// query has to be within the connect function because Node is asynchronous
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  connection.query('SELECT * FROM songs', function(err, result) {
    if (err) throw err;
    console.log(result);
    // console.log(result.genre);
  });
  displayProducts();
});

function displayProducts() {
    console.log("Displaying all products in stock...\n");
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(result);
//        connection.end();
        orderProducts();
    });
};

function orderProducts() {
  

  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        name: "ProductID",
        message: "Enter the ID of the product you want to buy:",
      },
      {
        type: "list",
        name: "ProductQuantity",
        message: "Enter the number of units:",
      }  
    ])
    .then(function(inquirerResponse) {
        console.log("If no error from the initial inquirer prompt, then you see this statement.");
  
        var query = connection.query('SELECT * FROM products', function(err, result) {
            if (err) throw err;
            console.log(result);
        });

        
              
      if (inquirerResponse.ProductQuantity > query.products.stock_quantity) {
        console.log("Insufficient quantity of products in stock, try again.");
        orderProducts();
      } else {
        // update database with remaining quantity
        updateProducts();

        // display the total cost of the purchase
        totalProducts();
      }
  
    })
    .catch(function(err){
      console.log(err);
    });

    connection.end();
}



function updateProducts() {
    var query = connection.query(
        'UPDATE products SET ? WHERE ?',
        [
            {
                genre: 'Alt Rock'
            }, {
                artist: 'Pearl Jam'
            }
        ], function(err, result) {
            console.log(result.affectedRows + ' songs updated!\n');
            deleteSong();
        }
    );
};


/// --------------------------------
function createSong() {
    var query = connection.query(
        'INSERT INTO songs SET ?',
        {
            title: 'Hot For Teacher',
            genre: 'Grunge',
            artist: 'Van Halen'
        },
        function(err, result) {
            console.log(result.affectedRows + ' songs inserted\n');
            updateSong();
        }
    );
};

function updateSong() {
    var query = connection.query(
        'UPDATE songs SET ? WHERE ?',
        [
            {
                genre: 'Alt Rock'
            }, {
                artist: 'Pearl Jam'
            }
        ], function(err, result) {
            console.log(result.affectedRows + ' songs updated!\n');
            deleteSong();
        }
    );
};

function deleteSong() {
    var query = connection.query(
        'DELETE FROM songs WHERE ?',
        {
            genre: 'Grunge'
        }, function(err, result) {
            console.log(result.affectedRows + ' songs deleted!\n');
            readSong()
        }
    );
};

function readSong() {
    console.log("Selecting all songs...\n");
    connection.query("SELECT * FROM songs", function(err, result) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(result);
        connection.end();
    });
}
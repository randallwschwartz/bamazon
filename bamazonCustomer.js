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

//   connection.query('SELECT * FROM products', function(err, result) {
//     if (err) throw err;
//     console.log(result);
//   });

    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;
        console.log('=================================================');
        console.log('=================Items in Store==================');
        console.log('=================================================');

        for(i=0;i<res.length;i++){
            console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')')
        }
        console.log('=================================================');
    });

  orderProducts();
});


function orderProducts() {  
    inquirer
        .prompt([
        // Here we create a basic text prompt.
        {
            type: "input",
            name: "productID",
            message: "Enter the ID of the product you want to buy:",
        },
        {
            type: "input",
            name: "productQuantity",
            message: "Enter the number of units:",
        }  
        ])
    .then(function(answer) {
        console.log("If no error from the initial inquirer prompt, then you see this statement.");

        // var query = connection.query('SELECT * FROM products', function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        // });

        var reqID = answer.productID;
        var reqQuantity = answer.productQuantity;
        
        purchaseProducts(reqID, reqQuantity);
    });
};

function purchaseProducts(ID, quantity) {
    connection.query('SELECT * FROM products WHERE item_id = ?', [ID], function(err, result) {
        if (err) throw err;

        var index = ID-1; 
                
        // console.log(result);
        console.log(result[0]);
        console.log(result[0].stock_quantity);
        console.log(quantity);

        if (quantity <= result[0].stock_quantity) {
            // update database with remaining quantity

            var updated_quantity = result[0].stock_quantity - quantity; 
            console.log(updated_quantity);

            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                {
                    stock_quantity: updated_quantity
                },
                {
                    item_id: ID
                }
                ],
                function(error) {
                    // if (error) throw err;
                    console.log("Updated quantity in stock");
                }
            );

            var total_cost = quantity * result[0].price;
            console.log("Total cost of your puchase is: $" + total_cost +".");


        } else {
            console.log("Insufficient quantity of products in stock, try again.");
            orderProducts();

        }

    });
    // .catch(function(err){
    // console.log(err);
    // });

    connection.end();
   
}

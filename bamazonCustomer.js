var mySql = require("mysql");

var connect = mySql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "admin",
	database: "bamazon"
});

connect.connect(function(err){
	if (err) throw err;
	//console.log("connected as " + connect.threadId);
	selectAll();
});

console.log("WELCOME TO BAMAZON");

function selectAll(){
	var query = connect.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("ID #" + res[i].item_id + " " + res[i].product_name + " " + "$" +res[i].price);
		}

		askCustomer();
	});
}

function askCustomer(){
	var inquirer = require("inquirer");

	inquirer.prompt([
        {
            type: "text",
            name: "action",
            message: "What is the ID of the product you would like to buy?",
            
        }
    ]).then(function(data){
    	console.log("You chose ID #" + data.action);
    	if (data.action === "1"){
			askHowMany(1);
		} else if (data.action === "2"){
			askHowMany(2);
		} else if (data.action === "3"){
			askHowMany(3);
		} else if (data.action === "4"){
			askHowMany(4);
		} else if (data.action === "5"){
			askHowMany(5);
		} else if (data.action === "6"){
			askHowMany(6);
		} else if (data.action === "7"){
			askHowMany(7)
		} else if (data.action === "8"){
			askHowMany(8);
		} else if (data.action === "9"){
			askHowMany(9);
		} else if (data.action === "10"){
			askHowMany(10);
		}

    });
}

function askHowMany(value){
	var inquirer = require("inquirer");

	inquirer.prompt([
        {
            type: "text",
            name: "action",
            message: "how many would you like to buy?",
            
        }
    ]).then(function(data){
    	console.log("You would like " + data.action + " of this product.");
    		var query = connect.query("SELECT stock_quantity FROM products where item_id =" + value,
    		function(err, res){
    			for (i = 0; i < res.length; i++){
    				if (data.action > res[i].stock_quantity){
    					console.log("Insufficient quantity in stock!");
    				} else {
    					var query = connect.query("UPDATE products set stock_quantity = stock_quantity -" + data.action +  " where item_id =" + value, 
						function(err, res){
							if (err) throw err;
							//console.log(res.affectedRows + " item(s) stock has been updated.");
							console.log("order has been placed");
							var query = connect.query("SELECT item_id, SUM(`price` * " + data.action + ") AS total FROM products GROUP BY item_id",
							function (err, res){
								if (err) throw err;
								//console.log(total);
								for(i = 0; i < res.length; i++){
									if (value === 1){
										console.log("your total is $" + res[0].total);
										return;
									} else if (value === 2){
										console.log("your total is $" + res[1].total);
										return;
									} else if (value === 3){
										console.log("your total is $" + res[2].total);
										return;
									} else if (value === 4){
										console.log("your total is $" + res[3].total);
										return;
									} else if (value === 5){
										console.log("your total is $" + res[4].total);
										return;
									} else if (value === 6){
										console.log("your total is $" + res[5].total);
										return;
									} else if (value === 7){
										console.log("your total is $" + res[6].total);
										return;
									} else if (value === 8){
										console.log("your total is $" + res[7].total);
										return;
									} else if (value === 9){
										console.log("your total is $" + res[8].total);
										return;
									} else if (value === 10){
										console.log("your total is $" + res[9].total);
										return;
									}
								} // end of for loop
							}); // end of query function (pricing items)
						}); // end of query function (updating stock quantity)
    				} // end of if else statement
    			} // end of for loop
    		}); // end of query function (selecting stock)
    }); // end of inquirer 'end' function
} // end of askhowmany function



	
	
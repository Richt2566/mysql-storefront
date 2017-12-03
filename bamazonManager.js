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
	
});

var inquirer = require("inquirer");

inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            
        }
    ]).then(function(data){

    	if (data.action === "View Products for Sale"){
    		selectAll();
    	} else if (data.action === "View Low Inventory"){
    		selectLow();
    	} else if (data.action === "Add to Inventory"){
    		addToInventory();
    	} else if (data.action === "Add New Product"){
    		addItemPrompt();
    	}

});

function selectAll(){
	var query = connect.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("ID #" + res[i].item_id + " | " + res[i].product_name + " | " + " Price: $" +res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
		}

	});

}

function selectLow(){
	var query = connect.query("SELECT * FROM products where stock_quantity < 5", function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("ID #" + res[i].item_id + " | " + res[i].product_name + " | " + " Price: $" +res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
		}

	});

}

function addToInventory(){
	var inquirer = require("inquirer");

	inquirer.prompt([
        {
            type: "text",
            name: "action",
            message: "Which item ID would you like to add to?",
            
        }
    ]).then(function(data){
    	if (data.action === "1"){
    		addStock(1);
    	} else if (data.action === "2"){
    		addStock(2);
    	}

	});
}

function addStock(value){
	var inquirer = require("inquirer");

	inquirer.prompt([
        {
            type: "text",
            name: "action",
            message: "How many items are you adding?",
            
        }
    ]).then(function(data){

    	var query = connect.query("UPDATE products set stock_quantity = stock_quantity +" + data.action + " where item_id =" + value, function(err, res) {
			if (err) throw err;
			console.log("items added");
		});

	});
}

function addItemPrompt(){
	var inquirer = require("inquirer");

	inquirer.prompt([
        {
            type: "text",
            name: "item",
            message: "What is the item?",
            
        },
        {
        	type: "text",
        	name: "dept",
        	message: "What department is it for?"
        },
        {
        	type: "text",
        	name:"price",
        	message: "How much is it?"
        },
        {
        	type: "text",
        	name: "stock",
        	message: "How many are you adding?"
        }

    ]).then(function(data){
    	var query = connect.query("insert into products (product_name, department_name, price, stock_quantity) values('" + data.item + "', '" + data.dept + "', " + data.price + ", " + data.stock + ")", function(err, res) {
				if (err) throw err;
				console.log("item added.");
		});
	});
}
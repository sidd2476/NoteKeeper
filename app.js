// const express = require("express");
// const bodyParser = require("body-parser");
// const date = require(__dirname +"/date.js");
// const mongoose = require("mongoose");
// const _ = require("lodash");

// //console.log(date());
// const app = express();
// // var items = [];
// // let workItems = [];
// mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true})


// const itemsSchema = {
//     name:String
// };

// const Item = mongoose.model("Item",itemsSchema);

// const item1 = new Item({
//     name:"Welcome to your todolist"
// });
// const item2 = new Item({
//     name:"Hit the + to add a new item"
// });
// const item3 = new Item({
//     name:"<-- hit this to delete an item"
// });

// const defaultItem = [item1,item2,item3];

// const listSchema = {
//     name:String,
//     items:[itemsSchema]
// };
// const List = mongoose.model("List",listSchema);

// app.set("view engine","ejs");
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));
// app.get("/" ,function(req,res){
// // var today = new Date();
// // var currentDay = today.getDay();
// //day = "";
// // switch (currentDay) {
// //     case 0:
// //         day = "Sunday";
        
// //         break;
// //     case 1:
// //         day = "Monday";
// //         break;
// //     case 2:
// //         day = "Tuesday";
// //         break;
// //     case 3:
// //         day="Wednesday";
// //         break;
// //     case 4:
// //         day = "Thursday";
// //         break;
// //     case 5:
// //         day = "Firday";
// //         break;
// //     case 6:
// //         day = "Saturday";
// //     default:
// //         console.log("Error");
// //         break;
// // } manually typing days

// // var options = {
// //     weekday: "long",
// //     day: "numeric",
// //     month: "long"

// // }
// // var day = today.toLocaleDateString("en-us",options);
// let day = date.getDay();
// // if(currentDay == 6 || currentDay == 0){
// //     //res.sendFile(__dirname + "/weekend.html");
// //     res.render("index",{kindOfDay: day});

// // }
// // else{
// //     //res.sendfile(__dirname + "/week.html");
    
//     Item.find({},function(err,foundItems){

//         if(foundItems.length === 0){
//             Item.insertMany(defaultItem,function(err){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log("Added Successfully")
//                 }
//             });
//             res.redirect("/");
//         }
//         else{
//         //console.log(foundItems);
//         res.render("index",{listTile: "Today" , newListItems: foundItems});
//         }
//     })
    
// });


// app.get("/:customListName",function(req,res){
//     const customListName = _.capitalize(req.params.customListName);
//     List.findOne({name: customListName},function(err,foundList){
//         if(!err){
//             if(!foundList){
//                 //console.log("DOesnt exist");
//                 //Create a new list
//                 const list = new List({
//                     name:customListName,
//                     items:defaultItem
//                 });
//                 list.save();
//                 res.redirect("/" + customListName);
//             }
//             else{
//                 //console.log("exists");
//                 res.render("index",{listTile:foundList.name,newListItems:foundList.items})
//             }
//         }        
//     })


//     //console.log(req.params.customListName);
    
// })
// app.post("/" , function(req,res){
//     //console.log(req.body)
//     const itemName = req.body.newItem;
//     const listName = req.body.list;
//     const item = new Item({
//         name: itemName
//     });

//     if(listName === "Today"){
//     item.save();
    
//     res.redirect("/");
//     }
//     else{
//         List.findOne({name: listName},function(err,foundList){
//             foundList.items.push(item);
//             foundList.save();
//             res.redirect("/"+listName);
//         })
//     }
//     // if(req.body.list === "work"){
//     //     workItems.push(item);
//     //     res.redirect("/work")
//     // }
//     // else{
//     // items.push(item);
    
//     // res.redirect("/")
//     // }
//     // console.log(item);
// });

// app.post("/delete",function(req,res){
//     const checkedItemId = req.body.deleteItem;
//     const listname = req.body.listName;
//     if(listname === "Today"){
// Item.findByIdAndRemove(checkedItemId ,function(err){
//     if(!err){
//        // console.log(err);
//         console.log("Successfully checked item");
//         res.redirect("/");
//     }
// });
//     } else{
//         List.findOneAndUpdate({name:listname},{$pull: {items:{_id: checkedItemId}}},function(err,foundList){
//             if(!err){
//                 res.redirect("/"+listname);
//             }
            
//         });
//     }

//     //console.log(req.body);
// });


// // app.get("/work" , function(req,res){
// //     res.render("index" ,{listTile: "Work List" , newListItems: workItems} )
// // });

// // app.post("/work" , function(req,res){
// //     let item = req.body.newItem;
// //     workItems.push(item);
// //     res.redirect("/work");

// // });

// app.listen(3000,function(){
//     console.log("Server Running");
// })

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sid:sidd2476@cluster0-5px8d.mongodb.net/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully savevd default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });

});

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if (!err){
      if (!foundList){
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list

        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    }
  });



});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
  }


});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});

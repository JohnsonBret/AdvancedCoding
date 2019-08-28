var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var {User} = require('./models/users');
var {Dwarf} = require('./models/dwarf_model');
var {mongoose} = require('./mongoose');
var player = require('play-sound')(opts = {})

var app = express();

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.get('/', (req, res)=>{
    // res.send("So whatever i write here");
    
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dwarves', (req,res)=>{

    res.sendFile(path.join(__dirname, 'dwarves.html'));
});

app.get('/dwarf/create', async (req, res)=>{
    
    var dwarf = new Dwarf({
        foodLevel: 1,
        isAlive: true
    });

    dwarf.save();

    res.status(200).send({dwarf});
});

app.patch('/feed/:id', async (req, res)=>{
    console.log(`fed the dwarf ${req.params.id}`); 

    //Find Dwarf in Database
    const foundDwarf = await Dwarf.find({_id: req.params.id});
    const foundDwarfFood = parseInt(foundDwarf[0].foodLevel);

    //Update Dwarf in Database
    const updatedDwarf = await Dwarf.findOneAndUpdate({
        _id: req.params.id
    },{
        foodLevel: foundDwarfFood + 1
    }, {new: true},);


    res.status(200).send({updatedDwarf});
});

app.patch('/hunger/:id', async (req, res)=>{
    console.log(`Dwarf ${req.params.id} got Hungry`);

    try{
    const foundDwarf = await Dwarf.find({_id: req.params.id});
    const foundDwarfFood = parseInt(foundDwarf[0].foodLevel);

    const updatedDwarf = await Dwarf.findOneAndUpdate({
        _id: req.params.id
    },{
        foodLevel: foundDwarfFood - 1
    }, {new: true},);

    res.status(200).send({updatedDwarf});

    }
    catch(e){

    }
    
});

app.delete('/slay/:id', async(req, res)=>{
    console.log(`Slew the dwarf ${req.params.id}`);

    const deletedDwarf = await Dwarf.findOneAndUpdate({
        _id: req.params.id}, {
            isAlive: false
        }, {new: true});


    res.status(200).send({deletedDwarf}); 
});

app.get('/database', async (req, res)=>{

    // This is How we Find Or Read from the Database
    // const foundUser = await User.find({_id: "5d1bf442a5f685b2e20af5c5"});

    //Find Everyone
    // await User.find({});         

    // Update - Find one And Update
    // const updatedUser = await User.findOneAndUpdate({_id: "5d1bf442a5f685b2e20af5c5"},
    // {email: "sawyer@sawyer.com"});

    //Delete a Person
    const deletedUser = await User.findOneAndDelete({email: "sawyer@sawyer.com",
password: "BeyondTopSecret"});

    console.log(deletedUser);  

    res.send(deletedUser);      
});

app.get('/everyone', async (req, res)=>{
    const everyone = await User.find({});

    player.play('foo.mp3', function(err){
        if (err) throw err
    })
           
    console.log(everyone);

    res.send(everyone);
})


app.post('/login', (req, res)=>{
    let serverName = req.body.name;
    let serverPassword = req.body.password;

    console.log(`name is ${serverName} password is ${serverPassword}`);

    var user = new User({
        email: serverName,
        password: serverPassword
    });

    user.save();

    // if(serverName == "Bret" && serverPassword == "TopSecret")
    // {
    //     res.sendFile(path.join(__dirname, 'success.html'));
    // }
    // else
    // {
    //     res.sendFile(path.join(__dirname, 'loser.html'));
    // }

    console.log(`Name ${serverName} Password ${serverPassword}`);
});

app.listen(4000, ()=>{
    console.log(`Luis is killing me on port 4000`);
});
const express = require('express');
const ejs = require('ejs');
const date = require(__dirname+'/getDate.js');
const app = express();

app.set('view engine', ejs);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

let toDoList = [];

app.get('/', (req, res) => {
    let today = date.getTodayDateLong();
    console.log(typeof(today));
    res.render('index.ejs', {date: today, myToDo: toDoList});
});

app.post('/', (req, res) => {
    let userTask = req.body.newTask;
    toDoList.push(userTask);
    console.log(toDoList);
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    let itemToDelete = req.body.checkbox;
    for(let i = 0; i < toDoList.length; i++){
        if(toDoList[i] === itemToDelete){
            console.log(`item ${toDoList[i]} removed`)
            toDoList.splice(i, 1);
        }
    }

    res.redirect('/');

});

app.get('*', (req, res) => {
    res.send('404. Page not found.');
});

app.listen(3000, () => {
    console.log('Server is running on Port 3000');
});

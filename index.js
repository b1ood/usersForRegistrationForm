const express = require("express");

const app = express();

const jsonParser = express.json();

let usersData = [
    {userName: 'admin', userPassword: 'qwerty123'},
    {userName: 'user', userPassword: '123qwerty'},
];

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});

app.get('/users', function (request, response) {
    if (!request.body) return response.sendStatus(400);
})

app.post('/postuser', jsonParser, function (request, response) {

    if (!request.body) return response.sendStatus(400);

    let foundUser;

    for (let i = 0; i < usersData.length; i++) {
        let u = usersData[i];
        if (u.userName === request.body.name && u.userPassword === request.body.password) {
            foundUser = u.userName;
            response.send({isReg: true, pass: true});
            break;
        } else if (u.userName === request.body.name && u.userPassword !== request.body.password) {
            foundUser = u.userName;
            response.json({isReg: true, pass: false});
            break;
        }
    }

    if (foundUser !== request.body.name) {
        response.status(401).send();
    }
});

app.post('/putuser', jsonParser, function (request, response) {

    if (!request.body) return response.sendStatus(400);

    let foundUser;

    for (let i = 0; i < usersData.length; i++) {
        let u = usersData[i];
        if (u.userName === request.body.name) {
            foundUser = u.userName;
            response.status(200).send('100');
            break;
        }
    }

    if (!foundUser) {
        let newUser = {userName: '', userPassword: ''};
        newUser.userName = request.body.name;
        newUser.userPassword = request.body.password;
        usersData.push(newUser);
        console.log(usersData);
        response.status(200).send();
    }
})

app.listen(3000);
const express = require('express');
// const morgan = require('morgan');
const app = express();

const validateZip = require('./middleware/validateZip');
const getZoos = require("./utils/getZoos");
// app.use(morgan("dev"));

const checkZip = (req, res, next) => {
    const {zip} = req.params;
    if(getZoos(zip)){
        res.send(`${zip} exists in our records.`);
    }else{
        next(`${zip} does not exist in our records.`);
    }
}

const getZoosByZip = (req, res, next) => {
    const {zip} = req.params;
    const zoos = getZoos(zip);
    if(zoos.length){
        res.send(`${zip} zoos: ${zoos.join('; ')}`);
    }else{
        next(`${zip} has no zoos.`);
    }
};

const allZoosAdmin = (req, res, next) => {
    const {admin} = req.query;

    if(admin === "true"){
        res.send(`All zoos: ${getZoos().join('; ')}`);
    }else{
        next(`You do not have access to that route.`);
    }
}

app.get("/check/:zip", validateZip, checkZip);
app.get("/zoos/all", allZoosAdmin);
app.get("/zoos/:zip", validateZip, getZoosByZip);

//errors
app.use((req, res, next) => res.send(`That route could not be found!`));

app.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
});



module.exports = app;
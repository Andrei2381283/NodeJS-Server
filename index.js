/* module.paths.push(__dirname); */

const express = require("express");
const os = require('os');
const fs = require("fs");

const app = express();
const sequelize = require("./sequelize");
const routes = require("./routes/routes.js");

const DomainModel = require("./models/Domain");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


global.dir = __dirname + "/files";
global.companies = [];
global.companiesData = [];

DomainModel.afterCreate((model) => {
    global.companies.push(model.domain);
    global.companiesData.push({owner: model.owner});
})

const PORT = process.env.PORT || 58800;


app.use("/", routes);


app.get(/|\/.+/i, function (req, res) {
    const path = req.path == "/" ? "/index.html" : req.path;
    try {
        if(!fs.existsSync(dir + "/site" + path)) throw 404;
        res.sendFile(dir + "/site" + path);
    } catch(err){
        res.status(404);
        res.sendFile(dir + "/site/404.html");
    }
});

sequelize.sync().then(() => {
    console.log('');
    console.log("Successful connected to MySQL");
    app.listen(PORT, () => {
        const ip_adresses = os.networkInterfaces();
        console.log('');
        for(const i in ip_adresses){
            for(const k in ip_adresses[i])if(ip_adresses[i][k].family == 'IPv4')console.log("Server running at http://" + ip_adresses[i][k].address + ':' + PORT);
        }
    });
    DomainModel.findAll().then((models) => {
        for(const model of models){
            global.companies[model.id - 1] = model.domain;
            global.companiesData[model.id - 1] = {owner: model.owner};
        }
    }).catch((err) => {
        console.log(err);
    })
}).catch((err) => {
    console.log(err);
})
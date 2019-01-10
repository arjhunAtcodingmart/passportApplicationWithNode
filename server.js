const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const countries = require('./assets/all_country.json')
const state = require('./assets/state.json')
const PassportSchema = require('./passportSchema.js')

app.use(express.json());
app.use(express.static("passport_form"))

app.get('/api/countries', (req, res) => {
    res.json(countries)
})

app.get('/api/state', (req, res) => {
    res.json(state)
})

app.post('/storeApplicantDetail', (req, res) => {
    let data = req.body
    createApplicant(data).then(
    res.send(true)
    );
})

async function createApplicant(data) {
    let createData = new PassportSchema({
        services: data.services,
        applicant_details: data.applicant_details,
        family_details: data.family_details,
        address_details: data.address_details,
        other_details: data.other_details
    });
    const result = await createData.save();
    console.log(result)
}

app.get('/applicantData', (req, res) => {
    PassportSchema.find({}, function(err, applicant_details){
        res.send(applicant_details);
    });
})
    
app.get('/index/:id', (req, res) => {
    PassportSchema.find({_id: req.params.id}, function(err, applicant_details){
        res.send(applicant_details);
    });
})

app.delete('/deleteData/:id', (req, res) => {
    PassportSchema.deleteOne({_id: req.params.id}, function(err, applicant_details){
        res.send(applicant_details)
    })
})

app.put('/updatePassport/:id', (req, res) => {
    console.log(req.body)
    debugger
    PassportSchema.updateOne({_id: req.params.id},{$set: {services: req.body.services, applicant_details: req.body.applicant_details, family_details: req.body.family_details, address_details: req.body.address_details, other_details: req.body.other_details}}, function(){
        res.send(true)
    })
})
app.listen(port, () => { console.log(`listening on ${port}`) })

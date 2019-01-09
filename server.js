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
        services: {
            select_type: data.services.select_type,
            type_of_application: data.services.type_of_application,
            type_of_passport: data.services.type_of_passport,
            validity: data.services.validity,
        },
        applicant_details: {
            first_name: data.applicant_details.first_name,
            surname: data.applicant_details.surname,
            other_names: data.applicant_details.other_names,
            name_changed: data.applicant_details.name_changed,
            date_of_birth: data.applicant_details.date_of_birth,
            city: data.applicant_details.city,
            select_country: data.applicant_details.select_country,
            select_state: data.applicant_details.select_state,
            select_district: data.applicant_details.select_district,
            select_gender: data.applicant_details.select_gender,
            select_marital: data.applicant_details.select_marital,
            select_citizenship: data.applicant_details.select_citizenship,
            select_employment: data.applicant_details.select_employment,
            select_gov_servant: data.applicant_details.select_gov_servant,
            select_qualification: data.applicant_details.select_qualification,
            select_non_e_c_r: data.applicant_details.select_non_e_c_r,
            aadhaar_number: data.applicant_details.aadhaar_number,
            voter_id: data.applicant_details.voter_id,
            pan_id: data.applicant_details.pan_id,
        },
        family_details: {
            father_name: data.family_details.father_name,
            father_surname: data.family_details.father_surname,
            guardian_name: data.family_details.guardian_name,
            guardian_surname: data.family_details.guardian_surname,
            mother_name: data.family_details.mother_name,
            mother_surname: data.family_details.mother_surname,
        },
        address_details: {
            address_same: data.address_details.address_same,
            address_in_out_country: data.address_details.address_in_out_country,
            address: data.address_details.address,
            mobile_number: data.address_details.mobile_number,
            telephone_number: data.address_details.telephone_number,
            email: data.address_details.email,
            first_refer_address: data.address_details.first_refer_address,
            first_refer_mobile_number: data.address_details.first_refer_mobile_number,
            first_refer_telephone_number: data.address_details.first_refer_telephone_number,
            second_refer_address: data.address_details.second_refer_address,
            second_refer_mobile_number: data.address_details.second_refer_mobile_number,
            second_refer_telephone_number: data.address_details.second_refer_telephone_number,
        },
        other_details: {
            passport_num: data.other_details.passport_num,
            date_of_issue: data.other_details.date_of_issue,
            date_of_expire: data.other_details.date_of_expire,
            place_of_issue: data.other_details.place_of_issue,
            passport_issue: data.other_details.passport_issue,
            charged: data.other_details.charged,
            offence: data.other_details.offence,
            denied: data.other_details.denied,
            revoked: data.other_details.revoked,
            political_asylum: data.other_details.political_asylum,
            emergency_certificate: data.other_details.emergency_certificate,
            place: data.other_details.place,
            date: data.other_details.date,
        },
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
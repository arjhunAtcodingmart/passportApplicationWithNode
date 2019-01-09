const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
    .then(() => console.log('connected to mongoDB...'))
    .catch(err => console.log('error : ', err))

const passportSchema = new mongoose.Schema({
    services: {
        select_type: String,
        type_of_application: String,
        type_of_passport: String,
        validity: String,
    },
    applicant_details: {
        first_name: String,
        surname: String,
        other_names: String,
        name_changed: String,
        date_of_birth: String,
        city: String,
        select_country: String,
        select_state: String,
        select_district: String,
        select_gender: String,
        select_marital: String,
        select_citizenship: String,
        select_employment: String,
        select_gov_servant: String,
        select_qualification: String,
        select_non_e_c_r: String,
        aadhaar_number: String,
        voter_id: String,
        pan_id: String,
    },
    family_details: {
        father_name: String,
        father_surname: String,
        guardian_name: String,
        guardian_surname: String,
        mother_name: String,
        mother_surname: String,
    },
    address_details: {
        address_same: String,
        address_in_out_country: String,
        address: String,
        mobile_number: String,
        telephone_number: String,
        email: String,
        first_refer_address: String,
        first_refer_mobile_number: String,
        first_refer_telephone_number: String,
        second_refer_address: String,
        second_refer_mobile_number: String,
        second_refer_telephone_number: String,
    },
    other_details: {
        passport_num: String,
        date_of_issue: String,
        date_of_expire: String,
        place_of_issue: String,
        passport_issue: String,
        charged: String,
        offence: String,
        denied: String,
        revoked: String,
        political_asylum: String,
        emergency_certificate: String,
        place: String,
        date: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('PassportDetail', passportSchema);
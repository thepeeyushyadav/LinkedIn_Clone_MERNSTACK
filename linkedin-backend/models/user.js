const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googeleId: {
        type: String,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
     },
    f_name: {
        type: String,
        default: "",
     },
    headline: {
        type: String,
        default: "",
     },
    curr_company: {
        type: String,
        default: "",
     },
    curr_location: {
        type: String,
        default: "",
     },
    profilePic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
     },
    cover_pic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/012/720/075/small_2x/cloud-computing-social-media-banner-hi-tech-cloud-connection-technology-linkedin-cover-internet-business-technology-header-global-data-information-exchange-background-illustration-vector.jpg",
     },
    about: {
        type: String,
        default: "",
     },
    skills: {
        type: [String],
        default: [],
     },
    experience: [
        {
            designation: {
                type: String,
            },
            company_name: {
                type: String,
            },
            duration: {
                type: String,
            },
            location: {
                type: String,
            },
            
        }
    ],
    friends: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        }
    ],
    pending_friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    resume: {
        type: String,
    },
},{ timestamps: true});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel; 
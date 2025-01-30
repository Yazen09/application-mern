const mongoose = require('mongoose');

const schema = mongoose.Schema ;

const contactSchema = new schema ({
    name : {
        type : String ,
        required : true
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true
    } ,
    phone : Number
    ,
  profile_img: String,
  cloudinary_id: String
},
{timestamps : true})

module.exports = Contact = mongoose.model("contact" , contactSchema)
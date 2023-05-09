const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    },


});

async function sendVarificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Varification Email from StudyNotion",otp);
        console.log("Mail Response: ",mailResponse);

    }catch(err){
        console.log("Error Occured while send the Email: ",err);
        throw err;
    }
}

otpSchema.pre('save', async function(next) {
    const otp = this;
    if(otp.isModified('otp')){
        await sendVarificationEmail(this.email, this.otp);
    }
    next();
});




module.exports = mongoose.model('OTP', otpSchema);

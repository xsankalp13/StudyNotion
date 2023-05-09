const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },

        });

        let info = await transporter.sendMail({
            from:'StudyNotion || Codehelp - Sankalp',
            to:`${email}`, // list of receivers
            subject:`${title}`, // Subject line
            text:`${body}`, // plain text body
        })
        console.log('Message sent: %s', info);
        return info;



    }catch(err){
        console.log(err);
    }
}
module.exports = mailSender;

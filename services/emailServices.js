const nodemailer = require ('nodemailer');

const emailConfig = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sheilajimenezreyes24@gmail.com',
        pass: 'moik izam jfki yncj'
    }
});

const sendEmail = async (to, subject, html) =>{
    try {
        const mailOptions = {
            from: 'sheilajimenezreyes24@gmail.com',
            to: to,
            subject: subject,
            html: html
        }
        await emailConfig.sendMail(mailOptions);
    } catch (error) {
        console.log('Error al enviar email');
    }
}


module.exports = sendEmail;
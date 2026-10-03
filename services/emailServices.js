const nodemailer = require ('nodemailer');

const emailConfig = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sheilajimene@gmail.com',
        pass: 'moik izam jfki yncj'
    }
});

const sendEmail = async (to) =>{
    try {
        const mailOptions = {
            from: 'sheilajimene@gmail.com',
            to: to,
            object: 'Gracias por registrate en mi app de la super bootcamp',
            html: '<h1>Graciasssss eres el mejor</h1>'
        }
        await emailConfig.sendMail(mailOptions);
    } catch (error) {
        console.log('Error al enviar email');
    }
}


module.exports = sendEmail;
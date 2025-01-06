const nodemailer = require('nodemailer');

// Setup mail configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'smtp2729@gmail.com', // Replace with your email
        pass: 'fhit ywuf vuzy tdpq' // Replace with your app password
    }
});

const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: 'smtp2729@gmail.com', // Sender email
        to,                        // Recipient email
        subject,                   // Subject line
        text                       // Email content
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send email: ${error.message}`);
    }
};

module.exports = sendMail;

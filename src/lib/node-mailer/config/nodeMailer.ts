import nodemailer from 'nodemailer';

const initializeNodeMailer = async () => {
    try {
        const transport = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTHOR_MAIL,
                pass: process.env.AUTHOR_MAIL_PASSWORD,
            },
        });
        return transport;
    } catch (error: any) {
        console.log('nodeMailer Transport Creation Error.', error.message);
    }
};

export default { initializeNodeMailer };
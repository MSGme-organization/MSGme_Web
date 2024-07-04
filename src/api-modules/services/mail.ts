import nodeMailer from "../config/nodeMailer";

export const resetPasswordMail = async (email: string, message: string) => {
    const transport = await nodeMailer.initializeNodeMailer();
    const mailOptions = {
        from: 'MSGme',
        to: email,
        subject: "reset your password",
        html: message,
    };
    return transport.sendMail(mailOptions);
};

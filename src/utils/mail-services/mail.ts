import nodeMailer from "../../lib/node-mailer/config/nodeMailer";

export const resetPasswordMail = async (email: string, message: string) => {
  const transport = await nodeMailer.initializeNodeMailer();
  const mailOptions = {
    from: "'MSGme' <noreply@yourdomain.com>",
    to: email,
    subject: "reset your password",
    html: message,
  };
  return transport.sendMail(mailOptions);
};

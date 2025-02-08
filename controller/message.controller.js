const MyMessageModel = require("../model/message.model");
const nodemailer = require("nodemailer");


const MessageController = {
    GetAll: async (req, res) => {
        const GetAllModel = await MyMessageModel.find();
        res.status(200).send(GetAllModel);
    },
    Post: async (req, res) => {

        const userEmail = req.body.email;
        const userMessage = req.body.message;
        const userName = req.body.name;
        const userSurName = req.body.surname;

        const NewObj = new MyMessageModel({
            name: userName,
            surname: userSurName,
            email: userEmail,
            message: userMessage
        });
        const newObj = await NewObj.save();


        // Transporter yaradın
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER, // Sizin Gmail adresiniz
                pass: process.env.SMTP_PASS, // Yaratdığınız App Password
            },
        });

        // Email göndərmə funksiyası
        const mailMessage = {
            from: `"${userName} ${userSurName}" <${userEmail}>`, // Göndərən adresi istifadəçinin emaili
            to: "hasanlimahir1@gmail.com",
            subject: "Message from the Portfolio website.",
            html: `
            <div>
            <div><b>Name:</b>  ${userName}</div>
            <div><b>Surname:</b>  ${userSurName}</div>
            <div><b>Gmail:</b> ${userEmail}</div>
            <hr style="margin:12px 0;"/>
            <div>${userMessage}</div>
            </div>`
        };

        // Emaili göndərmək
        try {
            await transporter.sendMail(mailMessage);
        } catch (error) {
            console.log(error);
        }
        res.status(200).send(newObj);
    },
    Put: async (req, res) => {
        const newObj = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            message: req.body.message
        };
        await MyMessageModel.findByIdAndUpdate(req.params.id, newObj);
        res.status(200).send(newObj);
    },
    Delet: async (req, res) => {
        const deletData = await MyMessageModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            data: deletData,
            message: "Deletion completed successfully"
        })
    }
};

module.exports = MessageController;
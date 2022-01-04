const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const nodemailer= require('nodemailer');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    verifMail,
    reset,
    getByEmail,
    verifPhone,
    sendPhoneVerificationCode,
    getByPhone,
    delete: _delete
};

//Login
async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

//get list of all users
async function getAll() {
    return await User.find();
}

//get a user by id
async function getById(id) {
    return await User.findById(id);
}

//get a user by email
async function getByEmail(email) {
    return await User.findOne({ email: email });
}

//get a user by phone
async function getByPhone(number) {
    return await User.findOne({ number: number });
}

//add new user to database
async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already in use';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

   

    //creating mail token
    const randomEmailNumber = generateRandomCode(6);
    user.verifCode = randomEmailNumber;
    // save user
    await user.save();

    const message = 'Your random code is : '+randomEmailNumber;
    sendMail(user.mail, 'Verify Account', )
    
}


async function reset(email){
    const user = await getByEmail(email);
    // validate
    if (!user) throw 'User not found';
    user.password = generateRandomCode(6);
    
    update(user.id,user)
    message = "your new password is " + user.password;
    sendMail(user.email,'reset password',message);
}

//update user 
async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already in use';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}
async function verifMail(id,code){
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';

    if( code == user.verifCode )
    {
        user.isVerified = true;
    }
    await user.save();
}
//

//delete user
async function _delete(id) {
    await User.findByIdAndRemove(id);
}


//generate random password
function generateRandomCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

async function sendMail(userMail, sub, message){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kmandi.fi.click@gmail.com',
          pass: 'Walidos11',
        },
      });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kmandi" <kmandi.fi.click@gmail.com>', // sender address
        to: userMail, // list of receivers seperated by comma
        subject: sub, // Subject line
        text: message, // plain text body
    }, (error, info) => {

        if (error) {
            console.log(error)
            return;
        }
        console.log('Message sent successfully!');
        console.log(info);
        transporter.close();
    });

}
async function verifPhone(usernumber,verifCode)
{
    const user = await getByPhone(usernumber);
    // validate
    if (!user) throw 'User not found';
    if (verifCode === user.verifCode)
    {
        user.isVerified= true;
        update(user.id,user)
        console.log("user : "+user.id+" is now verified");
    }
    else{
        console.log("verif code est incorrect");
    }
}

async function sendPhoneVerificationCode(UserPhone){
    const user = await getByPhone(UserPhone);
    // validate
    if (!user) throw 'User not found';
    user.verifCode = generateRandomCode(6);
    
    update(user.id,user)
    message = "Use this code to verify your phone number : " + user.verifCode;
    sendSMS(user.number,message);
}
async function sendSMS(userPhone, message){
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const accountSid = "ACb5a3c37fa480841144aa15cd5633d93b";
    const authToken = "35a862f070b1db4dd535a5a0572ff02d";
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: message,
        from: '+17279553059',
        to: '+216'+ userPhone,
    })
    .then(message => console.log(message.sid));
}

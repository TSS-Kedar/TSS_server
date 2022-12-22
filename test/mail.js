import nodemailer from  'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rhishikesh.parkhi@gmail.com',
    pass: 'ecvmbpgrkomavibi'
  }
});

var mailOptions = {
  from: 'rhishikesh.parkhi@gmail.com',
  to: 'rhishikesh.parkhi@gmail.com',
  subject: 'Sending Email using Node.js*************',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
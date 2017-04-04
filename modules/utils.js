const MAX_FILESIZE = 2*Math.pow(1024,2);

const utils = {
  getShortDate: function(date) {
    if (date == null) {
      return "never"
    } else {
      return String(new Date(date*1000))
    }
    return date
  },

  user: {
    default: {
      name: "Nobody",
      email: "no@email.com",
      picture: "public/img/uploads/nobody.jpg",
      status: '0',
      rides: []
    },
    parse: userJSON => { // ensures no unwanted info leakage
      return {
        name: userJSON.name,
        email: userJSON.email,
        picture: userJSON.picture,
        status: userJSON.status,
        rides: userJSON.rides
      }
    },
    valid: (db, userJSON) => {
      if (userJSON === null ||
        userJSON === undefined ||
        userJSON === "" ||
        !userJSON.name ||
        !userJSON.password ||
        !userJSON.confirmPassword ||
        !userJSON.email ||
        userJSON.password !== userJSON.confirmPassword
      ) return false;
      db.findOne({email: userJSON.email}, (err, res) => {
        if (res !== null) return false;
      })
      return true;
    },
    isDriver: user => {
      if (user.status != '1' ||
        !user.car ||
        !user.plate
      ) return false;
      return true;
    },
    subscribed: user => {
      if (user.status != '1' ||
        user.lastCharge <= Date.now()-2592000000 // 1 month
      ) return false;
      return true;
    },
  },

  mail: {
    newUser: email => {
      return {
        from: '"Travelle" <go@travelle.com>',
        to: email,
        subject: 'Welcome to Travelle',
        text: 'Thanks for signing up to ride with Travelle. We look forward to having you with us. \n\
          You may access your profile here: http://travelle.ca/profile \n\
          You may sign up for rides here: http://travelle.ca/rides \n\
          If you have any questions, please reach out: contact@travelle.com',
        html: 'Thanks for signing up to ride with Travelle. We look forward to having you with us. \n\
          You may access your profile here: http://travelle.ca/profile \n\
          You may sign up for rides here: http://travelle.ca/rides \n\
          If you have any questions, please reach out: contact@travelle.com'
      }
    },
    newRide: email => {//TODO ride link, detail info
      return {
        from: '"Travelle" <go@travelle.com>',
        to: email,
        bcc: "ops@getpaidtodrive.net",
        subject: 'Travelle: New ride listing posted',
        text: "You just posted a ride. Awesome! If you have any questions, please reach out: contact@travelle.com",
        html: "You just posted a ride. Awesome! If you have any questions, please reach out: contact@travelle.com"
      }
    },
    subscription: email => {
      return {
        from: '"Travelle" <go@travelle.com>',
        to: email,
        bcc: "ops@getpaidtodrive.net",
        subject: 'Travelle: Verification Complete',
        text: "Congratulations! You have been verified to drive. \n\
          Update your profile here: http://travelle.ca/profile \n\
          If you have any questions, please reach out: contact@travelle.com",
        html: "Congratulations! You have been verified to drive. \n\
          Update your profile here: http://travelle.ca/profile \n\
          If you have any questions, please reach out: contact@travelle.com"
      }
    },
    joinRide: (email, ride) => {
      return {
        from: '"Travelle" <go@travelle.com>',
        to: email,
        bcc: "ops@getpaidtodrive.net",
        subject: 'Travelle: You just joined a ride',
        text: `You have joined a ride: ${ride} \n\n Make sure to be there on time! \n If you have any questions, please reach out: contact@travelle.com`,
        html: `You have joined a ride: ${ride} \n\n Make sure to be there on time! \n If you have any questions, please reach out: contact@travelle.com`
      }
    },
    send: (transporter, mailOptions) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      })
    },
  },

  ride: {
    valid: rideJSON => {
      if (!rideJSON ||
        !rideJSON.from ||
        !rideJSON.to ||
        !rideJSON.departure || //TODO validate time > now
        !rideJSON.address ||
        !rideJSON.price ||
        !rideJSON.seats ||
        !rideJSON.email
      ) return false;
      return true;
    },

    text: rideJSON => {
      return `
        From: ${rideJSON.from}
        To: ${rideJSON.to}
        Date: ${Date(rideJSON.departure)}
        Address: ${rideJSON.address}
        Driver email: ${rideJSON.email}
        Ticket price: ${rideJSON.price}
      `
    }
  },

  file: {
    valid: file => {
      if (!file) {
        console.log("File does not exist");
        return false;
      } else if (file.size > MAX_FILESIZE) {
        console.log("File is too large");
        return false;
      } else if (!(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg')) {
        console.log("File type not supported", file.mimetype);
        return false;
      }
      return true;
    }
  }
}

export default utils;

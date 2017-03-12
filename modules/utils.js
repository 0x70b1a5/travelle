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
      username: "Nobody",
      email: "no@email.com",
      picture: "public/img/uploads/nobody.jpg"
    },
    parse: userJSON => {
      return {
        name: userJSON.name,
        email: userJSON.email,
        picture: userJSON.picture
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
        text: 'Thanks for signing up to ride with Travelle. We look forward to having you with us. If you have any questions, please reach out: contact@travelle.com',
        html: 'Thanks for signing up to ride with Travelle. We look forward to having you with us. If you have any questions, please reach out: contact@travelle.com'
      }
    },
    newRide: email => {//TODO ride link, detail info
      return {
        from: '"Travelle" <go@travelle.com>',
        to: email,
        subject: 'Travelle: New ride listing posted',
        text: "You just posted a ride. Awesome! If you have any questions, please reach out: contact@travelle.com",
        html: "You just posted a ride. Awesome! If you have any questions, please reach out: contact@travelle.com"
      }
    },
    subscription: email => {
      return {
        from: '"Travelle" <go@travelle.com>',
        to: email,
        subject: 'Travelle: Verification Complete',
        text: "Congratulations! You have been verified to drive. If you have any questions, please reach out: contact@travelle.com",
        html: "Congratulations! You have been verified to drive. If you have any questions, please reach out: contact@travelle.com"
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
        !rideJSON.seats
      ) return false;
      return true;
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

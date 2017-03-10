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
      email: "no@email.com"
    },
    parse: function(userJSON){
      return {
        username: userJSON.username,
        email: userJSON.email
      }
    },
    valid: function(userJSON) {
      if (userJSON === null ||
        userJSON === undefined ||
        userJSON === "" ||
        !userJSON.name ||
        !userJSON.password ||
        !userJSON.confirmPassword ||
        !userJSON.email ||
        userJSON.password !== userJSON.confirmPassword
      ) return false;
      User.findOne({email:userJSON.email}).toArray((err,rows) => {
        if (err || rows.length > 0) return false;
      });
      return true;
    },
    isDriver: function(user) {
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
    exists: email => {
      User.findOne({email: email}, (err, res) => {
        if (res) return true;
      })
      return false;
    }
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
      console.log(file);
      if (file.size > MAX_FILESIZE ||
        (file.type != 'image/png' || file.type != 'image/jpg')
      ) return false;
      return true;
    }
  }
}

export default utils;

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
      return true;
    },
    isDriver: function(user) {
      if (user.status != '1' ||
        !user.car ||
        !user.plate
      ) return false;
      return true;
    }
  },

  mail: {
    newUser: function(email){
      return {
        from: '"Travelle" <go@travelle.com>',
        to: email,
        subject: 'Welcome to Travelle',
        text: 'Thanks for signing up to ride with Travelle. We look forward to having you with us. If you have any questions, please reach out: contact@travelle.com',
        html: 'Thanks for signing up to ride with Travelle. We look forward to having you with us. If you have any questions, please reach out: contact@travelle.com'
      }
    },
    newRide: function(email){//TODO ride link, detail info
      return {
        from: '"Travelle" <go@travelle.com>',
        to: email,
        subject: 'Travelle: New ride listing posted',
        text: "You just posted a ride on Travelle. Awesome! If you have any questions, please reach out: contact@travelle.com",
        html: "You just posted a ride on Travelle. Awesome! If you have any questions, please reach out: contact@travelle.com"
      }
    },
    send: function(transporter, mailOptions) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      })
    },
  },

  ride: {
    valid: function(rideJSON) {
      if (!rideJSON ||
        !rideJSON.from ||
        !rideJSON.to ||
        !rideJSON.departure || //TODO validate datetime > now
        !rideJSON.address ||
        !rideJSON.seats
      ) return false;
      return true;
    }
  },
}

export default utils;

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
        !userJSON.password ||
        !userJSON.confirmPassword ||
        !userJSON.email ||
        userJSON.password !== userJSON.confirmPassword
      ) return false;
      return true;
    }
  }
}

export default utils;

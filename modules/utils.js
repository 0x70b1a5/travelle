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
    }
  }
}

export default utils;

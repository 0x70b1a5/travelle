const utils = {
  getShortDate: function(date) {
    if (date == null) {
      return "never"
    } else {
      return String(new Date(date*1000))
    }
    return date
  }
}

export default utils;

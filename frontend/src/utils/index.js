export function showDateTime(timestamp) {
  const postTimestamp = new Date(timestamp);
  // Write the logic here to show relative time if necessary
  // Level 1 - 30 sec ago, 20 mins ago, 3 hr ago, yesterday.
  // Level 2 - If post is of current year don't show year. Format: 23 March at 10:00
  // Level 3 - If post is not of current year show exact date time. Format: 23 March 2016, 10:00:12 PM
  return postTimestamp.toLocaleString();
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

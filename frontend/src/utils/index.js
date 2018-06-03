export function convertTime(time) {
  let d = new Date();
  let currentTime = Math.floor(d.getTime() / 1000);
  let seconds = currentTime - Math.floor(time / 1000);

  // more than a year ago
  if (seconds > 365*24*3600) {
    const ago = Math.floor(seconds / (365*24*3600));
    return ago + (ago === 1 ? ' year ' : ' years ') + 'ago';
  }

  // more that two days
  if (seconds > 2*24*3600) {
    return 'few days ago';
  }

  // a day
  if (seconds > 24*3600) {
    return 'yesterday';
  }

  if (seconds > 3600) {
    return 'few hours ago';
  }

  if (seconds > 1800) {
    return 'Half an hour ago';
  }

  if (seconds > 60) {
    const minsAgo = Math.floor(seconds/60)
    return minsAgo===1 ? minsAgo + ' minute ago':  minsAgo + ' minutes ago';
  }

  if (seconds < 60) {
    return 'Few seconds ago';
  }
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function convertObjectToArray(obj) {
  return Object.keys(obj).map(k => obj[k])
}

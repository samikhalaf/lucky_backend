function cleanPayload(obj) {
  const payload = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined' && obj[key] !== null) {
      payload[key] = obj[key];
    }
  });

  return payload;
}

module.exports = cleanPayload;

function cleanPayload(obj) {
  const payload = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      payload[key] = obj[key];
    }
  });

  return payload;
}

module.exports = cleanPayload;

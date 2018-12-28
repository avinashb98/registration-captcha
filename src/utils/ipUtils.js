const IP = require('../models/ip');

const updateIpRegCount = async (address) => {
  let ip;
  try {
    ip = await IP.findOne({ address });
  } catch (error) {
    throw error;
  }
  if (!ip) {
    await IP.create({ address });
    return;
  }

  ip.registrationCount += 1;

  try {
    await ip.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateIpRegCount
};

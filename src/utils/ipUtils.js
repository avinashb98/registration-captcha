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

const isIpSafe = async (address) => {
  let ip;
  try {
    ip = await IP.findOne({ address });
  } catch (error) {
    throw error;
  }
  if (!ip || ip.registrationCount < 3) {
    return true;
  }

  return false;
};

module.exports = {
  updateIpRegCount,
  isIpSafe
};

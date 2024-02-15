const crypto = require('crypto');

function createAuthHeaders(url, method) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const message = method + url + timestamp;
    const hmac = crypto.createHmac("sha256", process.env.SHOP_API_SECRET);
    hmac.update(message);
    const hash = hmac.digest("hex");
  
    return {
      "X-Shopify-Access-Token": process.env.SHOP_ACCESS_TOKEN,
      "X-Shopify-Timestamp": timestamp,
      "X-Shopify-Hmac-Sha256": hash,
    };
  }
  
  function calculateWaitTime(retryCount) {
    // Exponential backoff strategy
    const baseWaitTime = 1000; // 1 second
    const maxWaitTime = 60000; // 1 minute
    const waitTime = Math.min(baseWaitTime * Math.pow(2, retryCount), maxWaitTime);
    return waitTime;
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

module.exports = { createAuthHeaders, calculateWaitTime, sleep };
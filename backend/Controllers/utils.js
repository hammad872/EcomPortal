const crypto = require('crypto');

function createAuthHeadersGrov(url, method) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const message = method + url + timestamp;
    const hmac = crypto.createHmac("sha256", process.env.SHOP_API_SECRET_GROV);
    hmac.update(message);
    const hash = hmac.digest("hex");
  
    return {
      "X-Shopify-Access-Token": process.env.SHOP_ACCESS_TOKEN_GROV,
      "X-Shopify-Timestamp": timestamp,
      "X-Shopify-Hmac-Sha256": hash,
    };
  }

  function createAuthHeadersLuci(url, method) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const message = method + url + timestamp;
    const hmac = crypto.createHmac("sha256", process.env.SHOP_API_SECRET_LUCI);
    hmac.update(message);
    const hash = hmac.digest("hex");
  
    return {
      "X-Shopify-Access-Token": process.env.SHOP_ACCESS_TOKEN_LUCI,
      "X-Shopify-Timestamp": timestamp,
      "X-Shopify-Hmac-Sha256": hash,
    };
  }
  
  function createAuthHeadersOstro(url, method) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const message = method + url + timestamp;
    const hmac = crypto.createHmac("sha256", process.env.SHOP_API_SECRET_OSTRO);
    hmac.update(message);
    const hash = hmac.digest("hex");
  
    return {
      "X-Shopify-Access-Token": process.env.SHOP_ACCESS_TOKEN_OSTRO,
      "X-Shopify-Timestamp": timestamp,
      "X-Shopify-Hmac-Sha256": hash,
    };
  }

  function calculateWaitTimeGrov(retryCount) {
    // Exponential backoff strategy
    const baseWaitTime = 1000; // 1 second
    const maxWaitTime = 60000; // 1 minute
    const waitTime = Math.min(baseWaitTime * Math.pow(2, retryCount), maxWaitTime);
    return waitTime;
  }
  
  function calculateWaitTimeLuci(retryCount) {
    // Exponential backoff strategy
    const baseWaitTime = 1000; // 1 second
    const maxWaitTime = 60000; // 1 minute
    const waitTime = Math.min(baseWaitTime * Math.pow(2, retryCount), maxWaitTime);
    return waitTime;
  }

  function calculateWaitTimeOstro(retryCount) {
    // Exponential backoff strategy
    const baseWaitTime = 1000; // 1 second
    const maxWaitTime = 60000; // 1 minute
    const waitTime = Math.min(baseWaitTime * Math.pow(2, retryCount), maxWaitTime);
    return waitTime;
  }
  function sleepGrov(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function sleepLuci(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function sleepOstro(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

module.exports = { createAuthHeadersGrov, calculateWaitTimeGrov, sleepGrov, createAuthHeadersLuci, calculateWaitTimeLuci, sleepLuci, createAuthHeadersOstro, calculateWaitTimeOstro, sleepOstro};
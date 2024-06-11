
// externalValidator= require('./externalValidator')
async function externallyValidateCookie(req) {
  if (!req || !req.cookies) {
      throw Error('cookies empty');
  } else {
      console.log("Do somethings");
      req.testCookie = req.cookies.testCookie
  }
}

async function cookieValidator (req) {
  try {
      await externallyValidateCookie(req)
  } catch (e) {
      console.log(e)
      throw new Error('Invalid cookies')
  }
}

module.exports = cookieValidator
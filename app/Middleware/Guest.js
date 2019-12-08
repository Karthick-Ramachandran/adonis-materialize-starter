"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Guest {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, session, response }, next) {
    try {
      await auth.check();
      session.flash({ message: "You're Already Logged in" });
      return response.redirect("back");
    } catch {
      await next();
    }
  }
}

module.exports = Guest;

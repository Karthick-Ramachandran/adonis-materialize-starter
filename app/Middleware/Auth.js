"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth, session }, next) {
    try {
      await auth.check();
      await next();
    } catch {
      session.flash({ message: "You should login to continue" });
      return response.redirect("/login");
    }
  }
}

module.exports = Auth;

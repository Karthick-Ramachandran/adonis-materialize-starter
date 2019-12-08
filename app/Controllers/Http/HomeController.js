"use strict";

class HomeController {
  async index({ view }) {
    return view.render("home");
  }
  async logout({ auth, response, session }) {
    await auth.logout();
    session.flash({ message: "Logged out, Come back soon!" });
    return response.redirect("/login");
  }
}

module.exports = HomeController;

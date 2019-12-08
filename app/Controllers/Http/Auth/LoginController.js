"use strict";
const { validate } = use("Validator");
class LoginController {
  async show({ view }) {
    return view.render("auth.login");
  }
  async login({ response, auth, request, session }) {
    const body = request.all();
    const rules = {
      email: "required|email",
      password: "required"
    };
    const messages = {
      "email.email": "Email should be valid",
      "email.required": "Email is required",
      "password.required": "Password is required"
    };
    const validation = await validate(body, rules, messages);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }
    await auth.attempt(body.email, body.password);
    session.flash({ message: "Successfully Logged in" });
    return response.redirect("/home");
  }
}

module.exports = LoginController;

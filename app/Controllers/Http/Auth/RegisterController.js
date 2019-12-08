"use strict";
const { validate } = use("Validator");

const User = use("App/Models/User");
class RegisterController {
  async show({ view }) {
    return view.render("auth.register");
  }
  async register({ response, auth, request, session }) {
    const body = request.all();
    const rules = {
      username: "required| unique:users",
      email: "required|email| unique:users",
      password: "required|min:6"
    };
    const messages = {
      "username.required": "Username is required",
      "username.unique": "Username already taken",
      "email.unique": "Email already taken",
      "email.email": "Email should be valid",
      "email.required": "Email is required",
      "password.required": "Password is required",
      "password.min": "Password should have at least 6 characters"
    };
    const validation = await validate(body, rules, messages);
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();
      return response.redirect("back");
    }
    const newUser = await new User();
    newUser.username = body.username;
    newUser.email = body.email;
    newUser.password = body.password;
    await newUser.save();

    await auth.attempt(newUser.email, body.password);
    session.flash({ message: "You are registered and logged in" });
    return response.redirect("/home");
  }
}

module.exports = RegisterController;

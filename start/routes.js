"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.group(() => {
  Route.get("/login", "Auth/LoginController.show");
  Route.post("/login", "Auth/LoginController.login");
  Route.get("/register", "Auth/RegisterController.show");
  Route.post("/register", "Auth/RegisterController.register");
}).middleware("guest");
Route.post("/logout", "HomeController.logout");
Route.group(() => {
  Route.get("/home", "HomeController.index");
}).middleware("auth");

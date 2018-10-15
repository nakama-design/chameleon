const User = use('App/Model/User')

class UsersController {
  /**
   * @chameleon
   * 
   * @name        : Show User
   * @description : Show list of all user.
   * @route       : /users
   * @method      : GET
   * @response    : {
   *  view     : HTML
   * }
   */
  * index (request, response) {
    const users = yield User.all()
    yield response.sendView('users', { users: users.toJSON() })
  }

}
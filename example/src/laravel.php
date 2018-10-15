<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * @chameleon
     * 
     * @name        : Show User
     * @description : Show the profile for the given user.
     * @route       : /user
     * @method      : GET
     * @parameter   : {
     *  id : Integer
     * }
     * @response    : {
     *  view     : 'HTML'
     * }
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User extends Controller
{
    /**
     * @chameleon
     * 
     * @name        : Get Token
     * @description : Some description here
     * @route       : /token
     * @method      : GET
     * @group      : foo
     * @parameter   : {
     *  username : String
     * }
     * @response    : {
     *  token : JWT Token
     * }
     */
    public function token_get()
    {
        $username = $this->input->get('username');
        $tokenData = array();
        $tokenData['username'] = $username;
        $output['token'] = AUTHORIZATION::generateToken($tokenData);
        $this->set_response($output, REST_Controller::HTTP_OK);
    }
}

<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Auth Controller
 */
class Auth extends REST_Controller
{
    /**
     * @chameleon
     * 
     * @name        : Get Token
     * @description : Some description here
     * @route       : /token
     * @parameter   : {
     *  username : String,
     *  password : String
     * }
     * @response    : {
     *  token : 'asdasd'
     * }
     */
    public function token_get()
    {
        $tokenData = array();
        $tokenData['id'] = 1;
        $tokenData['name'] = 'some name';
        $output['token'] = AUTHORIZATION::generateToken($tokenData);
        $this->set_response($output, REST_Controller::HTTP_OK);
    }

    /**
     * @chameleon
     * 
     * @name        : Post Token
     * @description : Some description here
     * @route       : /token
     * @parameter   : {
     *  username : String,
     *  password : String
     * }
     * @response    : {
     *  token : 'asdasd'
     * }
     */
    public function token_post()
    {
        $headers = $this->input->request_headers();

        if (array_key_exists('Authorization', $headers) && !empty($headers['Authorization'])) {
            $decodedToken = AUTHORIZATION::validateToken($headers['Authorization']);
            if ($decodedToken != false) {
                $this->set_response($decodedToken, REST_Controller::HTTP_OK);
                return;
            }
        }

        $this->set_response("Unauthorised", REST_Controller::HTTP_UNAUTHORIZED);
    }
}

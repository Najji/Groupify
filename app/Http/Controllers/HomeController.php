<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request,
	Session,
	Requests;

class HomeController extends Controller
{
  public function getHome() {
    return view('welcome');
  }

  public function postNumShape(Request $req) {

  	return;    
  }

  public function getUsers(Request $req) {


     $auth = base64_encode(env('API_USER') . ":" . env('API_PW'));
     Session::put('auth' , "Basic ". $auth);

  	 $users = Requests::get(
           'https://jira.loricahealth.com/rest/api/latest/user/assignable/search?username=&projectKeys=SYSADMIN&issueKey=SYSADMIN-1877&startAt=0',
           array('authorization' => Session::get('auth'))
       )->body;
   $users = array_map(function($person) {return $person['displayName'];}, json_decode($users, true) );
   return $users;
  }

}

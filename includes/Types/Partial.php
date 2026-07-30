<?php 
namespace GF_SOCIAL_ICONS\Types;



if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
class Partial{
  
  /**
   * Summary of id
   * @var string the Control id
   */
  public $id;
  
  /**
   * Summary of args
   * @var array args passed into partial.
   */
  public $args = array();

  /**
   * 
   * @param mixed $id the partial id
   * @param mixed $args the partial args
   */
  public function __construct($id,$args){
    $this->id = $id;
    $this->args = $args;
  }
}

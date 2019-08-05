class Fine {

  /**
   * @name Example API Fine A
   * @type Routes
   * @method GET
   * @group API B
   * @parameters {
   *   username(String)! : John Doe
   *   email(String)! : mail@foo.co
   *   phone(Number)! : 01010
   *   address(Text) : -
   *   gender(Enum) : -
   * }
   */
  FineA() {
    return 'FineA'
  }
  
  /**
   * @name Example API Fine B
   * @type Routes
   * @method GET
   * @group API A
   * @parameters {
   *   username : String Null
   *   email : String Required Null
   * }
   */
  FineB() {
    return 'FineB'
  }
  
  /**
   * @name Example API Fine C
   * @type Routes
   * @method GET
   * @group API B
   * @parameters {
   *   username : String Required Null
   *   email : String Required
   * }
   */
  FineC() {
    return 'FineC'
  }
  
  /**
   * @name Example API Fine D
   * @type Routes
   * @method GET
   * @group API A
   * @parameters {
   *   username : String Required Null
   *   email : Required Null
   * }
   */
  FineD() {
    return 'FineD'
  }
  
}

class parent{
	constructor(ver){
    	this.ver = ver
  }
  getTest(){
    return this.path +this.ver
  }
}

class test extends parent{
  constructor(){
    super("serivceRepo")
  }
  testFunc(){
    return this.getTest()+1
  }
  getTest(){
    return `tol${this.getTest()}`
  }
  path = "test"
  
}

let testClass = new test()
console.log(testClass.getTest())
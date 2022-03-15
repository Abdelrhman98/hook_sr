const betaCalc = require('../../helpers/betaCalc/betaCalc.class')
const testCases = require('./testcases')

var calculateDiff = (baseObject, diffObject)=>{
  let newBeta = new betaCalc(baseObject,diffObject)
  let diffMap = newBeta.mapifyAll()
  let resultMap = newBeta.calcDiff()
  return {diffMap, resultMap}
}

testCases.forEach( testcase =>{
  let mapResults = calculateDiff(testcase.inputs.baseObject, testcase.inputs.diffObject)
  it(`generating diffrence Map Object ${testcase.testName}`, ()=>{
    expect(testcase.outputs.mapDiff).toEqual(mapResults.diffMap)
  })
  it(`generating resultMap Object ${testcase.testName}`,()=>{
    expect(testcase.outputs.mapResult).toEqual(mapResults.resultMap)
  })
})

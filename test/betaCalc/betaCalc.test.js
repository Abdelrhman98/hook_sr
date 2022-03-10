
let x = {
    "isNew": 0,
    "_id": "61d4233ccba705d05dee5d76",
    "ser_id": 82,
    "provider_id": 6,
    "ar_name": "فاليو",
    "data_fields": {
    "mobile": {
        "ar_label": "رقم الموبايل",
        "en_label": "bill ID",
        "field_name": "mobile",
        "max_len": "11",
        "min_len": "11",
        "visible": true,
        "required": true,
        "input_type": "N",
        "confirmed": true
    },
    "bills_count": {
        "ar_label": "عدد الأقساط",
        "en_label": "bills count",
        "field_name": "bills_count",
        "input_type": "S"
    },
    "total_payable_amount": {
        "ar_label": "القيمة الكلية",
        "en_label": " Total Payable Amount",
        "field_name": "total_payable_amount",
        "input_type": "S"
    }
    },
    "en_name": "Valu",
    "amount": {
      "ar_label": "القيمة",
      "en_label": "amount",
      "field_name": "amount",
      "valueType": "range",
      "range_min": 5,
      "range_max": 10000,
      "is_user_entered": true,
      "calculate_fee": true,
      "replace": [
        "range_max",
        "total_payable_amount"
      ],
      "credit": true
    },
    "service_charge": {
      "ar_label": "تكلفة الخدمة",
      "en_label": "service charge",
      "field_name": "service_charge",
      "slides": [
        {
          "scValueType": "F",
          "fromValue": 1,
          "toValue": 1000000000,
          "scValue": 10
        }
      ]
    },
    "requests": [
      {
        "name": "valu_inq",
        "order": 1,
        "request_type": "I",
        "inputs": [
          "mobile"
        ],
        "outputs": [
          "bills_count",
          "total_payable_amount"
        ]
      },
      {
        "name": "valu_pay",
        "order": 2,
        "request_type": "P",
        "inputs": [
          "mobile",
          "amount",
          "service_charge"
        ],
        "outputs": []
      }
    ],
    "main_biller": "معاملات مالية و بنوك",
    "receipt": {
      "template_id": 7,
      "optional": false
    },
    "sector": "المدفوعات المالية",
    "__v": 0,
    "userIdentification": "mobile"
}
,y=  {
    "isNew": 10,
    "ser_id": 83,
    "provider_id": 7,
    "ar_name": "فاليو",
        "test":"test",
    "data_fields": {
      "mobile": {
        "ar_label": "رقم الموبايل",
        "en_label": "bill ID",
        "field_name": "mobile",
        "min_len": "11",
        "visible": true,
        "required": true,
        "input_type": "N",
        "confirmed": true
      },
      "bills_count": {
        "ar_label": "عدد الأقساط",
        "en_label": "bills count",
        "field_name": "bills_count",
        "input_type": "P"
      },
      "total_payable_amount": {
        "ar_label": "القيمة الكلية",
        "en_label": " Total Payable Amount",
        "field_name": "total_payable_amount",
        "input_type": "S"
      }
    },
    "en_name": "Valu",
    "amount": {
      "ar_label": "القيمة",
      "en_label": "amount",
      "field_name": "amount",
      "valueType": "range",
      "range_min": 5,
      "range_max": 20,
      "is_user_entered": true,
      "calculate_fee": true,
      "replace": [
        "abdullah",
        

      ],
      "credit": true
    },
    "service_charge": {
      "ar_label": "تكلفة الخدمة",
      "en_label": "service charge",
      "field_name": "service_charge",
      "slides": [
        {
          "scValueType": "F",
          "fromValue": 1,
          "toValue": 1000000000,
          "scValue": 10
        }
      ]
    },
    "requests": [
      {
        "name": "valu_inq",
        "order": 1,
        "request_type": "I",
        "inputs": [
          "mobile"
        ],
        "outputs": [
          "bills_count",
          "total_payable_amount"
        ]
      },
      {
        "name": "valu_pay",
        "order": 2,
        "request_type": "P",
        "inputs": [
          "mobile",
          "amount",
          "service_charge"
        ],
        "outputs": []
      }
    ],
    "main_biller": "معاملات مالية و بنوك",
    "receipt": {
      "template_id": 7,
      "optional": false
    },
    "sector": "المدفوعات المالية",
    "__v": 0,
    "userIdentification": "mobile"
},
Mapresult = {
    isNew: { base: 0, diff: 10 },
    _id: { base: '61d4233ccba705d05dee5d76' },
    ser_id: { base: 82, diff: 83 },
    provider_id: { base: 6, diff: 7 },
    ar_name: { base: 'فاليو', diff: 'فاليو' },
    'data_fields.mobile.ar_label': { base: 'رقم الموبايل', diff: 'رقم الموبايل' },
    'data_fields.mobile.en_label': { base: 'bill ID', diff: 'bill ID' },
    'data_fields.mobile.field_name': { base: 'mobile', diff: 'mobile' },
    'data_fields.mobile.max_len': { base: '11' },
    'data_fields.mobile.min_len': { base: '11', diff: '11' },
    'data_fields.mobile.visible': { base: true, diff: true },
    'data_fields.mobile.required': { base: true, diff: true },
    'data_fields.mobile.input_type': { base: 'N', diff: 'N' },
    'data_fields.mobile.confirmed': { base: true, diff: true },
    'data_fields.bills_count.ar_label': { base: 'عدد الأقساط', diff: 'عدد الأقساط' },
    'data_fields.bills_count.en_label': { base: 'bills count', diff: 'bills count' },
    'data_fields.bills_count.field_name': { base: 'bills_count', diff: 'bills_count' },
    'data_fields.bills_count.input_type': { base: 'S', diff: 'P' },
    'data_fields.total_payable_amount.ar_label': { base: 'القيمة الكلية', diff: 'القيمة الكلية' },
    'data_fields.total_payable_amount.en_label': {
      base: ' Total Payable Amount',
      diff: ' Total Payable Amount'
    },
    'data_fields.total_payable_amount.field_name': {
      base: 'total_payable_amount',
      diff: 'total_payable_amount'
    },
    'data_fields.total_payable_amount.input_type': { base: 'S', diff: 'S' },
    en_name: { base: 'Valu', diff: 'Valu' },
    'amount.ar_label': { base: 'القيمة', diff: 'القيمة' },
    'amount.en_label': { base: 'amount', diff: 'amount' },
    'amount.field_name': { base: 'amount', diff: 'amount' },
    'amount.valueType': { base: 'range', diff: 'range' },
    'amount.range_min': { base: 5, diff: 5 },
    'amount.range_max': { base: 10000, diff: 20 },
    'amount.is_user_entered': { base: true, diff: true },
    'amount.calculate_fee': { base: true, diff: true },
    'amount.replace.0': { base: 'range_max', diff: 'abdullah' },
    'amount.replace.1': { base: 'total_payable_amount' },
    'amount.credit': { base: true, diff: true },
    'service_charge.ar_label': { base: 'تكلفة الخدمة', diff: 'تكلفة الخدمة' },
    'service_charge.en_label': {
      base: 'service charge',
      diff: 'service charge'
    },
    'service_charge.field_name': {
      base: 'service_charge',
      diff: 'service_charge'
    },
    'service_charge.slides.0.scValueType': { base: 'F', diff: 'F' },
    'service_charge.slides.0.fromValue': { base: 1, diff: 1 },
    'service_charge.slides.0.toValue': { base: 1000000000, diff: 1000000000 },
    'service_charge.slides.0.scValue': { base: 10, diff: 10 },
    'requests.0.name': { base: 'valu_inq', diff: 'valu_inq' },
    'requests.0.order': { base: 1, diff: 1 },
    'requests.0.request_type': { base: 'I', diff: 'I' },
    'requests.0.inputs.0': { base: 'mobile', diff: 'mobile' },
    'requests.0.outputs.0': { base: 'bills_count', diff: 'bills_count' },
    'requests.0.outputs.1': {
      base: 'total_payable_amount',
      diff: 'total_payable_amount'
    },
    'requests.1.name': { base: 'valu_pay', diff: 'valu_pay' },
    'requests.1.order': { base: 2, diff: 2 },
    'requests.1.request_type': { base: 'P', diff: 'P' },
    'requests.1.inputs.0': { base: 'mobile', diff: 'mobile' },
    'requests.1.inputs.1': { base: 'amount', diff: 'amount' },
    'requests.1.inputs.2': {
      base: 'service_charge',
      diff: 'service_charge'
    },
    main_biller: {
      base: 'معاملات مالية و بنوك',
      diff: 'معاملات مالية و بنوك'
    },
    'receipt.template_id': { base: 7, diff: 7 },
    'receipt.optional': { base: false, diff: false },
    sector: {
      base: 'المدفوعات المالية',
      diff: 'المدفوعات المالية'
    },
    __v: { base: 0, diff: 0 },
    userIdentification: { base: 'mobile', diff: 'mobile' },
    test: { diff: 'test' }
},
resultObjectForDiff = 
{
  added: [ 'test' ],
  removed: [
    '_id',
    'data_fields.mobile.max_len',
    'amount.replace.1'
  ],
  changed: {
    isNew: { from: 0, to: 10 },
    ser_id: { from: 82, to: 83 },
    provider_id: { from: 6, to: 7 },
    'data_fields.bills_count.input_type': { from: 'S', to: 'P' },
    'amount.range_max': { from: 10000, to: 20 },
    'amount.replace.0': { from: 'range_max', to: 'abdullah' }
  }
}

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

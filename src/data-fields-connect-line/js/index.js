const leftList = [
  {
    left: 'id'
  }, {
    left: 'name'
  }, {
    left: 'type'
  }, {
    left: 'aaaaa'
  }, {
    left: 'comcomcm'
  }, {
    left: 'tytestpe'
  }, {
    left: 'test666'
  }, {
    left: '11111'
  }
];
const right = ['json1', 'id', 'vvvv', 'zhao', 'name', 'id', 'yyyy', 'tim', 'timup'];
let leftObj = {
  data: leftList,
  type: 'left'
};
let rightObj = {
  data: right,
  type: 'right'
};
let functionObj = {
  data: ['handleFn'],
  type: 'function'
}
line.init(leftObj, rightObj, functionObj)

$('#j-add').click(function (e) {
  let params = {
    data: [`handleFn${Date.now()}`],
    type: 'function',
    isAppend: true
  };
  line.createList(params)
})

$('.del-func').click(function (e) {
  console.log('del func')
  // let params = {
  //   data: [`handleFn${Date.now()}`],
  //   type: 'function',
  //   isAppend: true
  // };
  // line.createList(params)
  e.stopPropagation();
  // return false;
})

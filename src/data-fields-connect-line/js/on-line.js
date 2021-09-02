const topSpace = 15;
const leftSpace = 110;
const line = {
  init: function (leftList, rightList, funcList) {
    this.draw = SVG('draw').size("100%", "100%");
    this.lineArr = [];
    this.funcLineArr = [];
    this.currentInfo = {};
    this.createList(leftList)
    this.createList(rightList)
    this.createList(funcList)
    this.bindBtnEvent()
    this.bindParentsEvent()
  },
  /* 创建列表 */
  createList: function (params, callback) {
    let type = params.type,
      data = params.data,
      isAppendItem = params.isAppend
      content = [];
    if (type == 'left') {
      $('.left-list').empty()
      data.forEach(element => {
        let item = '<li class="left-li" data-left=' + element.left + ' data-right=' + element.left + '>' + element.left + '</li>',
          obj = {};
        obj.beginValue = element.left;
        obj.line = this.createLine();
        this.lineArr.push(obj)
        content.push(item);
      });
      $('.left-list').html(content)
    } else if (type === 'function') {
      if (!isAppendItem) $('.function-list').empty()
      data.forEach(element => {
        let item = '<li class="function-li" data-left=' + element + ' data-right=' + element + '>' + element + '<textarea></textarea><img class="del-func" src="./img/delete-icon.png"></li>',
          obj = {};
        obj.beginValue = element;
        obj.line = this.createLine();
        this.funcLineArr.push(obj)
        content.push(item);
      });
      $('.function-list').append(content)
    } else {
      $('.right-list').empty()
      data.forEach(element => {
        let item = '<li class="right-li" data-right=' + element + '>' + element + '</li>';
        content.push(item);
      });
      $('.right-list').html(content);

    }
    // this.itemForEach(true)
  },
  /* 绑定按钮事件 */
  bindBtnEvent: function () {
    let self = this,
      parentPosition = $('#draw').offset();
    /* 鼠标按下left-list列，调整线条开始位置 */
    $('.left-list').on('mousedown', 'li', function (e) {

      let current = self.lineArr.find(el => {
        return el.beginValue == $(this).attr('data-left');
      });
      current.begin = {};
      current.beginElement = this;
      current.begin.y = $(this).offset().top - parentPosition.top + 15;
      current.begin.x = $(this).offset().left - parentPosition.left + 110;
      current.line.show();
      current.line.stroke({
        color: "#67C23A",
      });
      current.line.plot(current.begin.x, current.begin.y, current.begin.x, current.begin.y);
      current.end = {};
      /* 如果存在结束位置，删除 */
      if (current.endElement) {
        $(current.endElement).removeClass('selected')
        $(this).removeClass('selected')
      }
      current.endElement = '';
      current.endValue = '';
      self.currentInfo = current;
    })
    $('.function-list').on('click', 'li', function (e) {
      console.log('click');
    })
    $('.function-list').on('mousedown', 'li', function (e) {
      console.log('mousedown');
      let current = self.funcLineArr.find(el => {
        return el.beginValue == $(this).attr('data-left');
      });
      current.begin = {};
      current.beginElement = this;
      current.begin.y = $(this).offset().top - parentPosition.top + 15;
      current.begin.x = $(this).offset().left - parentPosition.left + 300;
      current.line.show();
      current.line.stroke({
        color: "#67C23A",
      });
      current.line.plot(current.begin.x, current.begin.y, current.begin.x, current.begin.y);
      current.end = {};
      /* 如果存在结束位置，删除 */
      if (current.endElement) {
        $(current.endElement).removeClass('selected')
        $(this).removeClass('selected')
      }
      current.endElement = '';
      current.endValue = '';
      self.currentInfo = current;
    })
    /* 鼠标按下right-list列，调整线条结束位置 */
    $('.right-list').on('mouseup', 'li', function (e) {
      let current = self.lineArr.find(el => {
        return el.beginValue == self.currentInfo.beginValue;
      });
      if (!current) current = self.funcLineArr.find(el => {
        return el.beginValue == self.currentInfo.beginValue;
      });

      current.end.y = $(this).offset().top - parentPosition.top + 15;
      current.end.x = $(this).offset().left - parentPosition.left - 20;
      current.endElement = this;
      current.endValue = $(this).attr('data-right');

      current.line.plot(current.begin.x, current.begin.y, current.end.x, current.end.y);
      $(current.beginElement).addClass('selected')
      $(current.beginElement).attr('data-selected', current.endValue)
      $(this).addClass('selected')

      self.currentInfo = '';
    })
    $('.function-list').on('mouseup', 'li', function (e) {
      let current = self.lineArr.find(el => {
        return el.beginValue == self.currentInfo.beginValue;
      });

      current.end.y = $(this).offset().top - parentPosition.top + 50;
      current.end.x = $(this).offset().left - parentPosition.left - 10;
      current.endElement = this;
      current.endValue = $(this).attr('data-right');

      current.line.plot(current.begin.x, current.begin.y, current.end.x, current.end.y);
      $(current.beginElement).addClass('selected')
      $(current.beginElement).attr('data-selected', current.endValue)
      $(this).addClass('selected')

      self.currentInfo = '';
    })
    /* 默认答案 */
    // $('#j-default').click(function (e) {
    //   self.itemForEach()
    // })
    /* 重置 */
    $('#j-reset').click(function (e) {
      self.lineArr.forEach(el => {
        $(el.beginElement).removeClass("selected");
        $(el.beginElement).attr('data-selected', '')
        $(el.endElement).removeClass("selected");
        el.line.hide()
      })
      self.funcLineArr.forEach(el => {
        $(el.beginElement).removeClass("selected");
        $(el.beginElement).attr('data-selected', '')
        $(el.endElement).removeClass("selected");
        el.line.hide()
      })
      $('.result-display').html('')
    })
    /* 确认答案 */
    $('#j-submit').click(function (e) {
      let result = [];
      $('.left-list li').each(function (el) {
        let lefContent = $(this).attr('data-left'),
          leftSelectdContent = $(this).attr('data-selected');

        // func handle
        let isFuncPass = false;
        $('.function-list li').each(function (el) {
          let funcContent = $(this).attr('data-left'),
            funcSelectdContent = $(this).attr('data-selected');
          if (funcContent === leftSelectdContent) {
            isFuncPass = true;
            let item = `<li>${lefContent} + ${funcContent} >>>>>> （经过一些处理） ===> ${funcSelectdContent}</li>`;
            result.push(item)
          }
        })
        if (!isFuncPass && leftSelectdContent) {
          let item = `<li>${lefContent} ===> ${leftSelectdContent}</li>`;
          result.push(item)
        }
      })
      // $('.function-list li').each(function (el) {
      //   let leftEl = $(this).attr('data-left'),
      //     userSelectd = $(this).attr('data-selected');
      //   if (userSelectd) {
      //     let item = `<li>${leftEl} = ${userSelectd}</li>`;
      //     result.push(item)
      //   }
      // })
      result.length ? $('.result-display').html(result) : alert('未选择任何字段！')
      console.log(result);
    })
  },
  /* 绑定父亲事件事件 */
  bindParentsEvent: function (params) {
    let self = this;

    $(document).mouseup(function (e) {
      if (!$(e.target).is(".right-li") && self.currentInfo.line) {
        self.currentInfo.line.hide();
        $("#draw")
          .find(".left-li")
          .removeClass("display-block-hover");
      }
    })
    $('#draw').mousemove(function (e) {
      e.preventDefault();
      if (Object.keys(self.currentInfo).length != 0) {
        let end = {}
        end.x = self.getMousePos(event).x - $("#draw").offset().left;
        end.y = self.getMousePos(event).y - $("#draw").offset().top;
        self.currentInfo.line.plot(self.currentInfo.begin.x, self.currentInfo.begin.y, end.x, end.y);
      }
    })
  },
  /* 创建线条 */
  createLine: function () {
    let self = this,
      line = self.draw.line();
    line.stroke({
      color: "#67C23A",
      width: 2,
      opacity: 0.6,
      linecap: "round"
    });
    line.hide()
    line.click(function () {
      let current = self.lineArr.find(el => {
        return el.line == this;
      });
      $(current.beginElement).removeClass("selected");
      $(current.endElement).removeClass("selected");
      $(current.beginElement).attr('data-selected', '')

      current.endValue = "";
      current.endElement = "";
      current.end = "";

      this.hide();
    });
    line.mouseover(function () {
      let current = self.lineArr.find(el => {
        return el.line == this;
      });
      if (!current) current = self.funcLineArr.find(el => {
        return el.line == this;
      });
      if (current.endValue) {
        let left, top;
        left =
          (current.end.x + current.begin.x - 20) / 2 + "px";
        top =
          (current.end.y + current.begin.y - 20) / 2 + "px";
        $('.remove-btn').css({
          'left': left,
          'top': top
        }).show()
        this.addClass("hover-g");
      }
    });
    line.mouseout(function () {
      $('.remove-btn').hide();
      this.removeClass("hover-g");
    });
    /* line.marker("end", 8, 8, function (add) {
        add.polyline([
            [1, 0],
            [1, 8],
            [7, 4],
            [1, 0]
        ]);
        this.fill("#67C23A");
        this.stroke({
            color: "#67C23A",
            opacity: 0.6,
            width: 1
        });
    }); */
    return line;
  },
  /* 获取鼠标的坐标 */
  getMousePos: function (event) {
    var e = event || window.event;
    var scrollX =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY =
      document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return {
      x: x,
      y: y
    };
  },
  /* ---------- 废弃 ------------ 遍历question-list，存在默认answer，就去answer-list找到，进行连接 */
  itemForEach: function (flag) {
    let self = this,
      parentPosition = $('#draw').offset();

    if ($('.question-list li').length && $('.answer-list li').length) {

      $('li').removeClass('selected')
      $('.question-list li').each(function (params) {
        let obj = {},
          _this = $(this),
          beginValue = _this.attr('data-question'),
          endValue = _this.attr('data-answer');

        obj = self.lineArr.find(el => el.beginValue == beginValue);
        obj.beginElement = this;
        obj.begin = {};
        obj.begin.y = _this.offset().top - parentPosition.top + 15;
        obj.begin.x = _this.offset().left - parentPosition.left + 110;
        $(this).attr('data-selected', '');
        $('.result-display').html('')
        // obj.line.plot(obj.begin.x, obj.begin.y, obj.begin.x, obj.begin.y)
        //判断是否存在初始答案
        if (endValue && !flag) {
          $('.answer-list li').each(function (params) {
            if ($(this).html() == endValue) {
              obj.end = {};

              obj.end.y = $(this).offset().top - parentPosition.top + 15;
              obj.end.x = $(this).offset().left - parentPosition.left - 20;
              obj.endElement = this;
              obj.endValue = endValue;
              obj.line.stroke({
                color: "#E6A23C",
              });
              obj.line.plot(obj.begin.x, obj.begin.y, obj.end.x, obj.end.y);
              obj.line.show()
              $(this).addClass("selected")
              _this.addClass("selected")
            }
          })
        }
      })
    }
  }
}
const Task = function() {
  var _this = this;
  this.running = false;
  this.executeFun = null;
  var queue = [];
  var runningIndex = -1;
  this.getQueue = function() {
    return queue;
  };
  this.addTask = function(obj) {
    queue.push(obj);
    return this;
  };
  this.removeTask = function(obj) {
    var obj1 = null;
    var ls = [];
    for (let i = 0; i < queue.length; i++) {
      if (queue[i] != obj) {
        ls.push(queue[i]);
      } else {
        obj1 = obj;
      }
    }
    queue = ls;
    return obj1;
  };
  this.removeTaskAt = function(index) {
    var obj = null;
    if (index >= 0 && index < queue.length) {
      var ls = [];
      obj = queue[index];
      for (let i = 0; i < queue.length; i++) {
        if (i != index) {
          ls.push(queue[i]);
        }
      }
      queue = ls;
    }
    return obj;
  };
  this.execute = function(index) {
    if (
      queue.length &&
      this.executeFun &&
      this.running == false &&
      index >= 0 &&
      index < queue.length
    ) {
      this.running = true;
      this.executeFun(queue[index], this.running);
      runningIndex = index;
    }
  };
  this.executeFun = function(task, flag) {
    task.flag = flag;
    task.upload();
  };
};
const TimeQueue = function() {
  var _this = this;
  var finish = true;
  var timer = null;
  var stopFlag = false;
  var file = null;
  this.num = 0;
  this.name = "";
  this.id = "";

  this.setFile = function(obj) {
    file = obj;
    this.num = file.num;
    this.name = file.name;
    this.id = file.id;
  };
  this.isStop = function() {
    return finish;
  };
  this.upload = function() {
    if (file && finish) {
      finish = false;
      if (!stopFlag) {
        timer = window.setInterval(function() {
          _upload();
        }, 1000);
        stopFlag = true;
      }
    }
  };
  this.stop = function() {
    finish = true;
  };
  function _upload() {
    if (finish) {
      window.clearTimeout(timer);
      timer = null;
      stopFlag = false;
    } else {
      _this.num++;
    }
  }
};

export { Task, TimeQueue };

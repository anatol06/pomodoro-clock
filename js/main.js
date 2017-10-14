$(document).ready(function() {

  $("#breakValue").hide();
  $("#stop").hide();
  $("#resume").hide();
  $("#reset").hide();

  var workTime   = parseInt($("#workTime").html()),
      breakTime  = parseInt($("#breakTime").html()),
      soundSt    = $('#sound-st')[0],
      soundUp    = $('#sound-up')[0],
      soundBreak = $('#sound-break')[0],
      state      = "work",
      workTimeNow,
      breakTimeNow;

  function workTimer() {
    countWork --;
    if (countWork === 0) {
      soundBreak.play();
      $('#clockText').html('WORK SESSION IS OVER, START THE BRAKE');
      clearInterval(workTimeNow);
      $("#clockValue").hide();
      $("#breakValue").show();
      $("#stop").hide();
      $("#reset").hide();
      $("#start").show();
      state = "break";
      $("#breakValue").html(breakTime + ":00");
    }

    if (countWork % 60 >= 10) {
      $("#clockValue").html(Math.floor(countWork/60) + ":" + countWork%60);
    }
    else {
      $("#clockValue").html(Math.floor(countWork/60) + ":0" + countWork%60);
    }
  } 

  function breakTimer() {
    countBreak --;
    if (countBreak === 0) {
      soundBreak.play();
      $('#clockText').html('BREAK TIME IS OVER, START A NEW WORK SESSION');
      clearInterval(breakTimeNow);
      $("#breakValue").hide();
      $("#clockValue").show();
      $("#stop").hide();
      $("#reset").hide();
      $("#start").show();
      state = "work";
      $("#clockValue").html(workTime + ":00");
    }
    if (countBreak % 60 >= 10) {
      $("#breakValue").html(Math.floor(countBreak/60) + ":" + countBreak%60);
    }
    else {
      $("#breakValue").html(Math.floor(countBreak/60) + ":0" + countBreak%60);
    }
  }
  
  $("#start").bind("mousedown touchstart",function(e) {
    e.preventDefault();
    soundSt.play();
    if (state === "work") {
      countWork = workTime * 60;
      workTimeNow = setInterval(workTimer, 1000);
      $('#clockText').html('WORK SESSION');
    } else if (state === "break") {
      countBreak = breakTime * 60;
      breakTimeNow = setInterval(breakTimer, 1000);
      $('#clockText').html('BREAK TIME');
    } 
  });
  $("#start").bind("mouseup touchend", function(e) {
    e.preventDefault();
    soundUp.play();
    $("#start").hide();
    $("#stop").show();
    $("#resume").hide();
    $("#reset").show();
  });

  $("#stop").bind("mousedown touchstart", function(e) {
    e.preventDefault();
    soundSt.play();     
    if (state==="work") {
      clearInterval(workTimeNow);
      $('#clockText').html('WORK SESSION PAUSED');
    }
    if (state==="break") {
      clearInterval(breakTimeNow);
      $('#clockText').html('BREAK TIME PAUSED');
    }
  });
  $("#stop").bind("mouseup touchend",function(e) {
    e.preventDefault();
    soundUp.play();
    $("#start").hide();
    $("#stop").hide();
    $("#resume").show();
    $("#reset").show();
  });

  $("#resume").bind("mousedown touchstart",function(e) {
    e.preventDefault();
    soundSt.play(); 
    if (state==="work") {
      workTimeNow = setInterval(workTimer, 1000);
      $('#clockText').html('WORK SESSION');
    }
    if (state==="break") {
      breakTimeNow = setInterval(breakTimer, 1000);
      $('#clockText').html('BREAK TIME');
    }
  });
  $("#resume").bind("mouseup touchend",function(e) {
    e.preventDefault();
    soundUp.play();
    $("#stop").show();
    $("#resume").hide();
    $("#reset").show();
  });

  $("#reset").bind("mousedown touchstart",function(e) {
    e.preventDefault();
    soundSt.play();   
    $('#clockText').html('START A NEW WORK SESSION');
    clearInterval(workTimeNow);
    $("#clockValue").html(workTime + ":00");
    clearInterval(breakTimeNow);
    $("#breakValue").html(breakTime + ":00");
    $("#breakValue").hide();
    $("#clockValue").show();
  });
  $("#reset").bind("mouseup touchend",function(e) {
    e.preventDefault();
    soundUp.play();
    $("#stop").hide();
    $("#resume").hide();
    $("#reset").hide();
    $("#start").show();
  });

  $("#workTimePlus").click(function() {
    if (workTime < 60) {
      workTime += 1;
      $("#workTime").html(workTime);
      $("#clockValue").html(workTime + ":00");
    } 
  }); 

  $("#workTimeMinus").click(function() {
    if (workTime > 1) {
      workTime -= 1;
      $("#workTime").html(workTime);
      $("#clockValue").html(workTime + ":00");
    } 
  }); 

  $("#breakTimePlus").click(function() {
    if (breakTime < 60) {
      breakTime += 1;
      $("#breakTime").html(breakTime);
      $("#breakValue").html(breakTime + ":00");
    }
  });

  $("#breakTimeMinus").click(function() {
    if (breakTime > 1) {
      breakTime -= 1;
      $("#breakTime").html(breakTime);
      $("#breakValue").html(breakTime + ":00");
    }
  });

});
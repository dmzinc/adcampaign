function ctaFunction() {
  window.open(__clickUrl);
}

function _dsptr(e) {
  var track = new Image();
  track.src = __eventUrl + e;
}

var ft = true;

function dragft() {
  if (ft) {
    ft = false;
    _dsptr("started");
  }
}

var canvas = $("div.scene");
var backgroundImage = canvas.css("background-image");
var frontImage = $(".frontimg").css("background-image");
canvas.css("background-image", "none");
var col = 2;
var row = 2;
var colWidth = canvas.width() / col - 2;
var rowHeight = canvas.height() / row;
//loop through the cells
for (var i = 0; i < row; i++) {
  for (var j = 0; j < col; j++) {
    var cell = $($(".htm").html())
      .width(colWidth)
      .height(rowHeight)
      .appendTo(canvas);
    cell
      .find(".cube__face--front")
      .css("background", backgroundImage)
      .css(
        "background-position",
        -(j * colWidth) + "px " + -(i * rowHeight) + "px"
      );
    cell
      .find(".cube__face--back")
      .css("background", frontImage)
      .css(
        "background-position",
        -(j * colWidth) + "px " + -(i * rowHeight) + "px"
      );
    cell.click(function () {
      clearInterval(interval);
      if ($(this).hasClass("show-back")) {
      } else {
        $(this).addClass("show-back");
      }
      let len = $(".cube.show-back").length;
      if (len > 3) {
        setTimeout(function () {
          removeAll();
        }, 1000);
      }
    });
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle&acirc;&#128;&brvbar;
  while (m) {
    // Pick a remaining element&acirc;&#128;&brvbar;
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var interval;
interval = setInterval(function () {
  var items = shuffle($(".cube")).slice(0, 1);
  items.addClass("touchme");
  setTimeout(function () {
    items.removeClass("touchme");
  }, 1000);
}, 3000);

var lr = ["left", "right"];
var bt = ["bottom", "top"];

function removeAll() {
  $(".cube").each(function () {
    $(this).css("transition", "all 2s ease-out");
    $(this).css(
      "transform",
      "scale(" +
        randomIntFromInterval(2, 3) +
        ") rotate3d(1,1,1," +
        randomIntFromInterval(30, 180) +
        "deg)"
    );
    let xpos = shuffle(lr).slice(0, 1);
    let ypos = shuffle(bt).slice(0, 1);
    if (xpos == "left") {
      $(this).css("right", "auto");
    } else if (xpos == "right") {
      $(this).css("left", "auto");
    }
    $(this).css("" + xpos + "", "" + randomIntFromInterval(100, 300) + "%");
    if (ypos == "bottom") {
      $(this).css("top", "auto");
    } else if (ypos == "top") {
      $(this).css("bottom", "auto");
    }
    $(this).css("" + ypos + "", "" + randomIntFromInterval(100, 300) + "%");
  });
  setTimeout(function () {
    $(".main_image").css("transform", "scale(1)");
    $(".main_image").css("z-index", "99");
  }, 1000);
}

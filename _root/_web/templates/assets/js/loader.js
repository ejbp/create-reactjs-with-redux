var paceOptions = {
  ajax: false,
  startOnPageLoad: false,
  restartOnPushState: false,
  easeFactor: 0.5
};

var script = document.createElement('script');
script.onload = function () {
  //https://github.hubspot.com/pace/
  Pace.once(
    "done",
    function() {
      Pace.options.restartOnRequestAfter = 10000;
    },
    this
  );

  Pace.start();
};
script.src = "/assets/js/pace.min.js";
document.head.appendChild(script); 


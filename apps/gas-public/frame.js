(function () {
  var EXEC = 'https://script.google.com/macros/s/AKfycbyTDeRXjoTRcFaMzxuAM2C5ekOFqKb1ARsJivwH56bpnP8CieuodPWAFpZ8d_EYh35azg/exec';
  var frame = document.getElementById('gas');
  var loading = document.getElementById('loading');
  var start = Date.now();

  // ← 追加: iframe/loading の高さを実可視高(visualViewport)に合わせる
  var vv = window.visualViewport;
  var fit = function () {
    var h = (vv ? vv.height : window.innerHeight) + 'px';
    frame.style.height = h;
    loading.style.height = h;
  };
  fit();
  if (vv) {
    vv.addEventListener('resize', fit);
    vv.addEventListener('scroll', fit);
  } else {
    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);
  }

  var params = new URLSearchParams(location.search);
  params.set('path', location.pathname.replace(/^\//, ''));
  frame.addEventListener('load', function () {
    var MIN_SHOW = 500;
    var BUFFER   = 300;
    var wait = Math.max(BUFFER, MIN_SHOW - (Date.now() - start));
    setTimeout(function () {
      frame.classList.add('ready');
      loading.classList.add('hide');
      setTimeout(function () { loading.style.display = 'none'; }, 300);
    }, wait);
  });
  frame.src = EXEC + '?' + params.toString();
})();

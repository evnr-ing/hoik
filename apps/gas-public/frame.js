(function () {
  var EXEC = 'https://script.google.com/macros/s/AKfycbyTDeRXjoTRcFaMzxuAM2C5ekOFqKb1ARsJivwH56bpnP8CieuodPWAFpZ8d_EYh35azg/exec';

  var frame = document.getElementById('gas');
  var loading = document.getElementById('loading');
  var start = Date.now();

  // pathInfo を使わない：pathname を ?path= に畳み、既存クエリ（response_id 等）も引き継ぐ
  var params = new URLSearchParams(location.search);
  params.set('path', location.pathname.replace(/^\//, ''));

  frame.addEventListener('load', function () {
    var MIN_SHOW = 500;   // ローディング最低表示ms（チラつき防止）
    var BUFFER   = 300;   // load 後の内側描画バッファms
    var wait = Math.max(BUFFER, MIN_SHOW - (Date.now() - start));

    setTimeout(function () {
      frame.classList.add('ready');
      loading.classList.add('hide');
      setTimeout(function () { loading.style.display = 'none'; }, 300);
    }, wait);
  });

  frame.src = EXEC + '?' + params.toString();
})();

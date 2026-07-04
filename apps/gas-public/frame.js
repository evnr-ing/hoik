(function () {
  var EXEC = 'https://script.google.com/macros/s/AKfycbyTDeRXjoTRcFaMzxuAM2C5ekOFqKb1ARsJivwH56bpnP8CieuodPWAFpZ8d_EYh35azg/exec';

  // pathInfo を使わない：pathname を ?path= に畳み、search の各クエリも引き継ぐ
  var params = new URLSearchParams(location.search);
  params.set('path', location.pathname.replace(/^\//, ''));  // "station/ad13a9dd/family_monthly_plan"

  document.getElementById('gas').src = EXEC + '?' + params.toString();
})()

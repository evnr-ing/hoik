export default async (req) => {
  const EXEC = 'https://script.google.com/macros/s/AKfycbyTDeRXjoTRcFaMzxuAM2C5ekOFqKb1ARsJivwH56bpnP8CieuodPWAFpZ8d_EYh35azg/exec';
  const url = new URL(req.url);
  // /api/xxx?… の xxx を /exec/api/xxx?… に写す
  const target = EXEC + '/api' + url.pathname.replace(/^\/api/, '') + url.search;
  const upstream = await fetch(target, { redirect: 'follow' });
  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: {
      'content-type': upstream.headers.get('content-type') || 'text/plain',
      // 診断用に最終URLを可視化
      'x-final-url': upstream.url,
      'x-upstream-status': String(upstream.status),
    },
  });
};

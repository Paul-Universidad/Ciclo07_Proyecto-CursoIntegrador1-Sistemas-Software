export default async function handler(req, res) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    res.status(500).json({
      error: 'BACKEND_URL no está configurada en Vercel. Añádela en Settings → Environment Variables.',
    });
    return;
  }

  const slug = req.query.path;
  const apiPath = Array.isArray(slug) ? slug.join('/') : (slug ?? '');
  const queryIndex = req.url.indexOf('?');
  const queryString = queryIndex >= 0 ? req.url.slice(queryIndex) : '';
  const targetUrl = `${backendUrl.replace(/\/$/, '')}/api/${apiPath}${queryString}`;

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;

  const init = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
    init.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (!headers['content-type']) {
      init.headers['content-type'] = 'application/json';
    }
  }

  try {
    const response = await fetch(targetUrl, init);
    const body = await response.text();

    res.status(response.status);
    response.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (lower !== 'transfer-encoding' && lower !== 'connection') {
        res.setHeader(key, value);
      }
    });
    res.send(body);
  } catch (error) {
    res.status(502).json({
      error: 'No se pudo conectar con el backend',
      detail: String(error),
    });
  }
}

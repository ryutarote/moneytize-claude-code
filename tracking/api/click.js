function safe(value, max = 500) {
  return String(value || "").slice(0, max);
}

function isAllowedTarget(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" &&
      parsed.hostname === "ryutarote.github.io" &&
      parsed.pathname.startsWith("/web-renewal-studio/");
  } catch {
    return false;
  }
}

module.exports = (req, res) => {
  const target = safe(req.query.u, 2000);
  if (!isAllowedTarget(target)) {
    res.statusCode = 400;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("invalid target");
    return;
  }

  const event = {
    event: "outreach_click",
    ts: new Date().toISOString(),
    campaign: safe(req.query.c, 120),
    slug: safe(req.query.s, 120),
    ip: safe(req.headers["x-forwarded-for"], 120),
    userAgent: safe(req.headers["user-agent"], 500),
    referer: safe(req.headers.referer || req.headers.referrer, 500),
    target
  };

  console.log(JSON.stringify(event));

  res.statusCode = 302;
  res.setHeader("location", target);
  res.setHeader("cache-control", "no-store");
  res.end();
};

module.exports = (html, script) => `<!doctype html>
<html manifest="app.manifest">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b22e44">
    <meta name="apple-mobile-web-app-title" content="Misofome">
    <meta name="application-name" content="Misofome">
    <meta name="theme-color" content="#b22e44">

    <title>Misofome</title>
    <style>
      body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
        padding-top: 64px;
        padding-bottom: 56px;
      }
    </style>
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      var WebFontConfig = {
        google: { families: [ 'Roboto:400,300,500:latin' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    </script>
    <script>
      var script = document.createElement('script');
      script.src = '${script}';
      script.async = false;
      document.head.appendChild(script);
    </script>
  </body>
</html>`;

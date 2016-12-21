module.exports = (html, script) => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <title>Rijk</title>
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

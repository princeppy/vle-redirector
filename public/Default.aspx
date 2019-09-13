<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="VLEDashboard.Default" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="https://appservice.azureedge.net/images/app-service/v3/favicon.ico"
        type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
        name="description"
        content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->

    <link rel="stylesheet" type="text/css" href="https://appservice.azureedge.net/css/app-service/v3/main.css">
    <script src="https://appservice.azureedge.net/scripts/app-service/v3/loc.min.js" crossorigin="anonymous"></script>
    <script type="text/javascript">window.onload = function () {
            try {
                var a = window.location.hostname;
                if (a.includes(".azurewebsites.net")) { a = a.replace(".azurewebsites.net", "") }
                var b = document.getElementById("depCenterLink1");
                b.setAttribute("href", b.getAttribute("href") + "&sitename=" + a);
                loc();
            } catch (d) { }
        }</script>
    <title>VLE Redirector</title>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->

    <script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
    <script src="https://ajax.aspnetcdn.com/ajax/bootstrap/4.1.1/bootstrap.min.js" crossorigin="anonymous"></script>
</body>
</html>

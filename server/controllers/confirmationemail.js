module.exports = {
  html: function(name, link) {
    return (
      `<!DOCTYPE html>

<html style='margin:0;padding:0;height:100%' xmlns='http://www.w3.org/1999/xhtml'>


<head>
<meta content='text/html; charset=utf-8' http-equiv='Content-Type' />
<meta content='IE=edge' http-equiv='X-UA-Compatible' />
<title>Hi there, here's your link.</title>
<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,600);
</style>

<style>
@media (max-width: 149.53367875647666px) {
  .logo-image {
    width: 100%;
  }
}

</style>

<style>
@media only screen and (max-width: 619px) {
  .layout {
    max-width: 600px !important;
    width: 100% !important;
  }
  .nps,
  .rating-numbers {
    Margin-bottom: 10px;
  }
  .nps,
  .rating-numbers,
  .nps div,
  .rating-numbers div {
    display: block !important;
    padding: 0 !important;
    width: auto !important;
  }
  .nps div:first-child a::after {
    content: '– Not At All Likely';
    text-transform: uppercase;
  }
  .nps div:last-child a::after {
    content: ' – Extremely Likely';
    text-transform: uppercase;
  }
}

</style>
<style>
@media only screen and (max-width: 400px) {
  .spacer {
    font-size: 18px !important;
    line-height: 18px !important;
  }
  .button a {
    display: block !important;
  }
}
@media (min-width: 620px) {
  .labels {
    display: table !important;
  }
}
@media (min-width: 401px) {
  .padded {
    padding: 36px 58px !important;
  }
}
</style>

<style>a:hover{text-decoration:underline !important}
a:focus{text-decoration:underline !important}
* a:hover{text-decoration:underline !important}
* a:focus{text-decoration:underline !important}
.button a:hover{text-decoration:none !important}
.button a:focus{text-decoration:none !important}
.nps a:hover{text-decoration:none !important}
.nps a:focus{text-decoration:none !important}
* [lang=x-button] a:hover{text-decoration:none !important}
* [lang=x-button] a:focus{text-decoration:none !important}
* [lang=x-nps] a:hover{text-decoration:none !important}
* [lang=x-nps] a:focus{text-decoration:none !important}
.multiple-choice a:hover{text-decoration:none !important}
.multiple-choice a:focus{text-decoration:none !important}
.customer-effort a:hover{text-decoration:none !important}
.customer-effort a:focus{text-decoration:none !important}
.customer-satisfaction a:hover{text-decoration:none !important}
.customer-satisfaction a:focus{text-decoration:none !important}
.rating a:hover{text-decoration:none !important}
.rating a:focus{text-decoration:none !important}</style></head>
<body style='margin:0;box-sizing:border-box;height:100%'>
<div style='background-color:#C0392B;'>

<table border='0' cellpadding='0' cellspacing='0' height='100%' width='100%'>
<tr>
<td align='left' background='' style='background-repeat: no-repeat; background-size: auto 100%; background-size: cover;' valign='top'>
<div class='wrapper' style='min-width:260px;padding:10px;min-height:100%;box-sizing:border-box;height:100%;font-family:'Open Sans', sans-serif;font-size:11px;font-weight:300;line-height:26px'>
<div style='Margin-bottom: 34px; text-align: right;'>
</div>
<div class='logo' style='text-align: center; margin-bottom: 30px; margin-top: 30px;'><img class='logo-image' alt='GetFeedback' style='-ms-interpolation-mode:bicubic;border:0;vertical-align: bottom;' src='https://getfeedback.imgix.net/uploads/images/5795283/c037210c82eefb755489e0e875c8c9bc39cc59a5.png?ixlib=rb-0.3.4&auto=compress%2Cformat&w=&fit=clip&s=97a5b185bff333baeba205eade5e9945&w=500&h=250&fit=clip' /></div>
<table align='center' class='layout' width='600' style='background-color:#ffffff;border-radius:2px;border-spacing:0;color:#222222;margin-right:auto;margin-left:auto;-webkit-font-smoothing:antialiased;font-family:'Open Sans', sans-serif;font-size:11px;font-weight:300;line-height:26px;width:600px'>
<tr>
<td class='padded' style='padding: 18px 20px; background-color: #ffffff'>
<h1 style='color:#222222;font-family:'Open Sans', sans-serif;font-size:18px;font-weight:bold;line-height:26px;margin:14px 0 14px 0;'>Hi ` +
      name +
      `, Please click the link below to confirm your email</h1>
<center class='button' lang='x-button' xml:lang='x-button'>
<a href=` +
      link +
      ` style='color:#3EA23D;background-color:#3EA23D;border-color:#3EA23D;border-radius:2px;border-style:solid;color:#FFFFFF;font-size:16px;font-weight:bold;text-align:center;text-decoration:none;box-shadow:0px 1px 3px rgba(0,0,0,0.2);border-width:9px 20px;display:inline-block;margin-bottom:14px'>Confirm Email</a>
</center>
</td>
</tr>
</table>
<div class='spacer' style='font-size:36px;line-height:36px'> </div>
<center>
</center>
<div class='spacer' style='font-size:36px;line-height:36px'></div>
</div>
</td>
</tr>
</table>
</div>
</body>
</html>`
    );
  }
};

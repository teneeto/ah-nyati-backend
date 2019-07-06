/**
 *
 *
 * @class Template
 */
class Template {
/**
 *
 *
 * @static
 * @param {*} url
 * @returns { text } html
 * @memberof Template
 */
  static resetEmail(url) {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Arthors Haven</title>
              <style>
                * {
                  box-sizing: border-box;
                }
              html, body{
                height: 100vh;
              }
              body {
                padding: 0;
                margin: 0;
              }
              
              .container {
                height: 50vh;
                align-items: center;
                padding: 20px;
              }
              
              a {
                background: #092467;
                border: none;
                outline: none;
                color: white;
                font-size: 0.8rem;
                cursor: pointer;
                opacity: 0.8;
                padding: 0.8rem;
                width: 10rem;
                text-align: center;
                font-size: 1rem;
              }
              a:hover {
                opacity: 1;
              }
              </style>
            </head>
            <body>
              <div class="container">
                  <h1>Welcome to Authors Haven</h1>
                  <p>You are one step close to becoming a world class writter</p>
                  <p>Kindly click the link below to complete your registration</p><br>
                  <a href="${url}">Confirm Registration</a>
              </div>
            </body>
            </html>`;
  }
}
export default Template;

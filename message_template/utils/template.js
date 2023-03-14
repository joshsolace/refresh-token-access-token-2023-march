exports.emailTemplate = async (first_name, email, phone) => {
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html
        lang="en"
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
      
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Podkova&family=Roboto&display=swap");
      
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
      
            body {
              background: #cccccc;
            }
           
            @media screen and (max-width: 800px) {
              .content {
                width: 100%;
              }
      
              main {
                padding: 0 30px;
                width: auto;
              }
              .mag > img {
                width: 100%;
              }
            }
      
            @media screen and(max-width:500px) {
              .content {
                width: 100%;
              }
              .mag > img {
                width: 100%;
                padding: 2rem;
              }
            }
          </style>
        </head>
      
        <body style="margin: 0 auto; font-family: Open Sans, sans-serif">
          <div style="margin: 0 auto; width: 100%; max-width: 700px">
            <div
              class="mag"
              style="display: flex; align-items: center; justify-content: center"
            >
            </div>
            <main
              style="
                padding: 0rem 2rem;
                margin: 0 auto;
                width: 100%;
                max-width: 700px;
              "
            >
                <div class="image" style="margin-bottom: 30px">
                  <img
                    src="https://res.cloudinary.com/drsimple/image/upload/v1674808971/A115A773-44DA-405F-ABC3-154834B124AE_ylpoqs.jpg"
                    alt=""
                    style="width: 100%"
                  />
                </div>
                <p style="font-size: 18px; line-height: 30px; font-weight: 400">
                  Hello ${first_name}, Welcome to WAKA 😊😊😊😊😊😊😊😊😊😊,  
                </p>
                <p> Your email is: ${email} 
                 Your phone number is  ${phone}!</p>

                  <br />
                  <br />
                  <br />
      
                  <strong>RITRIDES</strong> is a platform that connects drivers and passengers
                  <br />
                  <br />
                  <br />
      
                  We are on a mission to make transportation in Nigeria more efficient and affordable.
                </p>
                <br/>
                <br />
                <br />
                <p
                  class="wel"
                  style="font-size: 18px; line-height: 30px; font-weight: 400"
                >
                  Cheers, <br />
                  The RitRides Team
                </p>
              </div>
            </main>
           
          </div>
        </body>
      </html>`;
  return html;
};

const puppeteer = require("puppeteer");
const path = require('path')

async function sendAd(req, res) {
  try {
    (
      async () => {
      // Lanzamos un nuevo navegador.
      const browser = await puppeteer.launch({
          headless: true,
          slowMo: 100,
          defaultViewport: {
              width: 1000,
              height: 1220
            }
      });
      // Abrimos una nueva página.
      const page = await browser.newPage();
  
      await handlerAd(page, "https://www.seminuevos.com/login", browser);
    })();
  
    async function handlerAd (page, url, browser){
      await page.goto(url, {
          waitUntil:["load", "domcontentloaded", "networkidle0", "networkidle2"]
      })
  
      const $user = "#email_login",
          $password = "#password_login",
          user = "altamiraarmando@gmail.com", 
          password = "miContraseña30",
          $km = "#input_recorrido",
          km = "20000",
          $precio = "#input_precio",
          precio = req.query.precio,
          $descripcion = "#input_text_area_review",
          descripcion = req.query.descripcion,
          $tel = "#input_teléfono",
          tel = "4498985612",
          path = require('path')
  
      await page.waitForSelector($user);
      await page.type($user, user)
      await page.type($password, password)
      await page.click('#sigin-form > button[type="submit"]')
      await page.waitForSelector("#primaryNav");
      await page.click('html.latam-theme body#body.search-section.home-section.top-search.userIsLogged header#public-layout div.container.white div#logo-opensearch ul#primaryNav.hide-on-med-and-down.user-nav li.cta-btn a.btn-primary')
      await page.waitForSelector(".card-content");
      await page.click('div.card:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(2)')
      await page.click("#dropdown_brands > div:nth-child(1) > div:nth-child(1) > ul:nth-child(3) > li:nth-child(1) > a:nth-child(1)")
      await page.click("div.card:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > a:nth-child(2)")
      await page.click('#dropdown_models > div:nth-child(1) > div:nth-child(1) > ul:nth-child(3) > li:nth-child(2) > a:nth-child(1)')
      await page.click('div.s12:nth-child(4) > div:nth-child(1) > a:nth-child(2)')
      await page.click('#dropdown_subtypes > div:nth-child(1) > div:nth-child(1) > ul:nth-child(3) > li:nth-child(4) > a:nth-child(1)')
      await page.click('div.col:nth-child(5) > div:nth-child(1) > a:nth-child(2)')
      await page.click('#dropdown_years > div:nth-child(1) > div:nth-child(1) > ul:nth-child(3) > li:nth-child(6) > a:nth-child(1)')
      await page.click('div.col:nth-child(6) > div:nth-child(1) > a:nth-child(2)')
      await page.click('#dropdown_provinces > div:nth-child(1) > div:nth-child(1) > ul:nth-child(3) > li:nth-child(19) > a:nth-child(1)')
      await page.click('div.col:nth-child(7) > div:nth-child(1) > a:nth-child(2)')
      await page.click('#dropdown_cities > div:nth-child(1) > div:nth-child(1) > ul:nth-child(3) > li:nth-child(52) > a:nth-child(1)')
      await page.type($km, km)
      //await page.type($tel, tel)
      await page.type($precio, precio)
      await page.click('.next-button')
      await page.waitForSelector("#input_text_area_review");
      await page.type($descripcion, descripcion)
      const [fileChooser1] = await Promise.all([
          page.waitForFileChooser(),
          page.click('#Uploader'), // some button that triggers file selection
        ]);
      await fileChooser1.accept([path.resolve(__dirname, 'img','2020.jpg')]);
      const [fileChooser2] = await Promise.all([
          page.waitForFileChooser(),
          page.click('#Uploader'), // some button that triggers file selection
        ]);
      await fileChooser2.accept([path.resolve(__dirname, 'img','hyy.jpg')]);
      const [fileChooser3] = await Promise.all([
          page.waitForFileChooser(),
          page.click('#Uploader'), // some button that triggers file selection
        ]);
      await fileChooser3.accept([path.resolve(__dirname, 'img','images.jpg')]);
      await page.click('button.next-button:nth-child(2)')
      //await page.waitForSelector(".back-footer");
      await page.waitForTimeout(10000)
      await page.click('#login-bar > div > a'); 
      await page.click('.go-dashboard') ;
      await page.waitForSelector("#navigation");
      await page.click('.main-nav > li:nth-child(2) > a:nth-child(1)') 
      await page.click('.open > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)') 
      await page.waitForSelector("#content");
      await page.click('html body.theme-grey div.wrapper-main div#content.container-fluid.nav-fixed div.row-fluid div.span9.border-left div#main div.row-fluid div.span12.search div.search-results ul li.vehicle div.row-fluid div.span10.m-b a') 
      await page.waitForSelector(".back-footer");
      setTimeout(() => {
        page.screenshot({
          path: path.resolve(__dirname, `screen.jpg`)
        });
      }, 4000);
      setTimeout(() => {
        res.status(201).send(`${path.resolve(__dirname, "screen.jpg")}`);
        page.close()
      }, 6000);
  }


    } catch (e) {
      res.status(500).send({ message: e.message });
    }
}

//miContraseña30

module.exports = {
  sendAd,
};

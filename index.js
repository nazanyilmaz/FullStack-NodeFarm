const http = require("http"); //modulu dosyaya import etme yontemidir.
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate"); //import ettik
const url = require("url");

//replaceTemplate();

//API: gelen istekleri izler ve cevap gonderir
//CreateServer methoduda verdigimiz callback function tetiklendi ise bir API istegi gelmistir.buna bir cevap gondermemiz lazim res.end ile cevap gonderir.
let tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
let tempProduct = fs.readFileSync("./templates/template-product.html", "utf-8");
let tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");

let data = fs.readFileSync("./dev-data/data.json", "utf-8"); //bu json formatinda bunu js verisine cevirelim.
const dataObj = JSON.parse(data); // bu sekilde JSON verisini JS formatina ceviririz

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  switch (pathname) {
    case "/overview":
      //data.json map ile donup herbiri icin icerige ozel card html olusturma
      const cardHTML = dataObj.map((el) => replaceTemplate(tempCard, el));
      tempOverview = tempOverview.replace("{%PRODUCT_CARDS%}", cardHTML); //anasayfa templateindeki kart alanina card.html ekleyecegiz
      return res.end(tempOverview);

    case "/product":
      const item = dataObj.find((item) => item.id == query.id); //url'deki id'ye karsilik gelen elemani bul
      //console.log(item);
      const output = replaceTemplate(tempProduct, item); //bulunan id verilerine gore guncelle
      //client'a gonder
      return res.end(output);

    default:
      return res.end("Cann't found page");
  }
});
//hangi adrese gelen istekleri dinleyecegini soylemeliyiz
server.listen(4000, "127.0.0.1", () => {
  console.log("4000. port running");
});

//Routing,Api e gelen istegin hangi uc naoktaya(enpoint'e) geldigini tesbit edip ona gore cevap gonderme

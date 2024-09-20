//card.htmlde degisken olan alanlara urun bilgilerini ekleyip urune ozel olusam karti dondurecek

const replaceTemplate = (cardTemplate, data) => {
  // console.log(cardTemplate, el);
  let output = cardTemplate.replace(/{%PRODUCTNAME%}/g, data?.productName);
  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace("{%QUANTITY%}", data.quantity);
  output = output.replace("{%ID%}", data.id);
  output = output.replace("{%FROM%}", data.from);
  output = output.replace("{%NUTRIENTS%}", data.nutrients);
  output = output.replace("{%DESCRIPTION%}", data.description);
  output = output.replace(/{%IMAGE%}/g, data.image); //birden fazla yerde image oldugu icin hepsini degistirmek icin
  //urun organik degilse notorganik yerine not-organic clasini eklemme lazim
  if (data.organic === false) {
    output = output.replace("{%NOT_ORGANIC%}", "not-organic");
  }
  return output;
};

module.exports = replaceTemplate; // olusturulan fonksiyonu export etme

const fs = require('fs');

let rawdata = fs.readFileSync('./details.json');
let data = JSON.parse(rawdata);

const outputPath = "./output/";

let ASN = [];

data.relays.forEach(node => {
  if (ASN.indexOf(node.as) === -1) ASN.push(node.as);
})

fs.writeFileSync(outputPath + "ASN.json", JSON.stringify(ASN, null, 4));

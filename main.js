const fs = require('fs');
const fetch = require('node-fetch');

const tor_json = "./details.json";

const downloadFile = (async (url, path) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
});

if (downloadFile("https://onionoo.torproject.org/details?search=flag:exit", tor_json)) {
  let rawdata = fs.readFileSync(tor_json);
  let data = JSON.parse(rawdata);
  const outputPath = "./output/";

  let Node = [];

  data.relays.forEach(node => {
    const item = { nickname: node.nickname, exit_address: node.exit_addresses, asn: node.as }
    Node.push(item)
  })

  let ASN = [];

  data.relays.forEach(node => {
    if (ASN.indexOf(node.as) === -1) ASN.push(node.as);
  })

  fs.writeFileSync(outputPath + "nodes.json", JSON.stringify(Node, null, 4));
  fs.writeFileSync(outputPath + "ASN.json", JSON.stringify(ASN, null, 4));
}


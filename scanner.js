const fs = require('fs');

let rawdata = fs.readFileSync('./details.json');
let data = JSON.parse(rawdata);

const outputPath = "./output/";

let Node = [];

data.relays.forEach(node => {
  const item = {nickname: node.nickname, exit_address: node.exit_addresses, asn: node.as}
  Node.push(item)
})

fs.writeFileSync(outputPath + "nodes.json", JSON.stringify(Node, null, 4));

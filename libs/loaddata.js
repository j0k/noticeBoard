var request = new XMLHttpRequest()

var newsData = {"data":[]};
var tmpV = {"a":"v"}

function getAccData(){
  request.open('GET', 'https://testnodes.wavesnodes.com/addresses/data/3Mpn5eiqDUw7LjoFaqrcS3cBAqEKm8cxokM', true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      //console.log(data);
      newsData["data"] = data;

      checkUpdates();
      // data.forEach(movie => {
      //   console.log(movie.title)
      // })
    } else {
      console.log('error')
    }
  }

  request.send()
}

function makeANoteWithWaves(note, author){
  var noteWithWaves = {
     call: {
       args: [{ type: 'string', value:  note}, { type: 'string', value: author}],
       //args: [{ type: 'binary', value: '' }],
       //args: [{ type: 'string', value: '' }],
       //args: [{ type: 'boolean', value: '' }],
       function: 'note',
     },
     payment: [{
       amount: 500000,
       assetId: null
     }],
     dApp: '3Mpn5eiqDUw7LjoFaqrcS3cBAqEKm8cxokM',
     //chainId: 'T',
     fee: 100000,
     //feeAssetId: '73pu8pHFNpj9tmWuYjqnZ962tXzJvLGX86dxjZxGYhoK',
     //senderPublicKey: 'by default derived from seed',
     //timestamp: Date.now(),
     //fee: 100000,
     //chainId:
  }

  WavesKeeper.signAndPublishTransaction(noteWithWaves)
}

function submitButton(){
  var news = $('#news').val()
  var contact = $('#contact').val()


  var amount = 500;
  var tokens = "4p2Vu1KsAqhNwh2ehWFp7fEwvjv6N14HQF3eC9FeFhM6"
  if ($("#option1")["0"].checked){
    amount = "0.005"
    tokens = "WAVES"
  }
  WavesKeeper.signAndPublishTransaction({
          type: 16,
          data: {
               fee: {
                   "tokens": "0.005",
                   "assetId": "WAVES"
               },
               dApp: '3Mpn5eiqDUw7LjoFaqrcS3cBAqEKm8cxokM',
               call: {
               		function: 'note',
               		args: [
               		    {
               		      "type": "string",
               		      "value": news
               		    },{
               		      "type": "string",
               		      "value": contact
               		    }]
               	}, payment: [{assetId: tokens, tokens: amount}]
          }
     }).then((tx) => {
          console.log("Fine");
     }).catch((error) => {
          console.error("Error", error);
     });
}

function addListNode(news, contact){
  var li =  document.createElement("li");
  var div = document.createElement("div");
  div.className="news-text"
  var para = document.createElement("p");
  var node = document.createTextNode(news);
  para.appendChild(node);

  var cont = document.createTextNode("- "+contact);

  div.appendChild(para);
  li.appendChild(div);
  li.appendChild(cont);
  return li;
}

function deleteChilds() {
  var e = document.getElementById("allnews");

  var first = e.firstElementChild;
  while (first) {
       first.remove();
     first = e.firstElementChild;
  }
}

var currentNNote = 0
function checkUpdates(){
  var toUpdate = false;
  for(var i = 0 ; i<newsData["data"].length;i++){
    dat = newsData["data"][i]
    if ((dat["key"] == "currentNNote") && (dat["value"] != currentNNote)){
      currentNNote = dat["value"];
      toUpdate = true;
    }
  }

  if (toUpdate){
    for(var i = 0 ; i<newsData["data"].length;i++){
      dat = newsData["data"][i]
      splits = dat["key"].split("_")
      if (splits.length >= 2){
        num = parseInt(splits[1]);

        if (! ("A" in newsData))
          newsData["A"] = {}

        if (!(num in newsData["A"]))
          newsData["A"][num] = {}

        var note = newsData["A"][num]
        switch(splits[0]){
          case "n":note["news"] = dat["value"];
            break;
          case "a":note["author"] = dat["value"];
            break;
          case "addr":note["addr"] = splits[2]
        }
      }
    }

    deleteChilds();
    board = document.getElementById("allnews");
    news = newsData["A"]
    arr  = Object.keys(news).sort(function(a,b){parseInt(b) - parseInt(a)}).reverse()

    for(var i in arr){
      e = arr[i]
      board.appendChild(addListNode(news[e]["news"], news[e]["author"]));
    }
  }
}

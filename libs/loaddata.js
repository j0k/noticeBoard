var request = new XMLHttpRequest()


function getAccData(){
  request.open('GET', 'https://testnodes.wavesnodes.com/addresses/data/3MteeMicpvRbmpGtb55Ym7qajPGJqju6DfD', true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      console.log(data);
      return data;
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

// WavesKeeper.signAndPublishTransaction({
//         type: 16,
//         data: {
//              fee: {
//                  "tokens": "0.05",
//                  "assetId": "WAVES"
//              },
//              dApp: '3Mpn5eiqDUw7LjoFaqrcS3cBAqEKm8cxokM',
//              call: {
//              		function: 'note',
//              		args: [
//              		    {
//              		      "type": "string",
//              		      "value": "Hello swk"
//              		    },{
//              		      "type": "string",
//              		      "value": "me"
//              		    }]
//              	}, payment: [{assetId: "4p2Vu1KsAqhNwh2ehWFp7fEwvjv6N14HQF3eC9FeFhM6", tokens: 500}]
//         }
//    }).then((tx) => {
//         console.log("Ура! Я выполнил скрипт!!!");
//    }).catch((error) => {
//         console.error("Что-то пошло не так", error);
//    });

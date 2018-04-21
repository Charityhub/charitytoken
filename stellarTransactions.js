var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
//Get Account Detailsvar StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var sequenceNumber;

var test;

module.exports = {

  getSequenceNumber: async function(){

//.accountId("GCP4E64EPLGX72W5ANTC72NR4DSCZ76UGUAEIIBYVWAVBZP4AXPJWOGE")
       test =  server.accounts()
      .accountId("GCP4E64EPLGX72W5ANTC72NR4DSCZ76UGUAEIIBYVWAVBZP4AXPJWOGE")
      .call()
      .then(function (accountResult) {
      //  console.log(accountResult.sequence);
        sequenceNumber = accountResult.sequence;
        //console.log("inn seqnumb = "+sequenceNumber);
        return sequenceNumber;
      }).catch(function (err) {
        console.error(err);
      });
  //var result = await sequenceNumber;

    //alert(result);
    return test;
  },


  getAccountBalance: function(){

      return server.accounts()
    .accountId("GCP4E64EPLGX72W5ANTC72NR4DSCZ76UGUAEIIBYVWAVBZP4AXPJWOGE")
    .call()
    .then(function (accountResult) {
        return accountResult;
    })
    .catch(function (err) {
      console.error(err);
    });
  },

  buyToken: function(issuingKeys, donation_amount){

    var testDollar = new StellarSdk.Asset('TestToken123', 'GCP4E64EPLGX72W5ANTC72NR4DSCZ76UGUAEIIBYVWAVBZP4AXPJWOGE');

    var transaction;
    //var transactionID;
// .fromSecret('SC27NJPOCKFVYPMXI5GZORSC4XAJ5S5TGO3B7TWQEKN64BOVGWG5NNFD');

  /*
        try{
        var issuingKeys = StellarSdk.Keypair
         .fromSecret('SC27NJPOCKFVYPMXI5GZORSC4XAJ5S5TGO3B7TWQEKN64BOVGWG5NNFD123');
*/
          console.log(issuingKeys.publicKey());
          return server.loadAccount(issuingKeys.publicKey())
          .then(function(issuer) {
            var transaction = new StellarSdk.TransactionBuilder(issuer)
          .addOperation(StellarSdk.Operation.changeTrust({
           asset: testDollar,
           limit: '1000'
          }))
          .addOperation(StellarSdk.Operation.manageOffer({
            selling: StellarSdk.Asset.native(),
            buying: testDollar,
            amount: donation_amount,
            price: 1,
            offerID: 0,
          }))
          .build();

          //transaction.sign(issuingKeys);
          //return server.submitTransaction(transaction);
        //
        return transaction;
        //
    /*  }).then(function(result){
        console.log(result);
        console.log('----- Envelope:', result.toEnvelope().toXDR().toString("base64"));*/
      })
      .catch(function(error) {
        return -1;
      });









  }




}
/*
    getSequenceNumber().then(function(seq){
      console.log(seq);
    });
*/

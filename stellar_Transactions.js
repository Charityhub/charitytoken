var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();

module.exports = {

  create_sendToken: function(issuingKeys, receivingKeys, assetName, assetAmount){

    var asset = new StellarSdk.Asset(assetName, issuingKeys.publicKey());


    server.loadAccount(receivingKeys.publicKey())
      .then(function(receiver) {
        var transaction = new StellarSdk.TransactionBuilder(receiver)

          .addOperation(StellarSdk.Operation.changeTrust({
            asset: asset
          }))
          .build();
        transaction.sign(receivingKeys);
        return server.submitTransaction(transaction);
      })


      .then(function() {
        return server.loadAccount(issuingKeys.publicKey())
      })
      .then(function(issuer) {
        var transaction = new StellarSdk.TransactionBuilder(issuer)
          .addOperation(StellarSdk.Operation.payment({
            destination: receivingKeys.publicKey(),
            asset: asset,
            amount: assetAmount
          }))
          .build();
        transaction.sign(issuingKeys);
        return server.submitTransaction(transaction);
      }) 
      .catch(function(error) {
        return error;
      });

  },

  buyToken: function(BuyAccountID, IssuerID, assetName, assetAmount){

    var asset = new StellarSdk.Asset(assetName, IssuerID);

      server.loadAccount(BuyAccountID)
      .then(function(receiver) {
        var transaction = new StellarSdk.TransactionBuilder(receiver)
          .addOperation(StellarSdk.Operation.manageOffer({
            Selling: asset,
            Buying: new StellarSdk.Asset.native(),
            Amount: 0,
            Price: 1
          }))
          .build();

          return transaction;
      })
      .catch(function(error) {
        return error;
      });

  },

  offerBuyToken: function(BuyAccountKeys, IssuerID, assetName, assetAmount){

    var asset = new StellarSdk.Asset(assetName, IssuerID);


    server.loadAccount(BuyAccountKeys.publicKey())
      .then(function(receiver) {

        var transaction = new StellarSdk.TransactionBuilder(issuer)
          .addOperation(StellarSdk.Operation.manageOffer({
            Selling: new StellarSdk.Asset.native(),
            Buying: asset,
            Amount: assetAmount,
            Price: 1
          }))
          .build();
        return transaction;

      })
      .catch(function(error) {
          return error;
      });

  },

  offerSellToken: function(SellAccountKeys, IssuerID, assetName, assetAmount){

    var asset = new StellarSdk.Asset(assetName, IssuerID);


    server.loadAccount(BuyAccountKeys.publicKey())
      .then(function(receiver) {
        var transaction = new StellarSdk.TransactionBuilder(receiver)
          .addOperation(StellarSdk.Operation.manageOffer({
            Selling: asset,
            Buying: new StellarSdk.Asset.native(),
            Amount: assetAmount,
            Price: 1
          }))
          .build();
        return transaction
      })
      .catch(function(error) {
          return error;
      });

  },

  setMultisig: function(accountKey, signer_ID, lowthreshold, medthreshold, highthreshold){


          return server.loadAccount(accountKey.publicKey())
          .then(function(issuer) {
            var transaction = new StellarSdk.TransactionBuilder(issuer)
          .addOperation(StellarSdk.Operation.setOptions({
           lowThreshold: lowthreshold,
           medThreshold: medthreshold,
           highThreshold: highthreshold,
           signer: {ed25519PublicKey: signer_ID, weight:1}
          }))
          .build();

          return transaction;
          })
      .catch(function(error) {
          return error;
      });

  },

  sendPayment: function(OriginID, DestinationID, amount){


    server.loadAccount(OriginID)
      .then(function(receiver) {

        var transaction = new StellarSdk.TransactionBuilder(issuer)
          .addOperation(StellarSdk.Operation.payment({
            Destination: DestinationID,
            Asset: new StellarSdk.Asset.native(),
            Amount: amount
          }))
          .build();
        return transaction;
        })
      .catch(function(error) {
          return error;
      });


  }


}

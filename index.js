var express = require("express");

var app = express();
var timeStamp = require('unix-timestamp')
var StellarSdk = require('stellar-sdk');
var bodyParser = require("body-parser");


var knex = require('knex');

var db = knex(
    {
    client: 'pg',
    connection: {
    host : '/cloudsql/daring-bit-197609:us-central1:charityhub-db',

    user : '',
    password : '',
    database : ''

    }
});




app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));


app.get('/home', (req,res)=>{


  res.render("home");
});


var sequenceNumber;




app.post('/subscribe', (req,res)=>{


  db.insert({
    email:req.body.email,
    campaign_id: parseInt(req.body.campaign_id)
  }).into('subscription').then(()=>{
    
    res.render("subscribe");
  }).catch(function(err){console.log(err);})
  
});


app.get('/tft-tourism', (req,res)=>{

  var server = new StellarSdk.Server('https://horizon.stellar.org');

  var trade_data = [];
  var total_donation = 0;
  var currentTime = Math.round((new Date()).getTime() / 1000) ;
  var campaign_deadline = 1556751600;
  var time_left = computeTimeSinceDonation(currentTime, campaign_deadline);
  var escrow_id = 'GB36BS44SVVBB26WOBHPZMPW72ZMFTHQSYBAQ3MS77YATZ773YHFRJ7C';
  var donate_account = [];
  server.trades()
    .forAssetPair(new StellarSdk.Asset.native(), new StellarSdk.Asset('CHARITY0TFT1', 'GBI4OTGDR7FNPN5KUU2JAV55TZQOH4N7S6CWFAYGTOOFMB5FSZY3EVTJ'))
    .call()
    .then(function(resp)
    {
      for(var i = 0;i<resp.records.length;i++)
        {

          var current_acc = resp.records[i];
          if(current_acc.counter_account==escrow_id)
            {
              total_donation+= parseFloat(current_acc.base_amount);
              var trans = {public_key: current_acc.base_account, donation_amount: current_acc.base_amount, timeSinceDonation: computeTimeSinceDonation(timeStamp.fromDate(current_acc.ledger_close_time), currentTime)};
              trade_data.push(trans);
              if (!donate_account.includes(current_acc.base_account)) donate_account.push(current_acc.base_account);
            }
          
        }
        console.log(trade_data);
        console.log('total donation = '+total_donation);
        res.render("campaign_tft_tourism",{transaction:trade_data, total_donation: total_donation, time_left: time_left, donate_account:donate_account});


    })
    .catch(function(err) { console.log(err); })

});


app.get('/tft-eddecoration', (req,res)=>{

  var server = new StellarSdk.Server('https://horizon.stellar.org');

  var trade_data = [];
  var total_donation = 0;
  var currentTime = Math.round((new Date()).getTime() / 1000) ;
  var campaign_deadline = 1546210800;
  var time_left = computeTimeSinceDonation(currentTime, campaign_deadline);
  var escrow_id = 'GDZXRCZCPX5EXTYFFE47QAIC5PM6H454YFIQSTRGAQZNG6H5TCVZYOPZ';
  var donate_account = [];

  server.trades()
    .forAssetPair(new StellarSdk.Asset.native(), new StellarSdk.Asset('CHARITY0TFT2', 'GBI4OTGDR7FNPN5KUU2JAV55TZQOH4N7S6CWFAYGTOOFMB5FSZY3EVTJ'))
    .call()
    .then(function(resp)
    {
      for(var i = 0;i<resp.records.length;i++)
        {

          var current_acc = resp.records[i];
          if(current_acc.counter_account==escrow_id)
          {
            total_donation+= parseFloat(current_acc.base_amount);
            var trans = {public_key: current_acc.base_account, donation_amount: current_acc.base_amount, timeSinceDonation: computeTimeSinceDonation(timeStamp.fromDate(current_acc.ledger_close_time), currentTime)};
            trade_data.push(trans);
          
            if (!donate_account.includes(current_acc.base_account)) donate_account.push(current_acc.base_account);
          }
          
        }
        
        
        res.render("campaign_ed_decoration",{transaction:trade_data, total_donation: total_donation,time_left:time_left, donate_account: donate_account});


    })
    .catch(function(err) { console.log(err); })

});











function computeTimeSinceDonation(donationTime, currentTime)
{
    var time = Math.ceil((currentTime-donationTime)/60);
    
    if(time<60) return time+" Minutes";
    else if(time<1440) return Math.floor(time/60)+" Hours";
    else return Math.floor(time/1440)+" Days";
}


var server = app.listen(process.env.PORT || '8080', function(){
  console.log('App listening on port %s', server.address().port);
});

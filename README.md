# Charity Hub - Stellar Donation Crowdfunding Platform


[Charity Hub] facilitates donation crowdfunding by acting as an ICO platform to issue stellar based asset tokens for charities. Under the concept “Donate without Doubt. Payment by Result”, donors get the visibility and verifiability into each project by leveraging [Stellar]’s strength such as token creation, built-in exchange, multi-signature escrow account, and timebound, with third-party participation as an oracle.

For more details on how our platform works, please visit us at [Charity Hub]

In this document, we explain how we leveraged [Stellar] to facilitate the features on our platform.

### Crowdfunding Stellar Token 

Once the charity provides details on the campaign, funding requirements, deadlines and the corresponding sub-campaigns, Charity Hub issues a campaign specific token to raise fund.

Here are the high level steps involved in Stellar:

Four accounts are involved in the process - Charity Hub Account,
Campaign Owner Account, Validator  Account and Fundraising Escrow Account.

1. Charity Hub creates a Fundraising Escrow Account 
2. Charity Hub issues a fundraising token and sends it to the Fundraising Escrow Account
3. Charity Hub sets the Fudraising Escrow Account as a multisignature account requiring signature from the Campaign Owner and Validator
4. Fundraising Escrow Account creates an offer to sell the fundraising token at the price and quantity to match with the fundraising goal
5. Fundraising Escrow Accounts creates a time bounded offer to buy the token back in case the campaign fails to reach the fund raising goal by the fund raising deadline
6. If the funding goal is achieved by the fundraising deadline, the funds are used to support the sub-campaigns described in the next section

The sellar operations required for the above steps follow closely to the descriptions provided in [Stellar Crowdfunding] and [Stellar Smart Contracts]

### Releasing Funds to Campaign Owner With Validator Oracle 

Funds in the Fundraising Escrow Account are locked and will be realeased to the campaign owner after the campaign owner successfully acieves the target for each sub-campaign.

But how do we know whether the campaign owner actually completes the goal of each sub-campaign? This is where the validator comes in. A third party auditor is assigned to validate whether the campaign owner actually completes the target of each sub-campaign. The campaign owner must provide evidence for the auditor to check and validate. Once validation is complete, the reward money will be released to the campaign owner.

At a high level, the steps in Stellar are as follow:
1. Charity Hub creates transactions to send funds from the Fundraising Escrow Account to the Campaign Owner account (each transaction correspond to the reward associated to each sub-campaign). These transactions are pre-signed by the Campaign Owner. The Validator will only sign each transaction once it has validated the completion of the sub-campaign.
2. Charity Hub creates a set of time-bounded transactions to buy the donation token back in case the Campaign Owner fails to complete all the sub-campaigns by the end of the campaign execution deadline. These transactions are presigned by both the Campaign Owner and Validator.

Here are the steps in Stellar:

Let:
Q = number of subcampaign
S(q) = reward for each subcampaign
M = the current sequence number of the Fundraising Escrow account

A set of transactions are  created to send funds to the Campaign Owner account based on the reward associated with each sub-campaign. The Validator will only sign the transaction after it has completed the verification process for each sub-campaign.


    Fund Transfer Transactions:
        Account: Fundraising Escrow
        Sequence Number: M+1 to M+Q
        Operations: Send S(q) XLM to Campaign Owner Account
        Required Signature: Campaign Owner & Validator

In parallel, to guarantee that the Campaign Owner will refund the money back in the case where it fails to complete all the sub-campaign goals by the end of the campaign execution deadline, Charity Hub create a set of pre-signed transactions (with sequence number M+1 to M+Q) to issue a buy offer for the token upfront with minimum timebound set to the deadline date. For example, if the campaign owner completed only "j" out of the Q subcampaigns by the end of the campaign execution deadline, we can submit the refund transaction with sequence number M+j+1 to the network.

    Refund Transactions:
        Account: Fundraising Escrow
        Sequence Number: M+1 to M+Q
        Time Bound: minimum time - campaign deadline
        Operations: Create offer to buy all the Fundraising Token
        Required Signature: Campaign Owner & Validator

### Future Phase / Road Map
1. Integration to third party exchange to convert xlm to charities' preferred fiat currency
2. Integration to third party wallet to facilitate seamless donation experience
3. Account profiles for donors, charities, and validators
4. Consideration of adding donor representative into multi-signature escrow account
5. Improved refund mechanism - currently supports first come first serve but would shift to pro-rata basis
6. Flexible cancellation of ongoing campaign - currently donor refunds only happen at the end of a fixed deadline


## FAQ
### What is Charity Hub?
Charity Hub is an XLM-based donation crowdfunding platform that facilitates donation by acting as an ICO platform to issue stellar based asset tokens for charities. The platform focuses on visibility and verifiability, under the concept “Donate without Doubt. Payment by Result”. Charity Hub helps good-minded individuals and organizations raise fund by leveraging Stellar’s strength such as token creation, built-in exchange, multi-signature escrow account, and time bound, with third-party participation as an oracle. Donations will be held in an escrow pool and only released when proof of work has been submitted to and verified by a Validator. We believe this will eliminate the stigma that many donors traditionally have on actual impact of their contribution - resulting in a larger donation pool for charities.

### Why did we choose to do a charity platform on stellar network?
To answer this, we would like to break the question down into two parts: 1) why do a charity platform? and 2) why built in on stellar’s network?

1) We decided to build a charity platform because, through our work at [CRM Charity], we realized that the main barriers to donation are visibility and verifiability. Therefore, we want to build an application that resolves these issues by taking advantages of the features and functionalities in Stellar.

2) Implementing our platform on Stellar provides several advantages. First, through cryptocurrency such as lumen, donations can be processed seamlessly and without boundary. We hope this would allow for a bigger donation fund for the charities. Secondly, Stellar network is known for low transaction cost and high speed, which is ideal for this application.  

## How does Charity Hub work?

1. CHARITY submit a Campaign
2. DONOR donate to a Campaign by buying Campaign Token 
3. Payment for the first Sub-Campaign released 
4. CHARITY submit Proof of Works
5. VALIDATOR verify Proof of Works
6. VALIDATOR Sign-off a Campaign
7. Payment release for the next Sub-Campaign

## How do validator verify charity's work?
Upon completion of a sub-campaign, charity must send proof of work (pictures, certifying document, etc.) to validator for review. Should validator approve, the multi signature mechanism will release advance funding for the next sub-campaign. In later phase, we plan to implement profile and rating mechanism for donor, charity, and validator for check and balance purposes.  

## How to help contribute to Charity Hub?
For suggestion/feedback: http://charity-hub.org/contact-us/
For donation: GBAQOXM4JDAPHL4VUJAJWL3CIKP7ENLWKWTKI7VOQJKTIEI7VCIOTKGX

## How can I trust you?

Charity Hub is under [CRM Charity], a registered nonprofit foundation that aims to help other people by using our expertise in technology. We focus in improving people’s education, and also helping other non-profit organization in area of technologies. Based in Bangkok, the foundation is initiated by the team of CRM and Cloud Consulting Company Limited, the cloud computing and IT consulting expert in Thailand and the sponsors from technology companies and international organization.

CRM Charity Foundation: http://www.crm-c.org/ 
Certificate of Foundation Registration:
http://www.ratchakitcha.soc.go.th/DATA/PDF/2555/D/074/80.PDF 
English Translation can be found here:
https://drive.google.com/drive/folders/16moZHDICtrrFeyYjXE4SpLtX9TzHN85X
  

    
    
   [Stellar Crowdfunding]: <https://www.stellar.org/blog/multisig-and-simple-contracts-stellar>
   [CRM Charity]: <http://www.crm-c.org/>
   [Stellar Smart Contracts]: <https://www.stellar.org/developers/guides/walkthroughs/stellar-smart-contracts.html>
   [Stellar]: <https://www.stellar.org/>
   [Charity Hub]: <http://charity-hub.org>
   


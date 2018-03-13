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
6. If the funding goal is achieved by the deadline, the funds are used to support the sub-campaigns described in the next section

The sellar operations required for the above steps follow closely to the descriptions provided in [Stellar Crowdfunding] and [Stellar Smart Contracts]

### Releasing Funds to Campaign Owner With Validator Oracle 

Funds in the Fundraising Escrow Account are locked and will be realeased to the campaign owner after the campaign owner successfully acieves the target for each sub-campaign.

But how do we know whether the campaign owner actually completes the goal of each sub-campaign? This is where the validator comes in. A third party auditor is assigned to validate whether the campaign owner actually completes the target of each sub-campaign. The campaign owner must provide evidence for the auditor to check and validate. Once validation is complete, the reward money will be released to the campaign owner.

At a high level, the steps in Stellar are as follow:
1. Charity Hub creates transactions to send funds from the Fundraising Escrow Account to the Campaign Owner account (each transaction correspond to the reward associated to each sub-campaign). These transactions are pre-signed by the Campaign Owner. The Validator will only sign each transaction once it has validated the completion of the sub-campaign
2. Charity Hub creates a set of time-bounded transactions to buy the donation token back in case the Campaign Owner fails to complete all the sub-campaigns by the end of the campaign execution deadline

Here are the steps in Stellar:

Let:
Q = number of subcampaign
S(q) = reward for each subcampaign
M = the current sequence number of the Fundraising Escrow account

A set of transactions are  created to send funds to the Campaign Owner account based on the reward associated with each sub-campaign. The Validator will only sign the transaction after it has completed the verification process for each sub-campaign.


    Fund Transfer Transactions:
        Account: Execution Escrow
        Sequence Number: M+1 to M+Q
        Operations: Send S(q) XLM to Campaign Owner Account
        Required Signature: Charity Hub, Campaign Owner, Validator

In parallel, to guarantee that the Campaign Owner will refund the money back in the case where it fails to complete all the sub-campaign goals by the end of the campaign execution deadline, we create a set of pre-signed transactions (with sequence number M+1 to M+Q) to issue a buy offer for the token upfront with minimum timebound set to the deadline date. For example, if the campaign owner completed only "j" out of the Q subcampaigns by the end of the campaign execution deadline, then we can submit the refund transaction with sequence number M+j+1 to the network.

    Refund Transactions:
        Account: Execution Escrow
        Sequence Number: M+1 to M+Q
        Time Bound: minimum time - campaign deadline
        Operations: Create offer to buy all the Fundraising Token
        Required Signature: Charity Hub, Campaign Owner, Validator


We've shared the javascript code we used to execute these stellar operations in this github repository. 

    
    
   [Stellar Crowdfunding]: <https://www.stellar.org/blog/multisig-and-simple-contracts-stellar>
   [Stellar Smart Contracts]: <https://www.stellar.org/developers/guides/walkthroughs/stellar-smart-contracts.html>
   [Stellar]: <https://www.stellar.org/>
   [Charity Hub]: <http://charity-hub.org>
   

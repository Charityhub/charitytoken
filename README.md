# Charity Hub - Stellar Donation Crowdfunding Platform


[Charity Hub] facilitates donation crowdfunding by acting as an ICO platform to issue stellar based asset tokens for charities. Under the concept “Donate without Doubt. Payment by Result”, donors get the visibility and verifiability into each project by leveraging [Stellar]’s strength such as token creation, built-in exchange, multi-signature escrow account, and timebound, with third-party participation as an oracle.

For more details on how our platform works, please visit us at [Charity Hub]

In this document, we explain how we leveraged [Stellar] logics and operations to facilitate the features on our platform.

### Crowdfunding Stellar Token 

Once the charity provides details on the campaign, funding requirements, deadlines and the corresponding sub-campaigns, Charity Hub issues a campaign specific token to raise fund.

Here are the high level steps involved in Stellar:

Four accounts are involved in the process - Charity Hub Account,
Campaign Owner Account, Fundraising Escrow Account and Execution Escrow Account.

1. Charity Hub creates a Fundraising Escrow Account and Execution Escrow Account
2. Charity Hub issues a fundraising token and sends it to the Fundraising Escrow Account
3. Charity Hub sets both the Fudraising and Execution escrow accounts as multisignature accounts requiring signature from Charity Hub and Campaign Owner
4. Fundraising Escrow Account creates an offer to sell the fundraising token at the price to match with the fundraising goal
5. If the campaign fails to reach the fund raising goal by a certain deadline, the Fundraising Escrow Account creates an offer to buy the fundraising token back
6. Otherwise, if the campaign succeeds, the Fundraising Escrow Account sends the money to the Execution Escrow Account

The sellar operations required for the above steps follow closely to the descriptions provided in [Stellar Crowdfunding] and [Stellar Smart Contracts]

### Releasing Funds to Campaign Owner With Validator Oracle 

Funds in the Execution Escrow Account are locked and will be realeased in small amounts to the campaign owner only after the campaign owner successfully achieves the target for each sub-campaign.

But how do we know whether the campaign owner actually completes the goal of each sub-campaign? This is where a third party auditor comes in. A third party auditor is assigned to validate whether the campaign owner actually completes the target of each sub-campaign. The campaign owner must provide evidence for the auditor to check and validate. Once validation is complete, then the reward money will be released to the campaign owner.

At a high level, the steps in Stellar are as follow:
1. The Execution Escrow Account is set to require another signature from the Validator to perform any transaction - so now the Execution Escrow Account requires signature from Charity Hub, Campaign Owner, and the Validator.
2. Charity Hub creates transactions to send funds from the Execution Escrow Account to the Campaign Owner account (each transaction correspond to the reward assciated to each sub-campaign). These transactions are pre-signed by Charity Hub and Campaign Owner. The Validator will only sign each transaction once it has validated the completion of the sub-campaign.
3. In the case that the Campaign Owner is not able to complete all the sub-campaign goals by a certain deadline, the Execution Escrow Account issues a buy offer for the fundraising token to refund the remaining money back.

Let:
Q = number of subcampaign,
S(q) = reward for each subcampaign,
M = the current sequence number of the Execution Escrow account

    Multisignature Transaction:
        Account: Execution Escrow
        Sequence Number: M+1 
        Operations: Set Options - set low threshold & medium threshold to 3 and add Validator as signer with weight 1
        Required Signature: Charity Hub, Campaign Onwer


A set of transactions are then created to send funds to the Campaign Onwer account based on the reward associated with each sub-campaign. Note that the Validator will only sign the transaction after it has completed the verification process for each sub-campaign.

Let's assume Y is the current sequence number of the Execution Escrow account. So after the transaction above, Y = M+1.

    Fund Transfer Transactions:
        Account: Execution Escrow
        Sequence Number: Y+1 to Y+Q
        Operations: Send S(q) XLM to Campaign Owner Account
        Required Signature: Charity Hub, Campaign Onwer, Validator

In parallel, to guarantee that the Campaign Onwer will refund the money back in the case where it fails to complete all the sub-campaign goals by the end of the deadline, we create a set of pre-signed transactions (with sequence number Y+1 to Y+Q) to issue a buy offer for the token upfront with minimum timebound set to the deadline date. For example, if the campaign owner completed only "j" out of the Q subcampaigns by the end of the deadline, then we can submit the refund transaction with sequence number Y+j+1 to the network.

    Refund Transactions:
        Account: Execution Escrow
        Sequence Number: Y+1 to Y+Q
        Time Bound: minimum time - campaign deadline
        Operations: Create offer to buy all the Fundraising Token
        Required Signature: Charity Hub, Campaign Owner, Validator


    
    
   [Stellar Crowdfunding]: <https://www.stellar.org/blog/multisig-and-simple-contracts-stellar>
   [Stellar Smart Contracts]: <https://www.stellar.org/developers/guides/walkthroughs/stellar-smart-contracts.html>
   [Stellar]: <https://www.stellar.org/>
   [Charity Hub]: <http://charity-hub.org>
   



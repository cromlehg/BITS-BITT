![BITT and BITS Tokens](logo.png "BITT and BITS Token")

# BITS Token smart contract

* _Standard_        : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : BITS
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_        : BITS
* _[Decimals](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#decimals)_    : 18
* _Emission_        : Single
* _Crowdsales_      : 1
* _Fiat dependency_ : No
* _Tokens locked_   : No
* _Token issue_     : 500 000 000

# BITT Token smart contract

* _Standard_        : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : BITT
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_        : BITT
* _[Decimals](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#decimals)_    : 18
* _Emission_        : Single
* _Crowdsales_      : 1
* _Fiat dependency_ : No
* _Tokens locked_   : No
* _Token issue_     : 500 000 000

## Smart-contracts description

There is a special function to return 3rd party tokens that were sent by mistake (function retrieveTokens()).  
Each stage has a direct minting function in wei. This is made to support the external payment gateways.

### Contracts contains
1. _BITSToken_ - BITS Token contract
2. _BITTToken_ - BITT Token contract
3. _ITO_ - ITO contract

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call finishMinting after each crowdsale milestone!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint tokens by calling _mintTokensByETHExternal_ and _mintTokensExternal_.

### How to invest
To purchase tokens investor should send ETH (more than minimum 0.1 ETH) to corresponding crowdsale contract.
Recommended GAS: 250000, GAS PRICE - 21 Gwei.

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

Investor must not use other wallets, coinmarkets or stocks. Can lose money.

## Tokens distribution for BITT

* _Manual_          : 60%
* _For sale agent_  : 20%
* _Founders_        : 10%
* _Advisors_        : 5%
* _Reserv_          : 3%
* _Bounty_          : 2%

## Tokens distribution for BITS

* _Manual_          : 60%
* _For sale agent_  : 20%
* _Founders_        : 20%

## Main network configuration 

* _BITT Manual tokens wallet_    : 0x08C32a099E59c7e913B16cAd4a6C988f1a5A7216
* _BITS Manual tokens wallet_    : 0xc0f1a3E91C2D0Bcc5CD398D05F851C2Fb1F3fE30
* _BITT Founders tokens wallet_  : 0x3019B9ad002Ddec2F49e14FB591c8CcD81800847
* _BITS Founders tokens wallet_  : 0x3019B9ad002Ddec2F49e14FB591c8CcD81800847
* _BITT Advisors tokens wallet_  : 0x18fd87AAB645fd4c0cEBc21fb0a271E1E2bA5363
* _BITT Reserv tokens wallet_    : 0x1eC03A084Cc02754776a9fEffC4b47dAE4800620
* _BITT Bounty tokens wallet_    : 0xb119f842E6A10Dc545Af3c53ff28250B5F45F9b2
* _Contracts manager_            :
* _ETH Collect wallet_           : 0xc3d1F75e71DfBD3F7D34C6852F4eC6621C32745f

### Links
1. _BITT Token_ - 
2. _BITS Token_ - 
3. _ITO_ - 


### ITO
* _Minimal insvested limit_     : 0.1 ETH
* _Base price_                  : 1 ETH = ... Tokens
* _Hardcap_                     : ... ETH
* _Softcap_                     : ... ETH
* _Period_                      : ... days
* _Start_                       : ...
* _Wallet_                      : 

#### Features
More than 25ETH - send to investors one same value BITT tokens


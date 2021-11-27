# NFT Metadata Scraper for Web3 Projects
A simple scraper for Ethereum based NFT projects.
Aimed at creating a base for derivative (CCO) projects.

```
# 1
yarn install

# 2
Add the specified ENV variables (env-sample) in a newely created .env file in the root

# 3
Replace the contents of abi.json with your projects ABI (get this from the Etherscan contract page)

# 4
Run yarn scrape:metadata to download all tokens metadata to json files
Run yarn scrape:assets to download all specific imagery at a certain endpoint.
```

by Matty Woodward
mwdwrd@gmail.com

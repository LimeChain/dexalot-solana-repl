<div align="center">
<h1>Solana REPL Interface</h1> 
<img width="200px" src="https://github.com/user-attachments/assets/15f60a6b-5126-4159-aa95-ced58efbd467" />
</div>


A command-line interface (CLI) tool for interacting with Solana programs.

## Features

- Wallet Management
  - Create new wallets
  - Load existing wallets
  - Print active wallet address
  - Check SOL balances of active wallet
  - Request SOL airdrops (devnet)

- Token Operations
  - List supported tokens
  - View token details
  - Add new tokens (admin only)
  - Remove tokens (admin only)
  - Mint SPL tokens to active wallet (admin only)
  - Check token balances of active wallet

- Transaction Features
  - Deposit SOL to program vault
  - Deposit SPL tokens to program vault
  - View vault balances

## Prerequisites

- node.js
- npm
- ts-node

## Installation

```bash
npm install
```
## Usage
1. Start the REPL interface:

```bash
ts-node main.ts
```

2. Use the numbered menu to interact with different features:
   - 1-3: Wallet management
   - 4-5: SOL operations
   - 6-9: Token management
   - 10-15: Transaction operations
   - 16: Exit

## Configuration

- The program uses Solana devnet by default
- Default wallet path is set to `./admin.json`
- Program ID: `7gyXGXDd3medjvNJA3ge7sYAkhyjy19vQ3kbMdZ9K4V6`

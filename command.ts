export enum Commands {
  CreateWallet = "\n1.  Create Wallet",
  SetActiveWallet = "2.  Set Active Wallet",
  PrintWallet = "3.  Print Wallet Address",
  ShowBalance = "4.  Show Balance of active wallet",
  Airdrop = "5.  Airdrop SOL",
  ListSupported = "6.  List Supported Tokens",
  TokenDetails = "7.  Get Token Details",
  AddToken = "8.  Add Token (only admin)",
  RemoveToken = "9.  Remove Token (only admin)",
  ProgramBalance = "10. Get SOL Vault Balance",
  DepositSol = "11. Deposit SOL",
  MintSPLToken = "12. Mint SPL token (only admin)",
  GetSPLTokenBalance = "13. Get SPL token balance of active wallet",
  GetSPLTokenVaultBalance = "14. Get SPL token vault balance",
  DepositSPL = "15. Deposit SPL token",
  Exit = "16. Exit\n",
}

export const printCommands = () => {
  console.log("================================================");
  for (const option of Object.values(Commands)) {
    console.log(option);
  }
  console.log("================================================");
};

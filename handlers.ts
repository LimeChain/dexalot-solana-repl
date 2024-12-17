import { AnchorProvider, BN, Program, Wallet, web3 } from "@coral-xyz/anchor";
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionConfirmationStrategy,
} from "@solana/web3.js";
import * as fs from "fs";
import { getUserInput, padSymbol } from "./utils";

import { getAccountPubKey } from "./utils";
import { Portfolio } from "./types/portfolio";
import {
  getAccount,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { createMint } from "@solana/spl-token";
import { green } from "kleur";

export const createKeypair = async (keyPath: string): Promise<Keypair> => {
  if (!keyPath) {
    console.clear();
    keyPath = await getUserInput("Enter the path to the wallet file: ");
  }

  if (fs.existsSync(keyPath)) {
    throw new Error("Wallet file already exists");
  }

  let keypair: Keypair = Keypair.generate();

  const secretKeyArray = Array.from(keypair.secretKey);
  fs.writeFileSync(keyPath, JSON.stringify(secretKeyArray));

  return keypair;
};

export const loadKeypair = async (keyPath: string): Promise<Keypair> => {
  if (!keyPath) {
    console.clear();
    keyPath = await getUserInput("Enter the path to the wallet file: ");
  }

  if (!fs.existsSync(keyPath)) {
    throw new Error("Wallet file does not exist");
  }

  const secretKeyArray = JSON.parse(fs.readFileSync(keyPath, "utf-8"));
  const secretKey = new Uint8Array(secretKeyArray);

  return Keypair.fromSecretKey(secretKey);
};

export const printWallet = async (wallet: Wallet) => {
  console.clear();
  console.log(green(`Wallet address: ${wallet.publicKey.toString()}\n\n`));
};

export const airdrop = async (
  wallet: Wallet,
  provider: AnchorProvider,
  connection: Connection
) => {
  const amount = Number(
    await getUserInput("Enter the amount of SOL to airdrop: ")
  );
  const signature = await connection.requestAirdrop(
    wallet.publicKey,
    amount * web3.LAMPORTS_PER_SOL
  );
  console.clear();
  console.log(green(`Airdrop request sent with signature: ${signature}\n\n`));

  await provider.connection.confirmTransaction(
    { signature } as TransactionConfirmationStrategy,
    "confirmed"
  );
};

export const showBalance = async (wallet: Wallet, provider: AnchorProvider) => {
  const balance = await provider.connection.getBalance(wallet.publicKey);
  console.clear();
  console.log(green(`Balance: ${balance / web3.LAMPORTS_PER_SOL} SOL\n\n`));
};

export const getParsedTokenList = async (
  programId: PublicKey,
  connection: Connection,
  program: Program<Portfolio>
) => {
  const tokenListPDA = getAccountPubKey(program, [
    Buffer.from("token_list"),
    Buffer.from("0"),
  ]);
  let tokenListAccount = await program.account.tokenList.fetch(tokenListPDA);

  const tokens = tokenListAccount.tokens.map((tokenBuffer) => {
    return Buffer.from(tokenBuffer).toString().replace(/\0/g, "");
  });
  console.clear();
  console.log(green(`Supported tokens: ${tokens.join(", ")}\n\n`));
};

export const getTokenDetails = async (program: Program<Portfolio>) => {
  const symbol = (
    await getUserInput("Enter the symbol of the token: ")
  ).toUpperCase();
  const symbolPadded = padSymbol(symbol);
  const [tokenDetails, tokenDetailsBump] =
    web3.PublicKey.findProgramAddressSync(
      [Buffer.from("token_details"), symbolPadded],
      program.programId
    );
  let tokenDetailsAccount = await program.account.tokenDetails.fetch(
    tokenDetails
  );
  console.clear();
  console.log(
    green(
      `Token: ${symbol}\nToken decimals: ${tokenDetailsAccount.decimals}\nToken address: ${tokenDetailsAccount.tokenAddress}\n`
    )
  );
};

export const addToken = async (
  program: Program<Portfolio>,
  connection: Connection,
  authority: Keypair
) => {
  const tokenSymbol = (
    await getUserInput("Enter the symbol of the token: ")
  ).toUpperCase();
  const tokenDecimals = Number(
    await getUserInput("Enter the decimals of the token: ")
  );
  const symbolPadded = padSymbol(tokenSymbol);

  // Derive PDAs using the helper function
  const adminPDA = getAccountPubKey(program, [
    Buffer.from("admin"),
    authority.publicKey.toBuffer(),
  ]);

  const [tokenDetails, tokenDetailsBump] =
    web3.PublicKey.findProgramAddressSync(
      [Buffer.from("token_details"), symbolPadded],
      program.programId
    );

  const tokenListPDA = getAccountPubKey(program, [
    Buffer.from("token_list"),
    Buffer.from("0"),
  ]);

  // Create a new SPL Token Mint for testing
  const newTokenMint = await createMint(
    connection,
    authority, // Payer
    authority.publicKey, // Mint authority
    null, // Freeze authority
    tokenDecimals // Decimals
  );

  // Call the add_token instruction
  await program.methods
    .addToken(Array.from(symbolPadded), newTokenMint, tokenDecimals)
    .accounts({
      authority: authority.publicKey,
      // @ts-ignore
      admin: adminPDA,
      portfolio: program.programId,
      token_details: tokenDetails,
      tokenMint: newTokenMint,
      system_program: web3.SystemProgram.programId,
      token_program: TOKEN_PROGRAM_ID,
      associated_token_program: TOKEN_PROGRAM_ID,
    })
    .remainingAccounts([
      { pubkey: tokenListPDA, isSigner: false, isWritable: true },
    ])
    .rpc({ commitment: "confirmed" });
};

export const removeToken = async (
  program: Program<Portfolio>,
  authority: Keypair
) => {
  const symbol = await getUserInput(
    "Enter the symbol of the token to remove: "
  );
  const symbolPadded = Buffer.alloc(32);
  symbolPadded.set(Buffer.from(symbol));

  // Derive PDAs
  const [adminPDA, adminBump] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("admin"), authority.publicKey.toBuffer()],
    program.programId
  );

  // Derive the sol_details PDA
  const [tokenDetails, solDetailsBump] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("token_details"), symbolPadded],
    program.programId
  );

  const [tokenList, tokenListBump] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("token_list"), Buffer.from("0")],
    program.programId
  );

  // Call the `initialize` instruction
  console.log("Initializing program...");
  await program.methods
    //@ts-ignore
    .removeToken(symbolPadded)
    .accounts({
      authority: authority.publicKey, // Pass the authority (payer account)
      //@ts-ignore
      tokenDetails,
      admin: adminPDA,
      receiver: authority.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .remainingAccounts([
      {
        pubkey: tokenList,
        isWritable: true,
        isSigner: false,
      },
    ])
    .rpc();
};

export const getProgramBalance = async (
  connection: Connection,
  program: Program<Portfolio>
) => {
  const nativeVaultPDA = getAccountPubKey(program, [
    Buffer.from("native_vault"),
  ]);
  const balance = await connection.getBalance(nativeVaultPDA);

  console.clear();
  console.log(
    green(`Program balance: ${balance / web3.LAMPORTS_PER_SOL} SOL\n\n`)
  );
};

export const depositSOL = async (
  program: Program<Portfolio>,
  authority: Keypair
) => {
  const amount = Number(
    await getUserInput("Enter the amount of SOL to deposit: ")
  );
  const nativeVaultPDA = getAccountPubKey(program, [
    Buffer.from("native_vault"),
  ]);

  const lamports = web3.LAMPORTS_PER_SOL * amount;
  console.log(lamports);
  await program.methods
    .depositNative(new BN(lamports))
    .accounts({
      // @ts-ignore
      authority: authority.publicKey,
      nativeVault: nativeVaultPDA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc({ commitment: "confirmed" });
};

export const depositSPLToken = async (
  program: Program<Portfolio>,
  authority: Keypair,
  connection: Connection
) => {
  const tokenSymbol = (
    await getUserInput("Enter the symbol of the token: ")
  ).toUpperCase();
  const symbolPadded = padSymbol(tokenSymbol);
  const amount = Number(
    await getUserInput("Enter the amount of tokens to deposit: ")
  );

  const tokenDetailsPDA = getAccountPubKey(program, [
    Buffer.from("token_details"),
    symbolPadded,
  ]);

  const tokenDetails = await program.account.tokenDetails.fetch(
    tokenDetailsPDA
  );

  if (!tokenDetails.tokenAddress) {
    throw new Error("Token address not found!");
  }

  const userATA = await getOrCreateAssociatedTokenAccount(
    connection,
    authority,
    tokenDetails.tokenAddress,
    authority.publicKey // User authority
  );

  // Fetch the program's vault associated token account
  const vaultATA = await getOrCreateAssociatedTokenAccount(
    connection,
    authority,
    tokenDetails.tokenAddress,
    program.programId // Program authority
  );

  await program.methods
    .deposit(Array.from(symbolPadded), new BN(amount * web3.LAMPORTS_PER_SOL))
    .accounts({
      user: authority.publicKey,
      // @ts-ignore
      tokenDetails: tokenDetailsPDA,
      from: userATA.address,
      to: vaultATA.address,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .signers([authority])
    .rpc({ commitment: "confirmed" });

  console.clear();
  console.log(green(`Deposited ${amount} tokens to ${vaultATA.address}\n\n`));
};

export const mintSPLToken = async (
  program: Program<Portfolio>,
  authority: Keypair,
  connection: Connection
) => {
  const tokenSymbol = (
    await getUserInput("Enter the symbol of the token: ")
  ).toUpperCase();
  const symbolPadded = padSymbol(tokenSymbol);
  const amount = Number(
    await getUserInput("Enter the amount of tokens to mint: ")
  );

  const tokenDetailsPDA = getAccountPubKey(program, [
    Buffer.from("token_details"),
    symbolPadded,
  ]);

  const tokenDetails = await program.account.tokenDetails.fetch(
    tokenDetailsPDA
  );
  if (!tokenDetails.tokenAddress) {
    throw new Error("Token address not found!");
  }

  const userATA = await getOrCreateAssociatedTokenAccount(
    connection,
    authority,
    tokenDetails.tokenAddress,
    authority.publicKey // User authority
  );

  // Mint 100 tokens to the user's associated token account
  await mintTo(
    connection,
    authority,
    tokenDetails.tokenAddress,
    userATA.address,
    authority.publicKey, // Mint authority
    amount * web3.LAMPORTS_PER_SOL // Amount in base units
  );

  console.clear();
  console.log(green(`Minted ${amount} tokens to ${userATA.address}\n\n`));
};

export const checkSPLTokenBalance = async (
  program: Program<Portfolio>,
  authority: Keypair,
  connection: Connection
) => {
  const tokenSymbol = (
    await getUserInput("Enter the symbol of the token: ")
  ).toUpperCase();
  const symbolPadded = padSymbol(tokenSymbol);

  const tokenDetailsPDA = getAccountPubKey(program, [
    Buffer.from("token_details"),
    symbolPadded,
  ]);

  const tokenDetails = await program.account.tokenDetails.fetch(
    tokenDetailsPDA
  );

  if (!tokenDetails.tokenAddress) {
    throw new Error("Token address not found!");
  }

  const tokenAccountAddress = await getAssociatedTokenAddress(
    tokenDetails.tokenAddress,
    authority.publicKey
  );

  // Fetch token account info
  const tokenAccount = await getAccount(connection, tokenAccountAddress);

  console.clear();
  console.log(
    green(`Balance: ${BigInt(tokenAccount.amount)} ${tokenSymbol}\n\n`)
  );
};

export const getSPLTokenVaultBalance = async (
  program: Program<Portfolio>,
  authority: Keypair,
  connection: Connection
) => {
  const tokenSymbol = (
    await getUserInput("Enter the symbol of the token: ")
  ).toUpperCase();
  const symbolPadded = padSymbol(tokenSymbol);

  const tokenDetailsPDA = getAccountPubKey(program, [
    Buffer.from("token_details"),
    symbolPadded,
  ]);

  const tokenDetails = await program.account.tokenDetails.fetch(
    tokenDetailsPDA
  );

  if (!tokenDetails.tokenAddress) {
    throw new Error("Token address not found!");
  }

  const vaultATA = await getOrCreateAssociatedTokenAccount(
    connection,
    authority,
    tokenDetails.tokenAddress,
    program.programId // Program authority
  );

  console.clear();
  console.log(green(`Balance: ${BigInt(vaultATA.amount)} ${tokenSymbol}\n\n`));
};

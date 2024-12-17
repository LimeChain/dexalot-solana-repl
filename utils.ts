// @ts-ignore-line
import readline from "readline";
import { web3 } from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Portfolio } from "./types/portfolio";

export const getUserInput = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

export const getAccountPubKey = (
  program: Program<Portfolio>,
  seed: any[]
): web3.PublicKey => {
  let [pubkey, bump] = web3.PublicKey.findProgramAddressSync(
    seed,
    program.programId
  );

  return pubkey;
};

export const padSymbol = (symbol: string): Uint8Array => {
  const buffer = Buffer.alloc(32, 0); // Initialize a 32-byte buffer filled with zeros
  const symbolBuffer = Buffer.from(symbol);
  if (symbolBuffer.length > 32) {
    throw new Error("Symbol exceeds 32 bytes");
  }
  symbolBuffer.copy(buffer, 0); // Copy the symbol bytes to the start of the buffer
  return buffer;
};

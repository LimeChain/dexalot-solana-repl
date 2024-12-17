import { getUserInput } from "./utils";
import { printCommands } from "./command";
import Interactor from "./interactor";
import { green } from "kleur";
import { red } from "kleur";

const main = async () => {
  while (true) {
    console.clear();
    printCommands();
    const command = Number(await getUserInput("Enter command: \n"));
    switch (command) {
      case 1:
        await Interactor.createWallet();
        break;
      case 2:
        await Interactor.loadWallet();
        break;
      case 3:
        await Interactor.printWallet();
        break;
      case 4:
        await Interactor.showBalance();
        break;
      case 5:
        await Interactor.requestAirdrop();
        break;
      case 6:
        await Interactor.getTokenList();
        break;
      case 7:
        await Interactor.getTokenDetails();
        break;
      case 8:
        await Interactor.addToken();
        break;
      case 9:
        await Interactor.removeToken();
        break;
      case 10:
        await Interactor.getProgramBalance();
        break;
      case 11:
        await Interactor.depositSol();
        break;
      case 12:
        await Interactor.mintSPLToken();
        break;
      case 13:
        await Interactor.checkSPLTokenBalance();
        break;
      case 14:
        await Interactor.getSPLTokenVaultBalance();
        break;
      case 15:
        await Interactor.depositSPLToken();
        break;
      case 16:
        console.log(green("Exiting..."));
        process.exit(0);
        break;
      default:
        console.error(red("\n\nInvalid command!\n\n"));
    }
    await getUserInput("Press any key to continue...");
  }
};

main();

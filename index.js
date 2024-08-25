const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

const getWalletBalance = async () => {
  try {
    const connection = new Connection("http://localhost:8899", "confirmed");
    const walletBalance = await connection.getBalance(publicKey);

    console.log(`wallet ballance is ${walletBalance}`);
  } catch (error) {
    console.log(error);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection("http://localhost:8899", "confirmed");

    const SOLANA_QUANTITY = 2 * LAMPORTS_PER_SOL;

    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      SOLANA_QUANTITY
    );

    await connection.confirmTransaction({
      signature: fromAirDropSignature,
    });
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  console.log(publicKey);
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

main();

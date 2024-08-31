import Solana, { PublicKey } from "@solana/web3.js";

const connection: Solana.Connection = new Solana.Connection(
  Solana.clusterApiUrl("mainnet-beta")
);

export const fetchPortfolio = async (pubkey: PublicKey): Promise<number> => {
  const balance = await connection.getBalance(pubkey);

  return balance;
};

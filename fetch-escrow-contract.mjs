import fs from "node:fs";
import env from '@next/env';

const CONTRACT_OUTPUT_PATH = './src/shared/api/client/escrow/contract-abi.ts';

const projectDir = process.cwd()
env.loadEnvConfig(projectDir);

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!NEXT_PUBLIC_API_URL)
	throw new Error('NEXT_PUBLIC_API_URL not defined');

(async () => {
	const endpoint = `${NEXT_PUBLIC_API_URL}api/contract/abi`;
	console.log(`Fetcing smart contract form ${endpoint}...`);

	const response = await fetch(endpoint);
	const data = await response.json();

	console.log(`Writing the contract to ${CONTRACT_OUTPUT_PATH}...`);
	fs.writeFileSync(CONTRACT_OUTPUT_PATH, `export const escrowContractAbi = ${JSON.stringify(data, undefined, '\t')} as const`);

	console.log(`Done!`);
})()
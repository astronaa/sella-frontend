import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";
import env from '@next/env';
import eslint from 'eslint';

const TYPES_OUTPUT_PATH = './src/shared/api/openapi.d.ts';
const SPEC_OUTPUT_PATH = './src/shared/api/openapi.yaml';

const projectDir = process.cwd()
env.loadEnvConfig(projectDir);

const DOCS_FILE_URL = process.env.DOCS_FILE_URL;
if (!DOCS_FILE_URL)
	throw new Error('DOCS_FILE_URL not defined');

const response = await fetch(DOCS_FILE_URL);
if(!response.ok) {
	console.log('Failed to fetch the spec');
	process.exit(1);
}

const data = await response.text();

const ast = await openapiTS(data);
const contents = astToString(ast);

fs.writeFileSync(TYPES_OUTPUT_PATH, contents);
fs.writeFileSync(SPEC_OUTPUT_PATH, data);

console.log(TYPES_OUTPUT_PATH, 'written, now starting linting...');

const linter = new eslint.ESLint({ fix: true });
const results = await linter.lintFiles(TYPES_OUTPUT_PATH);
await eslint.ESLint.outputFixes(results);

console.log('Openapi types successfully generated!');
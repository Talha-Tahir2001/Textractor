import { writeFile } from 'fs';
import { join } from 'path';
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'});

const envFile = `export const environment = {
    API_KEY: '${process.env.API_KEY}',    
};
`;
const targetPath = join(__dirname, './src/environments/environment.development.ts');
writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
    }
});
import path = require('path');
import { ReadOptions } from '../psd';

import {
	readPsdFromFile
	} from './common';


const testFilesPath = path.join(__dirname, '..', '..', 'test');
const readFilesPath = path.join(testFilesPath, 'read');
// const readWriteFilesPath = path.join(testFilesPath, 'read-write');
// const resultsFilesPath = path.join(__dirname, '..', '..', 'results');
const opts: ReadOptions = {
	throwForMissingFeatures: true,
	logMissingFeatures: true,
};

const blendModePSDPath = path.join(readFilesPath, 'blend-mode', 'src.psd')

const psd = readPsdFromFile(blendModePSDPath, { ...opts });

const filterFXPSDPath = path.join(readFilesPath, 'filterFX', 'src.psd')

// @ts-ignore
const filerFXPSD = readPsdFromFile(filterFXPSDPath, { ...opts });

console.log(psd)
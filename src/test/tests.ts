// import path = require('path');
import fs = require('fs')
import yargs = require('yargs')
import { ReadOptions } from '../psd';

import {
	readPsdFromFile} from './common';
import path = require('path');


// const testFilesPath = path.join(__dirname, '..', '..', 'test');
// const readFilesPath = path.join(testFilesPath, 'read');
// const readWriteFilesPath = path.join(testFilesPath, 'read-write');
// const resultsFilesPath = path.join(__dirname, '..', '..', 'results');
const opts: ReadOptions = {
	throwForMissingFeatures: true,
	logMissingFeatures: true,
	useImageData: true
};

const options = yargs
 .usage("Usage: -p <path>")
 .option("p", { alias: "path", describe: "psd folder", type: "string", demandOption: true })
 .argv;
// const blendModePSDPath = path.join(readFilesPath, 'blend-mode', 'src.psd')

// // @ts-ignore
// const psd = readPsdFromFile(blendModePSDPath, { ...opts });

// @ts-ignore
const filePath = options.path

const files = getFiles(filePath)

for (let index = 0; index < files.length; index++) {
	const fileActualPath = files[index];
	const extName = path.extname(fileActualPath)
	
	let allowRead = extName.toLowerCase() == '.psd'
	const dev = process.env.TS_NODE_DEV == 'true'
	if (dev) {
		allowRead = allowRead &&  fileActualPath.includes('滤镜')
	}


	if (allowRead) {
	console.log(fileActualPath)
	// const fileActualPath = path.join(filePath , fileName)
	const psdFile = readPsdFromFile(fileActualPath, { ...opts });
	const dataFIlePath = fileActualPath + '.data.json'
	delete psdFile.canvas
	psdFile.children?.forEach(x => {
		delete x.canvas
		delete x.mask?.canvas
		delete x.engineData
	})

	delete psdFile.imageResources
	
	delete psdFile.engineData
	const jsonData = JSON.stringify(psdFile)

	
    fs.writeFileSync(dataFIlePath, jsonData)
		
	}
}

// const filterFXPSDPath = path.join(readFilesPath, 'filterFX', 'src.psd')

// // @ts-ignore
// const filerFXPSD = readPsdFromFile(filterFXPSDPath, { ...opts });

console.log('finished')




// @ts-ignore
function getFiles(dir: string, files: string[] = []) {
	// Get an array of all files and directories in the passed directory using fs.readdirSync
	const fileList = fs.readdirSync(dir)
	// Create the full path of the file/directory by concatenating the passed directory and file/directory name
	for (const file of fileList) {
	  const name = `${dir}/${file}`
	  // Check if the current file/directory is a directory using fs.statSync
	  if (fs.statSync(name).isDirectory()) {
		// If it is a directory, recursively call the getFiles function with the directory path and the files array
		getFiles(name, files)
	  } else {
		// If it is a file, push the full path to the files array
		files.push(name)
	  }
	}
	return files
}

// function clearEmptyCanvasFields(layer: Psd | undefined | Layer) {
// 	if (layer) {
// 		if ('canvas' in layer && !layer.canvas) delete layer.canvas;
// 		if ('imageData' in layer && !layer.imageData) delete layer.imageData;
// 		layer.children?.forEach(clearEmptyCanvasFields);
// 	}
// }
  
// function clearCanvasFields(layer: Layer | undefined) {
// 	if (layer) {
// 		delete layer.canvas;
// 		delete layer.imageData;
// 		if (layer.mask) delete layer.mask.canvas;
// 		if (layer.mask) delete layer.mask.imageData;
// 		layer.children?.forEach(clearCanvasFields);
// 	}
// }
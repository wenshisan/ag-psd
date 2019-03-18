import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { expect } from 'chai';
import { readPsdFromFile, importPSD, loadImagesFromDirectory, compareCanvases, saveCanvas } from './common';
import { Layer, ReadOptions } from '../psd';
import { readPsd } from '../index';

const readFilesPath = path.join(__dirname, '..', '..', 'test', 'read');
const resultsFilesPath = path.join(__dirname, '..', '..', 'results');
const opts: ReadOptions = { throwForMissingFeatures: true, logMissingFeatures: true };

describe('PsdReader', () => {
	it('reads width and height properly', () => {
		const psd = readPsdFromFile(path.join(readFilesPath, 'blend-mode', 'src.psd'), { ...opts });
		expect(psd.width).equal(300);
		expect(psd.height).equal(200);
	});

	it('skips composite image data', () => {
		const psd = readPsdFromFile(path.join(readFilesPath, 'layers', 'src.psd'), { ...opts, skipCompositeImageData: true });
		expect(psd.canvas).not.ok;
	});

	it('skips layer image data', () => {
		const psd = readPsdFromFile(path.join(readFilesPath, 'layers', 'src.psd'), { ...opts, skipLayerImageData: true });
		expect(psd.children![0].canvas).not.ok;
	});

	it.skip('can read a PSD with layer masks (only if throw on missing features is not set)', () => {
		const psd = readPsdFromFile(path.join(readFilesPath, '../layer-mask', 'src.psd'));
		expect(psd.children![0].canvas).ok;
	});

	it('reads PSD from Buffer with offset', () => {
		const file = fs.readFileSync(path.join(readFilesPath, 'layers', 'src.psd'));
		const outer = Buffer.alloc(file.byteLength + 100);
		file.copy(outer, 100);
		const inner = Buffer.from(outer.buffer, 100, file.byteLength);

		const psd = readPsd(inner, opts);

		expect(psd.width).equal(300);
	});

	fs.readdirSync(readFilesPath).filter(f => !/text/.test(f)).forEach(f => {
		it(`reads PSD file (${f})`, () => {
			const basePath = path.join(readFilesPath, f);
			const psd = readPsdFromFile(path.join(basePath, 'src.psd'), opts);
			const expected = importPSD(basePath);
			const images = loadImagesFromDirectory(basePath);
			const compare: { name: string; canvas: HTMLCanvasElement | undefined; skip?: boolean; }[] = [];

			compare.push({ name: `canvas.png`, canvas: psd.canvas });
			psd.canvas = undefined;

			let i = 0;

			function pushLayerCanvases(layers: Layer[]) {
				layers.forEach(l => {
					if (l.children) {
						pushLayerCanvases(l.children);
					} else {
						const layerId = i++;
						compare.push({ name: `layer-${layerId}.png`, canvas: l.canvas });
						l.canvas = undefined;

						if (l.mask) {
							compare.push({ name: `layer-${layerId}-mask.png`, canvas: l.mask.canvas });
							delete l.mask.canvas;
						}
					}
				});
			}

			pushLayerCanvases(psd.children || []);
			mkdirp.sync(path.join(resultsFilesPath, f));

			if (psd.imageResources && psd.imageResources.thumbnail) {
				compare.push({ name: 'thumb.png', canvas: psd.imageResources.thumbnail, skip: true });
				delete psd.imageResources.thumbnail;
			}

			compare.forEach(i => saveCanvas(path.join(resultsFilesPath, f, i.name), i.canvas));

			fs.writeFileSync(path.join(resultsFilesPath, f, 'data.json'), JSON.stringify(psd, null, 2), 'utf8');

			clearEmptyCanvasFields(psd);
			clearEmptyCanvasFields(expected);

			expect(psd).eql(expected, f);
			compare.forEach(i => i.skip || compareCanvases(images[i.name], i.canvas, `${f}/${i.name}`));
		});
	});
});

function clearEmptyCanvasFields(layer: Layer | undefined) {
	if (layer) {
		if ('canvas' in layer && !layer.canvas) {
			delete layer.canvas;
		}

		if (layer.children) {
			layer.children.forEach(clearEmptyCanvasFields);
		}
	}
}

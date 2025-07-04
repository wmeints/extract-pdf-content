import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs/promises';
import { extractText } from '../src';

describe('extract-pdf-content', () => {
    it('should extract text from a valid PDF file', async () => {
        const pdfFilePath = path.resolve(__dirname, './data/01-valid.pdf');
        const documentContent = await extractText(await fs.readFile(pdfFilePath));

        console.log(documentContent);

        expect(documentContent).toBeDefined();
    });
});
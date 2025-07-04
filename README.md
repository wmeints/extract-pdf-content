# Extract PDF Content

This library is inspired by the original
[pdf-parse](https://npmjs.org/packages/pdf-parse) which is no longer maintained. I made
this package to help me build a node-based application to generate a weekly podcast out
of interesting content often stored in PDF documents.

If you find this useful, please [star the
repository](https://github.com/wmeints/extract-pdf-content) on Github!

## Getting started

You can install this package using the command `npm install extract-pdf-content`.
Then use the following code to extract text from a PDF file.

```javascript
import { extractText } from 'extract-pdf-content';
import fs from 'fs/promises';

const documentData = await fs.readFile('my-pdf-document.pdf');
const documentText = await extractText(documentData);
```

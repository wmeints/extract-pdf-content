import { getDocument, PDFPageProxy } from 'pdfjs-dist/legacy/build/pdf.mjs';

async function getPageText(pageData: PDFPageProxy): Promise<string> {
    const textContent = await pageData.getTextContent();

    let pageText = '';
    let previousY: number | null = null;

    const items = textContent.items as any[];
    const positionedItems = items.map(item => ({
        str: item.str,
        y: item.transform[5],
        x: item.transform[4]
    }));

    // Sort items from bottom to top, and left to right
    // This ensures that the layout in the original PDF is respected
    positionedItems.sort((a, b) => {
        if (Math.abs(b.y - a.y) > 2) {
            return b.y - a.y;
        } else {
            return a.x - b.x;
        }
    });

    for (const item of positionedItems as any[]) {
        const str = item.str;

        if (previousY !== null && Math.abs(item.y - previousY) > 2) {
            pageText += '\n';
        }

        pageText += str + ' ';
        previousY = item.y;
    }

    return pageText.trim();
}

export async function extractText(data: ArrayBuffer): Promise<string> {
    const uint8Data = new Uint8Array(data);
    const document = await getDocument({ data: uint8Data }).promise;

    let collectedPageContent = [];

    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber++) {
        let pageData = await document.getPage(pageNumber)
        let pageText = await getPageText(pageData)

        collectedPageContent.push(pageText);
    }

    return collectedPageContent.join('\n\n');
}
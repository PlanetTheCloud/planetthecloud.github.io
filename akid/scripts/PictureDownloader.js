async function downloadImages(urls) {
    for (let { url, filename } of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Failed to fetch image: ${url}`);
                continue;
            }

            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = objectURL;
            a.download = filename;  // Use the custom filename
            a.style.display = 'none';

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(objectURL);

            console.log(`Successfully downloaded: ${filename}`);
        } catch (error) {
            console.error(`Failed to download image from ${url}:`, error);
        }
    }
}
let mergedData = artlist.map(artItem => {
    let opItem = opdata.find(op => op.link === artItem.link);

    if (opItem) {
        let image = artItem.link.split('/').pop() + '.png';

        return {
            ...artItem,
            ...opItem,
            image,
            class_image: undefined // Remove class_image from the result
        };
    }
    throw Error(`Cannot merge data. Unable to find '${artItem.link}'`);
});

console.log(JSON.stringify(mergedData));
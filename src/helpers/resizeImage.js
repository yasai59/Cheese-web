import FileResizer from "react-image-file-resizer";

export const resizeFile = (file) => {
    return new Promise(resolve => {
        FileResizer.imageFileResizer(
            file,
            800,
            800,
            "PNG",
            0.8,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    })
}


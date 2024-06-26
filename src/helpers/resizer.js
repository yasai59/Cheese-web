import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });



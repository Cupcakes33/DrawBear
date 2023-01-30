export const imgUrlConvertBlob = (canvas) => {
  if (!canvas) return;
  const canvasUrl = canvas.toDataURL("image/png;base64", 0.5);
  
  const splitDataUrl = canvasUrl.split(",");
  const byteString =
    splitDataUrl[0].indexOf("base64") >= 0
      ? atob(splitDataUrl[1])
      : decodeURI(splitDataUrl[1]);
  const mimeString = splitDataUrl[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
};

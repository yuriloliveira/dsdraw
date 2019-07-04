function drawArray(canvasCtx, arr, x, y, sizeLength) {
  canvasCtx.beginPath();
  canvasCtx.moveTo(x, y);
  
  for (let i = 0; i < arr.length; i++) {
    const rectX = i * sizeLength;
    const rectY = 0;

    canvasCtx.moveTo(rectX, rectY);

    const curValue = arr[i];
    const text = canvasCtx.measureText(curValue);
    
    const textX = rectX + Math.round((sizeLength * .5) - (text.width * .5));
    const textY = y + Math.floor(sizeLength / 2);
    
    canvasCtx.strokeRect(i * sizeLength, 0, sizeLength, sizeLength);
    canvasCtx.fillText(curValue, textX, textY);
  }
  
  canvasCtx.closePath();
}
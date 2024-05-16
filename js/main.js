const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "png.png";

canvas.width = image.width
canvas.height = image.height 

const imageArr = []

image.addEventListener("load", () => {
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, image.width, image.height);

  ctx.clearRect(0, 0, canvas.width, canvas.height)

    for(let i = 0; i < imageData.data.length; i+=4){
      if(imageData.data[i+3] != 0){
        imageArr.push({
          r: imageData.data[i],
          g: imageData.data[i+1],
          b: imageData.data[i+2],
          a: imageData.data[i+3],
          x: Math.floor((i/4))%image.width  ,
          y: Math.floor(Math.floor((i/4))/image.width),
          vX: random(),
          vY: random(),
        })
      }
    }
    (function drawCanvas(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      imageArr.forEach((el)=>{
        ctx.fillStyle = `rgba(${el.r},${el.g},${el.b},${el.a})`;
        ctx.fillRect(el.x, el.y, 1, 1)

        el.x += el.vX
        el.y += el.vY

        if(el.x >= canvas.width -1 || el.x <= 0){
          el.vX = -el.vX
        }
        if(el.y >= canvas.height -1 || el.y <= 0){
          el.vY = -el.vY
        }
      })
      requestAnimationFrame(drawCanvas)
    }())
});
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "test.jpg";

canvas.width = image.width * 1.5
canvas.height = image.height * 1.5

const imageArr = []

image.addEventListener("load", () => {
  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, image.width, image.height);

  ctx.clearRect(0, 0, image.width, image.height)


    for(let i = 0; i < imageData.data.length; i+=4){
        imageArr.push({
          r: imageData.data[i],
          g: imageData.data[i+1],
          b: imageData.data[i+2],
          a: imageData.data[i+3],
          x: Math.floor((i/4))%image.width,
          y: Math.floor(Math.floor((i/4))/image.width),
        })
    }

    imageArr.forEach((el)=>{
      ctx.fillStyle = `rgba(${el.r},${el.g},${el.b},${el.a})`;
      ctx.fillRect(el.x, el.y, 1, 1)
    })
});
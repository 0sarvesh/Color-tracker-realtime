const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lensCanvas = document.getElementById('lens');
const lensCtx = lensCanvas.getContext('2d');
const colorCode = document.getElementById('colorCode');
const savedColorInput = document.getElementById('savedColor');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

lensCanvas.width = 100;
lensCanvas.height = 100;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        video.addEventListener('play', () => {
            function draw() {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                requestAnimationFrame(draw);
            }
            draw();
        });
    });

canvas.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    colorCode.textContent = color;

    lensCanvas.style.display = 'block';
    lensCtx.drawImage(canvas, x - 50, y - 50, 100, 100, 0, 0, 100, 100);
});

canvas.addEventListener('mouseout', function() {
    lensCanvas.style.display = 'none';
});

canvas.addEventListener('click', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    savedColorInput.value = color;
});

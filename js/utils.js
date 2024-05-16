const randomScale = 0.5

function random(){
    return (Math.round(Math.random()) == 0 ? 1 : -1) * Math.random()*randomScale;
}
// change background img of element
function readURL(tar, elementToChange) {
    console.log( elementToChange)
    document.getElementById(elementToChange).style.backgroundImage = "url("+URL.createObjectURL(tar.files[0])+")";
}
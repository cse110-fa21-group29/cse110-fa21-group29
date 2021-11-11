function readURL( elementToChange) {
    document.getElementById(elementToChange).src = window.URL.createObjectURL(event.target.files[0]);
}
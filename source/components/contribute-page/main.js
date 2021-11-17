function uploadImg(event){
    document.getElementById("submit-img").style.backgroundImage="url("+URL.createObjectURL(event.target.files[0])+")"
}
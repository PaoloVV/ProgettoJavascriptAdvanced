import laptopImg from "../IMG/laptop-al-buio.jpg"
import "../CSS/laptop.css"

function laptop(){
    const laptopDomImage = new Image()
    laptopDomImage.src = laptopImg
    laptopDomImage.className = "laptop-img"
    return laptopDomImage
}

export default laptop;
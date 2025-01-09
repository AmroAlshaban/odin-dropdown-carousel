import "./styles.css";
import { renderDropdownBlock } from "./dropdownMenu/createDropdown.js";
import { renderImageCarousel } from "./imageCarousel/createImageCarousel.js";


const dropdownMenuButton = document.querySelector(".dropdown-menu");
const imageCarouselButton = document.querySelector(".image-carousel");
const dropdownMenuContents = document.querySelectorAll(".dropdown-menu-content");
const imageCarouselContents = document.querySelectorAll(".image-carousel-content");


dropdownMenuButton.addEventListener("click", () => {
    imageCarouselContents.forEach(imageCarouselContent => {
        imageCarouselContent.style.display = 'none';
    });

    dropdownMenuContents.forEach(dropdownMenuContent => {
        dropdownMenuContent.style.display = 'block';
    });
});

imageCarouselButton.addEventListener("click", () => {
    dropdownMenuContents.forEach(dropdownMenuContent => {
        dropdownMenuContent.style.display = 'none';
    });

    imageCarouselContents.forEach(imageCarouselContent => {
        imageCarouselContent.style.display = 'block';
    });
});

dropdownMenuContents.forEach(dropdownMenuContent => {
    const dropdownBlocks = dropdownMenuContent.querySelectorAll(".dropdown-block");

    dropdownBlocks.forEach((dropdownBlock) => {
        const selectOptions = dropdownBlock.querySelector(".select-options");
        const items = dropdownBlock.querySelectorAll(".item");
    
        renderDropdownBlock(dropdownBlock, selectOptions, items);
    });
});

imageCarouselContents.forEach(imageCarouselContent => {
    const carouselBlock = imageCarouselContent.querySelector(".carousel-block");

    renderImageCarousel(imageCarouselContent, carouselBlock);
});

dropdownMenuButton.dispatchEvent(new Event("click"));

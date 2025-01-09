export function renderImageCarousel(imageCarouselContent, carouselBlock) {
    imageCarouselContentStyles(imageCarouselContent);
    imageCarouselBlockStyles(carouselBlock);

    createImageCarouselArrows(imageCarouselContent, carouselBlock);
};


function imageCarouselContentStyles(imageCarouselContent) {
    Object.assign(imageCarouselContent.style, {
        height: '400px',
        width: '100%',

        position: 'relative',
        isplay: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        alignItems: 'stretch',
    });

    const imageCarouselContentChildDivs = imageCarouselContent.querySelectorAll("div");
    imageCarouselContentChildDivs.forEach(childDiv => childDiv.style.zIndex = 0);
};


function imageCarouselBlockStyles(imageCarouselBlock) {
    Object.assign(imageCarouselBlock.style, {
        height: '100%',

        border: '1px solid black',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'hidden',
        overflowY: 'hidden',
    });

    const carouselImages = imageCarouselBlock.querySelectorAll(".carousel-image");
    carouselImages.forEach((carouselImage, index) => {
        Object.assign(carouselImage.style, {
            display: 'none',
            flex: '0 0 100%',
        });

        if (index === 0) {
            carouselImage.style.display = 'block';
        };

        const image = carouselImage.querySelector('img');
        Object.assign(image.style, {
            height: '100%',
            width: '100%',
        });
    });
};


function createImageCarouselArrows(imageCarouselContent, carouselBlock) {
    const leftArrow = document.createElement("div");
    const rightArrow = document.createElement("div");

    leftArrow.classList.add('carousel-arrow', 'carousel-left-arrow');
    rightArrow.classList.add('carousel-arrow', 'carousel-right-arrow');

    const arrows = [leftArrow, rightArrow];

    arrows.forEach((arrow) => {
        Object.assign(arrow.style, {
            height: '50px',
            width: '50px',

            position: 'absolute',
            zIndex: '1',

            backgroundColor: 'rgb(225, 225, 225)',
            border: '1px solid rgb(225, 225, 225)',
            borderRadius: '100px',
        });

        scrollerImageCarouselEvents(arrow);
    });

    scrollersMediaQueryStyles(arrows);

    scrollRightImageCarouselStyles(rightArrow);
    scrollLeftImageCarouselStyles(leftArrow);

    scrollImageCarouselEvents(imageCarouselContent, leftArrow, rightArrow);

    createImageCarouselNavigationDots(
        imageCarouselContent,
        leftArrow,
        rightArrow,
        carouselBlock.querySelectorAll(".carousel-image").length
    );

    imageCarouselContent.prepend(leftArrow, rightArrow);
    
};


function scrollersMediaQueryStyles(arrows) {
    const mediaQuery = window.matchMedia("(max-width: 850px)");

    mediaQuery.addEventListener("change", (event) => {
        if (event.matches) {
            arrows.forEach((arrow) => {
                arrow.style.transform = "translate(0%, -50%)";
            });
        } else {
            arrows.forEach((arrow, index) => {
                if (index === 0) {
                    arrow.style.transform = "translate(-50%, -50%)";
                } else {
                    arrow.style.transform = "translate(50%, -50%)";
                };
            });
        };
    });

    mediaQuery.dispatchEvent(new Event("change"));
};


function scrollerImageCarouselEvents(arrow) {
    let mouseOver;

    arrow.addEventListener("mouseover", () => {
        mouseOver = 1;
        
        Object.assign(arrow.style, {
            cursor: 'pointer',
            backgroundColor: 'rgb(211, 211, 211)',
            transition: '0.1s',
        });
    });

    arrow.addEventListener("mouseout", () => {
        mouseOver = 0;

        Object.assign(arrow.style, {
            cursor: 'default',
            backgroundColor: 'rgb(225, 225, 225)',
            transition: '0s',
        });
    });

    arrow.addEventListener("mousedown", () => {
        Object.assign(arrow.style, {
            backgroundColor: 'rgb(181, 181, 181)',
            transition: '0s',
        });
    });

    arrow.addEventListener("mouseup", () => {
        if (mouseOver === 1) {
            arrow.dispatchEvent(new Event("mouseover"));
        } else if (mouseOver === 0) {
            arrow.dispatchEvent(new Event("mouseover"));
        };
    });
};


function scrollRightImageCarouselStyles(rightArrow) {
    Object.assign(rightArrow.style, {
        top: '50%',
        right: '0%',
        transform: 'translate(50%, -50%)',

        backgroundImage: `url(${require('./images/right-arrow.png')})`,
        backgroundSize: '50%',
        backgroundPosition: '60%',
        backgroundRepeat: 'no-repeat',
    });
};


function scrollLeftImageCarouselStyles(leftArrow) {
    Object.assign(leftArrow.style, {
        top: '50%',
        transform: 'translate(-50%, -50%)',

        backgroundImage: `url(${require('./images/left-arrow.png')})`,
        backgroundSize: '50%',
        backgroundPosition: '40%',
        backgroundRepeat: 'no-repeat',
    });
};


function scrollImageCarouselEvents(imageCarouselContent, leftArrow, rightArrow) {
    const carouselBlock = imageCarouselContent.querySelector(".carousel-block");
    const imageContainers = carouselBlock.querySelectorAll(".carousel-image");
    const images = Array.from(imageContainers).map(imageContainer => imageContainer.querySelector("img"));

    images.forEach((image, index) => image.classList.add(`image${index + 1}`));

    let viewingImage = "image1";

    leftArrow.addEventListener("click", () => {
        const newViewImage = `image${((parseInt(    viewingImage.slice(-1)) - 1) % images.length) + Math.floor((images.length + 1 - parseInt(viewingImage.slice(-1))) / images.length) * images.length}`;
        
        imageContainers.forEach(imageContainer => {
            if (imageContainer.querySelector("img").classList.contains(newViewImage)) {
                imageContainer.style.display = 'block';
            } else {
                imageContainer.style.display = 'none';
            };
        });

        viewingImage = newViewImage
    });


    rightArrow.addEventListener("click", () => {
        const newViewImage = `image${1 + (parseInt(viewingImage.slice(-1)) % images.length)}`;
        
        imageContainers.forEach(imageContainer => {
            if (imageContainer.querySelector("img").classList.contains(newViewImage)) {
                imageContainer.style.display = 'block';
            } else {
                imageContainer.style.display = 'none';
            };
        });

        viewingImage = newViewImage
    });
};


function createImageCarouselNavigationDots(imageCarouselContent, leftArrow, rightArrow, numberOfImages) {
    const navigationDots = document.createElement("div");
    navigationDots.classList.add("carousel-navigation-dots");

    for (let i = 0; i < numberOfImages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot", `dot${i + 1}`);

        Object.assign(dot.style, {
            aspectRatio: '1 / 1',
            height: '100%',
            width: 'auto',

            backgroundColor: 'white',
            border: '1px solid gray',
            borderRadius: '100px',
        });

        if (i === 0) {
            Object.assign(dot.style, {
                backgroundColor: 'gray',
                border: '1.5px solid white',
            });
        };

        navigationDots.appendChild(dot);
    };

    console.log(navigationDots);

    imageCarouselNavigationDotsStyles(navigationDots);
    imageCarouselNavigationDotsEvents(leftArrow, rightArrow, navigationDots)

    imageCarouselContent.appendChild(navigationDots);
};


function imageCarouselNavigationDotsStyles(navigationDots) {
    Object.assign(navigationDots.style, {
        height: '5%',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -150%)',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    });
};


function imageCarouselNavigationDotsEvents(leftArrow, rightArrow, navigationDots) {
    const dots = navigationDots.querySelectorAll(".dot");
    let viewingDot = 'dot1';

    leftArrow.addEventListener("click", () => {
        const newViewDot = `dot${((parseInt(viewingDot.slice(-1)) - 1) % dots.length) + Math.floor((dots.length + 1 - parseInt(viewingDot.slice(-1))) / dots.length) * dots.length}`;
        
        Object.assign(navigationDots.querySelector(`.${viewingDot}`).style, {
            backgroundColor: 'white',
            border: '1px solid gray',
        });

        Object.assign(navigationDots.querySelector(`.${newViewDot}`).style, {
            backgroundColor: 'gray',
            border: '1.5px solid white',
        });

        viewingDot = newViewDot;
    });


    rightArrow.addEventListener("click", () => {
        const newViewDot = `dot${1 + (parseInt(viewingDot.slice(-1)) % dots.length)}`;

        Object.assign(navigationDots.querySelector(`.${viewingDot}`).style, {
            backgroundColor: 'white',
            border: '1px solid gray',
        });

        Object.assign(navigationDots.querySelector(`.${newViewDot}`).style, {
            backgroundColor: 'gray',
            border: '1.5px solid white',
        });

        viewingDot = newViewDot;
    });

};
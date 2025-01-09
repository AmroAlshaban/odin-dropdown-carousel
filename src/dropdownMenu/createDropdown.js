export function renderDropdownBlock(dropdownBlock, selectOptions, items) {
    dropdownBlockStyles(dropdownBlock);
    selectOptionsStyles(selectOptions, items);
    itemsStyles(selectOptions, items);
};


function dropdownBlockStyles(dropdownBlock) {
    dropdownBlock.style.position = 'relative';
};


function selectOptionsStyles(selectOptions, items) {
    if (selectOptions.textContent === "") {
        selectOptions.textContent = "Select item ...";
    };

    Object.assign(selectOptions.style, {
        padding: '10px',
        height: '30px',
        width: '100%',
       
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    
        backgroundColor: 'white',
        color: 'gray',
        border: '1px solid black',
    });
    
    selectOptions.addEventListener("mouseover", () => {
        selectOptions.style.cursor = 'pointer';
    });

    selectOptions.addEventListener("mouseout", () => {
        selectOptions.style.cursor = 'default';
    });

    selectOptions.addEventListener("click", () => {
        if (items[0].style.display === 'none') {
            items.forEach(item => {
                item.style.display = 'block';
            });
        } else {
            items.forEach(item => {
                item.style.display = 'none';
            });
        };
    });

    document.addEventListener("click", (event) => {
        if (event.target !== selectOptions & 
            items[0].style.display === 'block') {
            
            selectOptions.click();
        };
    });
};


function itemsStyles(selectOptions, items) {
    items.forEach(item => {
        Object.assign(item.style, {
            padding: '10px',
            height: '30px',
            width: '100%',
           
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        
            backgroundColor: 'white',
            color: 'gray',

            position: 'absolute',
            zIndex: 2,
        });
    });

    items.forEach((item, index) => {
        const itemHeight = parseFloat(window.getComputedStyle(item).height);

        item.style.top = `calc(100% + calc(${itemHeight}px * ${index}))`;
    });

    items.forEach(item => {
        let mouseOverItem;

        item.style.display = 'none';

        item.addEventListener("mouseover", () => {            
            mouseOverItem = 1;
            
            Object.assign(item.style, {
                cursor: 'pointer',
                backgroundColor: 'rgb(214, 214, 214)',
                transition: 'background-color 0.1s ease',
            });
        });

        item.addEventListener("mouseout", () => {
            mouseOverItem = 0

            Object.assign(item.style, {
                cursor: 'default',
                backgroundColor: 'white',
                transition: 'background-color 0s ease',
                color: 'gray',
            });
        });

        item.addEventListener("mousedown", () => {
            Object.assign(item.style, {
                cursor: 'pointer',
                backgroundColor: 'rgb(186, 186, 186)',
                transition: 'background-color 0s ease',
            
                color: "black",
            });
        });

        item.addEventListener("mouseup", () => {
            if (mouseOverItem === 1) {
                item.dispatchEvent(new Event("mouseover"));
                item.style.color = 'gray';
            } else {
                Object.assign(item.style, {
                    cursor: 'default',
                    backgroundColor: 'white',
                    transition: 'background-color 0s ease',
                
                    color: "gray",
                });
            };
        });

        item.addEventListener("click", () => {
            selectOptions.textContent = item.textContent;
        });
    });
};

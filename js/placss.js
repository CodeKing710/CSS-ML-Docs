/**
 * placss - plasterlang interpretation of how html and css should be combined for certain layout features
 */

function placss() {
    //Run attribute checks on containers for extra alignment info
    flexContainers();
    gridContainers();
    fitContent();
    spacers();
    fixNavs();
    window.addEventListener("resize",function() {
        fitContent();
        fixNavs();
    });
    window.addEventListener("scroll",function() {
        stickyNav();
    });
}

/**PRIVATE FUNCTIONS */
function flexContainers() {
    let flexContainers = document.querySelectorAll('flex');
    for(let i = 0; i < flexContainers.length; i++) {
        //Shorthand to access current container
        let current = flexContainers[i];
        let flexChildren = document.querySelectorAll("flex > *");
        //if statements must be separate without else statements
        if(current.hasAttribute("justify")) {
            // console.log("Justify content: ", current.getAttribute("justify"));
            current.style.justifyContent = current.getAttribute("justify");
        }
        if(current.hasAttribute("v-align")) {
            // console.log("Vertical Align: ", current.getAttribute("v-align"));
            let props = ["start","end","center","baseline","space-between","space-around","space-evenly"];
            let value = current.getAttribute("v-align");

            //Precheck value for two different values or just single value
            if(value.indexOf(" ") > -1) {
                //The space exists assign properties separate
                let values = value.split(" ");
                current.style.alignContent = values[0];
                current.style.justifyContent = values[1];
            } else {
                //Check for the double-assignment properties
                for(let j = 0; j < props.length; j++) {
                    if(value === props[j]) {
                        //double-assignment
                        current.style.alignContent = props[j];
                        current.style.justifyContent = props[j];
                        break; //No need to continue looping
                    }
                }
            }
        }
        //Accepts single or double argument via spaces
        //Horizontally aligns the sub items of the containers first
        //Horizontally aligns the containers themselves second
        if(current.hasAttribute("h-align")) {
            // console.log("Horizontal Align: ", current.getAttribute("h-align"));
            //Supported single arg properties (it'll dup the property values for use in CSS no repeated typing)
            let props = ["start","end","center","stretch","baseline"];
            let value = current.getAttribute("h-align");

            //Precheck value for two different values or just single value
            if(value.indexOf(" ") > -1) {
                //The space exists assign properties separate
                let values = value.split(" ");
                current.style.alignItems = values[0];
                current.style.justifyItems = values[1];
            } else {
                //Check for the double-assignment properties
                for(let j = 0; j < props.length; j++) {
                    if(value === props[j]) {
                        //double-assignment
                        current.style.alignItems = props[j];
                        current.style.justifyItems = props[j];
                        break; //No need to continue looping
                    }
                }
            }
        }
        if(current.hasAttribute("flow")) {
            // console.log("Flow: ", current.getAttribute("flow"));
            current.style.flexFlow = current.getAttribute("flow");
        }
        if(current.hasAttribute("row")) {
            // console.log("Direction: ", current.getAttribute("row"));
            current.style.flexDirection = "row";
        }
        if(current.hasAttribute("row-reverse")) {
            // console.log("Direction: ", current.getAttribute("row-reverse"));
            current.style.flexDirection = "row-reverse";
        }
        if(current.hasAttribute("column")) {
            // console.log("Direction: ", current.getAttribute("column"));
            current.style.flexDirection = "column";
        }
        if(current.hasAttribute("column-reverse")) {
            // console.log("Direction: ", current.getAttribute("column-reverse"));
            current.style.flexDirection = "column-reverse";
        }
        if(current.hasAttribute("fdir")) {
            // console.log("Direction: ", current.getAttribute("fdir"));
            current.style.flexDirection = current.getAttribute("fdir");
        }
        //boolean version of flex-wrap
        if(current.hasAttribute("wrap")) {
            // console.log("Wrap exists set to wrap");
            current.style.flexWrap = "wrap"
        } else {
            current.style.flexWrap = "nowrap";
        }
        for(let j = 0; j < flexChildren.length; j++) {
            let currentChild = flexChildren[j];

            //Shorthand to order
            if(currentChild.hasAttribute("order")) {
                // console.log("Flex order: ", currentChild.getAttribute("order"));
                currentChild.style.order = currentChild.getAttribute("order");
            }
            //Shorthand for flex-basis, flex-grow, and flex-shrink
            if(currentChild.hasAttribute("flex-size")) {
                // console.log("Flex sizing: ", currentChild.getAttribute("flex-size"));
                currentChild.style.flex = currentChild.getAttribute("flex-size");
            }
        }
    }
}
function gridContainers() {
    let gridContainers = document.querySelectorAll("grid");
    for(let i = 0;i < gridContainers.length; i++) {
        let current = gridContainers[i];
        let gridChildren = document.querySelectorAll("grid > *");
        //Run attribute checks for grid element
        if(current.hasAttribute("cols")) {
            // console.log("Attr cols: ", current.getAttribute("cols"));
            if(current.getAttribute("cols") === "auto") {
                //automatically count the children and insert auto
                //For the count of the children
                let auto = "auto";
                for(let j = 0; j < gridChildren.length; j++) {
                    auto += " auto";
                }
                current.style.gridTemplateColumns = auto;
            } else {
                current.style.gridTemplateColumns = current.getAttribute("cols");
            }
        }
        if(current.hasAttribute("rows")) {
            // console.log("Attr rows: ", current.getAttribute("rows"));
            if(current.getAttribute("rows") === "auto") {
                //automatically count the children and insert auto
                //For the count of the children
                let auto = "auto";
                for(let j = 0; j < gridChildren.length; j++) {
                    auto += " auto";
                }
                current.style.gridTemplateRows = auto;
            } else {
                current.style.gridTemplateRows = current.getAttribute("rows");
            }
            
        }
        if(current.hasAttribute("gap")) {
            // console.log("Attr gap: ", current.getAttribute("gap"));
            current.style.gap = current.getAttribute("gap");
        }

        if(current.hasAttribute("fill")) {
            // console.log("Attr stretch: ", true);
            current.style.justifyItems = "stretch";
            current.style.alignItems = "stretch";
        }

        //Run inner child loop for grid element
        for(let j = 0; j < gridChildren.length; j++) {
            if(current.hasAttribute("colspan")) {
                // console.log("Attr colspan: ", current.getAttribute("colspan"));
                current.style.gridColumn = current.getAttribute("colspan");
            }
            if(current.hasAttribute("rowspan")) {
                // console.log("Attr rowspan: ", current.getAttribute("rowspan"));
                current.style.gridRow = current.getAttribute("rowspan");
            }
        }
    }
}
function fitContent() {
    let main = document.querySelectorAll('main')[0];
    let mainHeight = main.offsetHeight;

    main.children[0].style.height = `${mainHeight}px`;
}
function spacers() {
    //Grab spacer elements
    let spacers = document.querySelectorAll("spacer");
    let parseDecFrac = (num) => {
        let unit = "px"; //default
        if(num.search(/(%|em|rem|fr|vw|vh|px)/) > -1) {
            //Custom Units
            //Return asap
            return num;
        } else {
            //Continue working with default units
            if(num.indexOf("/") > -1) {
                unit = "%";
                //Number is a fraction convert to JS number
                num = num.split("/");
                num = (Number(num[0]) / Number(num[1]))*100;
            } else if(num.indexOf(".") > -1) {
                unit = "%";
                //Number is a decimal just convert
                num = Number(num)*100;
            }

            return num + unit;
        }
    };

    //Check for attributes
    for(let i = 0; i < spacers.length; i++) {
        let current = spacers[i];

        if(current.hasAttribute("w")) {
            //Spacer has a specific width to be set to
            current.style.width = parseDecFrac(current.getAttribute("w"));
        } else {
            //Spacer has no width, inherit from parent, check for height
            current.style.width = current.parentElement.offsetWidth + "px";
        }
        if(current.hasAttribute("h")) {
            //Spacer has specific height
            current.style.height = parseDecFrac(current.getAttribute("h"));
        } else {
            //Spacer has no height inherit from parent
            current.style.height = current.parentElement.offsetHeight + "px";
        }
    }
}
function fixNavs() {
    let items = document.querySelectorAll('nav > container > item');
    items.forEach(function(item){
        item.style.width = `${100/items.length}%`;
    });

    let nav = document.querySelectorAll('nav.submenus')[0];
    let headerHeight = document.querySelectorAll('header')[0].offsetHeight;
    if(nav !== null) {
        nav.style.top = `${headerHeight}px`;
        document.querySelectorAll('main')[0].style.paddingTop = `${headerHeight}px`;
    }
}
function stickyNav() {
    let nav = document.querySelectorAll('nav')[0];
    let headerHeight = document.querySelectorAll('header')[0].offsetHeight;
    // console.log(document.body.scrollTop || document.documentElement.scrollTop);

    if(document.body.scrollTop >= headerHeight || document.documentElement.scrollTop >= headerHeight) {
        nav.style.position = "fixed";
        nav.style.top = 0;
    } else {
        nav.style.position = "absolute";
        nav.style.top = `${headerHeight}px`;
    }
}


//Add dependency to list
addDeps(true, placss);
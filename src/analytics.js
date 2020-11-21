import * as $ from "jquery";

const createAnalytics = () => {
    let counter = 0;
    let destroyed = false;

    const listener = () => counter++;

    // document.addEventListener("click", listener);
    $(document).on("click", listener);

    return {
        destroy(){
            // document.removeEventListener("click", listener);
            $(document).off("click", listener);
            destroyed = true;
        },
        getClicks(){
            if(destroyed){
                return `Analytics is destroyed. Totle clicks = ${counter}`;
            }
            
            return counter;
        }

    }
}

window.analytics = createAnalytics();
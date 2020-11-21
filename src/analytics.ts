import * as $ from "jquery";

const createAnalytics = (): object => {
    let counter: number = 0;
    let destroyed: boolean = false;

    const listener = (): number => counter++;

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

// window.analytics = createAnalytics();
window["analysis"] = createAnalytics();
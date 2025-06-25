async function fetchData (url){
    try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
        const data = res.json();
        return data;  
    } catch (error) {
        console.log(error);
        return null;
    }
}

(async function () {
    // console.log(magazines);
    magazines.map(async (el,idx) => {
        const rss = await fetchData(el);
        // console.log(el);
        addingCarouselToDom(rss, idx);
    })
    // const rss = await fetchData("https://flipboard.com/@thenewsdesk/the-latest-on-covid-19-t82no8kmz.rss");
    // addingCarouselToDom (rss);
})();

function addingAllCarousels (){

}


function addingCarouselToDom (feed, i){
    // console.log(feed.items);
    const accordion = document.getElementById(`collapse${i+1}`);
    accordion.innerHTML = `
    <div id="carouselExample${i+1}" class="carousel carousel-dark slide d-flex" data-bs-ride="carousel">
        <div>
            <button class="carousel-dark me-2" type="button" data-bs-target="#carouselExample${i+1}" data-bs-slide="prev">
                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="10" height="14" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z" fill="#737373"/></svg>
                <span class="visually-hidden">Previous</span>
            </button>
        </div>
        <div class="carousel-inner" id="inner${i+1}"></div>
        <div">
            <button class="carousel-dark ms-2" type="button" data-bs-target="#carouselExample${i+1}" data-bs-slide="next">
                <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="10" height="14" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 298 511.93"><path fill-rule="nonzero" d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z" fill="#737373"/></svg>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `
    const inner = document.getElementById(`inner${i+1}`);
    
    feed.items.map((element,idx) => {
        const carouselItem = document.createElement("div");
        if (idx === 0) carouselItem.className = "carousel-item active";
        else carouselItem.className = "carousel-item";
        carouselItem.innerHTML = `
        <a href="${element.link}" target="_blank">
        <div class="card mb-4">
            <img src="${element.enclosure.link}" class="card-img-top img-fluid" alt="${element.title}"></img>
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">
                    <div class="d-flex">
                            <div class="me-2">${element.author}</div>
                            <div class="me-2"><strong>•</strong></div>
                            <div class="me-2">${new Date(element.pubDate).toLocaleDateString("en-IN")}</div>
                    </div>
                </p>
                <p class="card-text">${element.content}</p>
            </div>
        </div>
        </a>
        `
        inner.append(carouselItem);
    })

    const parent = document.getElementById(`collapse${i+1}`);
    const title = parent.previousElementSibling;
    let ar = "";
    if (parent.id == "collapse1"){
        // console.log(parent.id);
        ar = `fa-solid fa-angle-up"`;
    } else ar = `fa-solid fa-angle-down`;
    title.innerHTML = `
    <i class="${ar}"></i>${feed.feed.title}
    `;
    // if (parent.nextElementSibling.classList.contains("show")) parent.querySelector("i").classList.toggle("rotate");

}

// const interact = document.getElementById("interact");
// interact.addEventListener("click", (event) =>{
//     try {
//         // console.log(event.target);
//         if(event.target.className == "accordion-button mb-4" || event.target.className == "accordion-button mb-4 collapsed"){
//             const arrow = event.target.children[0];
//             if (arrow.style.transform == "rotate(180deg)") arrow.style.transform = "";
//             else arrow.style.transform = "rotate(180deg)";
//         }
//     } catch (error) {
//         return null;
//     }
// })

const accBtn = document.querySelectorAll(".accordion-button");

accBtn.forEach((btn,idx,arr) => {
    btn.addEventListener("click", event => {
        const arrw = btn.nextElementSibling;
        // arrw.classList.toggle("show");
        // console.log(event.target);
        arr = Array.from(arr);
        // console.log(arr);
        if (arrw.classList.contains("show") || arrw.classList.contains("collapsing")) {
            // console.log(arrw);
            // console.log(idx);
            btn.querySelector("i").classList.toggle("fa-angle-down");
            btn.querySelector("i").classList.toggle("fa-angle-up");
        }
        const filtered = arr.filter(el => {
            return el !== event.target;
        })
        // console.log(filtered);
        filtered.forEach(e => {
            if (e.nextElementSibling.classList.contains("show") || e.nextElementSibling.classList.contains("collapsing")) {
                // console.log(e);
                // console.log(idx);
                e.querySelector("i").classList.toggle("fa-angle-up");
                e.querySelector("i").classList.toggle("fa-angle-down");
            }
        })
    })
})
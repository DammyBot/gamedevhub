const about = document.getElementById("about");
const resources = document.getElementById("resource");
const abouturl = '../json/about.json';
const resourceurl = '../json/resources.json';

let query = "game development";
const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=AIzaSyBhL4YDlDukKGXyvDjVP_X_wxS4exeGxbI`;
const container = document.querySelector("#vids");
(async function fetchData(url, url1) {
    const data = await fetch(url);
    const data1 = await fetch(url1);
    const vids = await fetch(endpoint);
    if(data.ok) {
        const response = await data.json();
        createSection(response);
    }
    if(data1.ok) {
        const response = await data1.json();
        createResource(response)
    }
    if (vids.ok){
        const response = await vids.json();
        showVids(response.items);
    }
})(abouturl, resourceurl);

function createSection(data){
    data.forEach(datum => {
        const div = document.createElement("div");
        const title = document.createElement("h3");
        const description = document.createElement("p");

        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        title.textContent = `${datum.icon} ${datum.title}`;
        description.textContent = `${datum.description}`;
        div.append(title,description);

        about.append(div);
    });
}

function createResource(data) {
    data.forEach(datum => {
        const div = document.createElement("div");
        const name = document.createElement("h3");
        const category = document.createElement("p");
        const description = document.createElement("p");
        const link = document.createElement("a");

        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        name.textContent = `${datum.name}`;
        category.textContent = `${datum.category}`;
        description.textContent = `${datum.description}`;
        link.textContent = `${datum.name}`;
        link.href = `${datum.link}`
        link.target = "_blank"
        div.append(name, description, link);

        resources.append(div);
    });
}

function showVids(data){
    data.forEach(datum=>{
        const div = document.createElement("div");
        const title = document.createElement("h3");
        const thumbnail = document.createElement("img");
        const link = document.createElement("a");

        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";

        title.textContent = `${datum.snippet.title}`;
        link.textContent = `${datum.snippet.title}`;
        link.href = `https://www.youtube.com/@${datum.snippet.channelTitle}`;
        link.target = "_blank";
        thumbnail.src = `${datum.snippet.thumbnails.high.url}`;
        thumbnail.alt = `${datum.snippet.title}`;
        // thumbnail.style.width = datum.snippet.thumbnails.medium.width + "px";
        thumbnail.style.width = "100%";
        // thumbnail.style.height = datum.snippet.thumbnails.medium.height + "px";
        thumbnail.style.borderRadius = "10px";
        div.append(thumbnail, link);

        container.append(div);
    })
}

const explore = document.querySelectorAll(".explore");
explore.forEach(exp=>{
    exp.addEventListener("click", (e)=>{
    e.preventDefault();
    resources.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    })
})
})

const info = document.querySelectorAll(".about");
info.forEach(inf => {
    inf.addEventListener("click",(e)=>{
        e.preventDefault();
        about.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    })
    })
})

const tuts = document.querySelectorAll(".tuts");
const learning = document.querySelector(".learning");
tuts.forEach(tut=>{
    tut.addEventListener("click",(e)=>{
        e.preventDefault();
        learning.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    })
    })
})

const home = document.querySelectorAll("home");
home.forEach(inf => {
    inf.addEventListener("click",(e)=>{
        e.preventDefault();
        document.body.scrollTop = 0;
    })
})


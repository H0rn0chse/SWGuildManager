const nav = document.querySelector("#nav");

nav.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("navItem")) {
        return;
    }

    const navItem = evt.target;
    selectNavItem(navItem);
    const containerid = navItem.dataset.target;
    showContent(containerid);
});

function selectNavItem (navItem) {
    document.querySelectorAll("#nav > .navItem").forEach((item) => {
        item.classList.remove("selected");
    });
    navItem.classList.add("selected");
}

function showContent (id) {
    document.querySelectorAll("#app > .content").forEach((item) => {
        if (item.id === id) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }

    });
}

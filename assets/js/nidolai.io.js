const toggleSwitch = document.querySelector('input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'light') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

(function() {
    fetch("https://api.github.com/users/Nidolai/repos").then((response) => {
        if(response.status !== 200) {
            document.getElementById("repos-div").textContent = 'Failed to load repositories [' + response.status + ']';
            return;
        }

        response.json().then((data) => {
            var docFrag = document.createDocumentFragment();
            var repoTemplate = document.getElementById("repo-template");

            data.forEach((repo) => {
                repoTemplate.content.querySelector(".repo").href = repo.html_url;
                repoTemplate.content.querySelector(".name").textContent = repo.name;
                repoTemplate.content.querySelector(".desc").textContent = repo.description;
                repoTemplate.content.querySelector(".language").innerHTML = repo.language;

                var clone = document.importNode(repoTemplate.content, true);
                docFrag.appendChild(clone);
            });

            var a = document.getElementById("repos-div");
            a.textContent = "";
            a.appendChild(docFrag);
        });
    });
}());
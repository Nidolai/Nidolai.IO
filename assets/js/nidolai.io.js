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
                var nameLink = repoTemplate.content.querySelector(".name");
                nameLink.textContent = repo.name;
                nameLink.href = repo.html_url;
                repoTemplate.content.querySelector(".desc").textContent = repo.description;
                repoTemplate.content.querySelector(".language").innerHTML = repo.language;
                repoTemplate.content.querySelector(".watch").innerHTML = repo.watchers_count;
                repoTemplate.content.querySelector(".star").innerHTML = repo.stargazers_count;
                repoTemplate.content.querySelector(".fork").innerHTML = repo.forks_count;
                repoTemplate.content.querySelector(".homepage").href = repo.homepage || "";

                var clone = document.importNode(repoTemplate.content, true);
                docFrag.appendChild(clone);
            });

            var a = document.getElementById("repos-div");
            a.textContent = "";
            a.appendChild(docFrag);
        });
    });
}());
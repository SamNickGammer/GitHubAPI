const APIURL = 'https://api.github.com/users/';
// var username = "samnickgammer";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const reposDet = document.getElementById('reposDet');

callby('samnickgammer');

function callby(username) {
  const fetchCall = fetch(APIURL + username); //unchangable ......... constet
  console.log(fetchCall.PromiseResult);
  const responce = fetchCall
    .then((mainData) => mainData.json())
    .catch((err) => console.log(err));
  console.log(fetchCall);
  responce.then((mainData) => {
    console.log(mainData);
    createUserCard(mainData);
    getRepos(username);
  });
}

function getRepos(username) {
  const fetchCall = fetch(APIURL + username + '/repos');
  const responce = fetchCall
    .then((repos) => repos.json())
    .catch((err) => console.log(err));
  responce.then((repos) => {
    console.log(repos);
    addReposToCard(repos);
    repoDetails(repos);
    graphDetails(username);
  });
}

function createUserCard(user) {
  main.innerHTML = `
            <div class="card" style="margin-bottom:10px">
                <div>
                    <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
                </div>
                <div class="user-info">
                    <div class="flex">
                        <h2>${user.name}</h2>
                        <div>
                            <a href="${user.html_url}" target = "_blank"><img class="logoSimple" src="./Image/github_50px_White.svg" alt="connect_50px_black"></a>
                            <a href="${user.blog}" target = "_blank"><img class="logoSimple" src="./Image/connect_50px_white.svg" alt="connect_50px_black"></a>
                            <a href="https://twitter.com/${user.twitter_username}" target = "_blank"><img class="logoSimple" src="./Image/twitter_50px_white.svg" alt="twitter_50px_white"></a>
                        </div>
                    </div>
                    <p>${user.bio}</p>
                    <ul class="info">
                        <li>${user.followers}<strong>Followers</strong></li>
                        <li>${user.following}<strong>Following</strong></li>
                        <li>${user.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <div id="repos"></div>
                    <img id="moreOption" class="logoSimple" src="./Image/circle.svg" alt="circle" onclick="moreOptionFn()">
                    <img id="graph1" class="logoSimple" src="./Image/insights_white_24dp.svg" alt="insights_white_24dp" onclick="graphView()">
                </div>
            </div>`;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');
  repos.slice(0, 10).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.className = 'repo';
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

function repoDetails(repos) {
  const reposDet = document.getElementById('reposDet');
  reposDet.innerHTML = repos
    .map(
      (repo) =>
        `<tr style="color: white;">
                        <td style="font-size: 15px;">${repo.name}</td>    
                        <td style="font-size: 11px;" align="center">${repo.created_at}</td>    
                        <td style="font-size: 11px;"align="center">${repo.updated_at}</td>   
                        <td style="font-size: 15px;" align="center">${repo.language}</td>   
                        <td align="center"><a href="${repo.html_url} " target = "_blank"><img style="width:15px" src="./Image/url-link.svg" alt="url-link"></a></td>   
                    </tr>
                    `
    )
    .join('');

  // .forEach((repo) => {
  //     // const repoDiv = document.createElement("div");
  //     // repoDiv.className = "repo"
  //     reposDet.innerHTML = `
  //         <tr>
  //             <td>${repo.name}</td>
  //             <td>${repo.html_url}</td>
  //             <td>${repo.id}</td>
  //         </tr>

  //     `;
  //     //reposDet.appendChild(repoDiv);
  // })
}

// function repoDetails(repos) {
//     const admin = repos.forEach((repo) => {
//         `<div class="card">
//             <a href="${repo.html_url}">${repo.name}</a>
//         </div>`;
//     });
//     reposDet.innerHTML = admin;
// }

function graphDetails(username) {
            const graphID = document.getElementById("graphDetails");
            const divCard = document.createElement("div");
            const priDiv = document.createElement("div");
            divCard.className = "card";
            // --------------------------------- Contribution Graph ------------------------------------------------------------
            const contributionGraph = document.createElement("img");
            contributionGraph.src = `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=dracula`;

            contributionGraph.alt = 'Contribution Graph';
            // --------------------------------- Your Trophis ------------------------------------------------------------
            const trophiesImg = document.createElement("img");
            trophiesImg.src = `https://github-profile-trophy.vercel.app/?username=${username}&column=8&margin-w=-10&margin-h=10&no-bg=true&no-frame=true&theme=juicyfresh`;
            trophiesImg.alt = 'Contribution Graph';


            priDiv.appendChild(trophiesImg);
            priDiv.appendChild(contributionGraph);


            divCard.appendChild(priDiv)
            graphID.appendChild(divCard);

        }

        // function repoDetails(repos) {
        //     const admin = repos.forEach((repo) => {
        //         `<div class="card">
        //             <a href="${repo.html_url}">${repo.name}</a>
        //         </div>`;
        //     });
        //     reposDet.innerHTML = admin;
        // }

        var temp = 0
        function graphView() {
            const detailVisiblity = document.getElementById('graphDetails');
            if (temp == 0) {
                detailVisiblity.style.display = "block";
                temp += 1;
            } else if (temp == 1) {
                detailVisiblity.style.display = "none";
                temp = 0;
            }
        }

var tmp = 0;
function moreOptionFn() {
  const detailVisiblity = document.getElementById('detailcard');
  if (tmp == 0) {
    detailVisiblity.style.display = 'block';
    tmp += 1;
  } else if (tmp == 1) {
    detailVisiblity.style.display = 'none';
    tmp = 0;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    callby(user);
    search.value = '';
  }
});

const startDate = '2025-08-15';
const endDate = new Date();
console.log(endDate.toJSON().substring(0, 10).toString());

const dateInput = document.getElementById("date");
console.log(dateInput.textContent);

const sportsApiKey = 'd9426987c500c6a25cd80ca2c2660e8081b4103fea5616a771d7a843fbd8fd26';
const sportsApiUrl = `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${sportsApiKey}&from=${startDate}&to=${endDate.toJSON().substring(0, 10)}&leagueId=152`;

const matchCardSection = document.getElementById('matches');
const childCards = matchCardSection.children;
console.log(sportsApiUrl);

const teams = document.getElementById("teams");

teams.addEventListener("change", () => {
    updateMatches();    
})

function updateMatches() {
    for (const child in childCards) {
        const currentItem = childCards[child];
        currentItem.style.display = 'block';
        console.log(currentItem.classList);
        
        if (teams.value !== 'allTeams' && !currentItem.classList.contains(teams.value)) {
            currentItem.style.display = 'none';
        }
    }
}

fetch(sportsApiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const homeTeam = data.result[0].event_home_team;
        data.result.forEach(element => {
            const matchCard = document.createElement("div");
            matchCard.classList.add("match-card", element.event_home_team.replace(/\s+/g, "").replace("FC", ""), element.event_away_team.replace(/\s+/g, "").replace("FC", ""));

            const matchStatus = document.createElement("p");
            matchStatus.className = "match-status";
            matchStatus.textContent = "Full Time";
            matchCard.appendChild(matchStatus);

            const matchHomeTeam = document.createElement("div");
            matchHomeTeam.className = "home-team";

            const matchHomeTeamName = document.createElement("div");
            matchHomeTeamName.className = "home-team-name";
            const homeTeamImg = document.createElement("img");
            homeTeamImg.src = element.home_team_logo;
            const homeTeamNameText = document.createElement("h1");
            homeTeamNameText.className = "team-name";
            homeTeamNameText.textContent = element.event_home_team;
            matchHomeTeamName.appendChild(homeTeamImg);
            matchHomeTeamName.appendChild(homeTeamNameText);

            const homeTeamScore = document.createElement("p");
            homeTeamScore.className = "home-team-score";
            homeTeamScore.textContent = element.event_ft_result[0];

            matchHomeTeam.appendChild(matchHomeTeamName);
            matchHomeTeam.appendChild(homeTeamScore);
            matchCard.appendChild(matchHomeTeam);

            const matchAwayTeam = document.createElement("div");
            matchAwayTeam.className = "away-team";

            const matchAwayTeamName = document.createElement("div");
            matchAwayTeamName.className = "away-team-name";
            const awayTeamImg = document.createElement("img");
            awayTeamImg.src = element.away_team_logo;
            const awayTeamNameText = document.createElement("h1");
            awayTeamNameText.className = "team-name";
            awayTeamNameText.textContent = element.event_away_team;
            matchAwayTeamName.appendChild(awayTeamImg);
            matchAwayTeamName.appendChild(awayTeamNameText);

            const awayTeamScore = document.createElement("p");
            awayTeamScore.className = "away-team-score";
            awayTeamScore.textContent = element.event_ft_result[4];

            matchAwayTeam.appendChild(matchAwayTeamName);
            matchAwayTeam.appendChild(awayTeamScore);
            matchCard.appendChild(matchAwayTeam);

            const seperator = document.createElement("h1");
            seperator.className = "solid-separator";
            matchCard.appendChild(seperator);

            const matchTime = document.createElement("div");
            matchTime.className = "match-time";

            const dateIcon = document.createElement("i");
            dateIcon.className = "fa-regular fa-calendar";

            const dateText = document.createElement("p");
            dateText.textContent = `${element.event_time}, ${element.event_date}`;

            matchTime.appendChild(dateIcon);
            matchTime.appendChild(dateText);
            matchCard.appendChild(matchTime);

            matchCardSection.appendChild(matchCard);

        });
        console.log(homeTeam);
    })
    .catch(error => console.log(error));

    // fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&leagueId=152&APIkey=${sportsApiKey}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         data.result.forEach(element => {
    //             const option = document.createElement("option");
    //             option.value = element.team_name;
    //             option.textContent = element.team_name;
    //             teams.appendChild(option);
    //         })
    //     })
    //     .catch(error => console.log(error))







        // console.log(`https://apiv2.allsportsapi.com/football/?&met=Teams&leagueId=152&APIkey=${sportsApiKey}`);
        



























    // <div class="match-card">
    //             <p class="match-status">Full Time</p>
    //             <div class="home-team">
    //                 <div class="home-team-name">
    //                     <img src="/Manchester_City_FC_badge.svg.png" alt="">
    //                     <h1 class="team-name">Manchester City</h1>
    //                 </div>
    //                 <p class="home-team-score">2</p>
    //             </div>
    //             <div class="away-team">
    //                 <div class="away-team-name">
    //                     <img src="/Manchester_City_FC_badge.svg.png" alt="">
    //                     <h1 class="team-name">Manchester City</h1>
    //                 </div>
    //                 <p class="away-team-score">1</p>
    //             </div>
    //             <hr class="solid-separator">
    //             <div class="match-time">
    //                 <i class="fa-regular fa-calendar"></i>
    //                 <p>Wed, Oct 1, 2025</p>
    //             </div>
    //         </div>
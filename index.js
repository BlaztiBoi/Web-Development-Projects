const aboutMeBtn = document.getElementById("aboutMeBtn");
const toDoListBtn = document.getElementById("toDoListBtn");

const aboutMeCard = document.getElementById("about-me");
const todolist = document.getElementById("todolist");

aboutMeBtn.addEventListener("click", toggleAboutMe )
toDoListBtn.addEventListener("click", toggleTodoList )



function toggleAboutMe() {
  
   aboutMeCard.classList.toggle("hide")
}
function toggleTodoList() {
   
    todolist.classList.toggle("hide")
}



// function toggleCommits() {
//  let loadCommitHistory ;
//  const commitHistory = document.getElementById("commit-history");
//  commitHistory.classList.toggle("hide")
//  if(commitLoaded === false){
//      githubCommitsLoad();
//  }
//  commitLoaded = true;
// }
// function githubCommitsLoad(){

//      const username = 'Blaztiboi';
//      const repo = 'Web-Development-Projects';
//      const token = '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'; // Replace with your personal access token
 
//      fetch(`https://api.github.com/repos/${username}/${repo}/commits`, {
//        headers: {
//          Authorization: `token ${token}`
//        }
//      })
//      .then(response => response.json())
//      .then(data => {
//          const lastFiveCommits = data.slice(0, 5); // Extract the last 5 commits
//          const commitHistoryElement = document.getElementById('commit-history');
//          commitHistoryElement.innerHTML = "<strong>Last 5 commit history:</strong><br>";
//          lastFiveCommits.forEach(commit => {
//            const commitElement = document.createElement('div');
//      commitElement.classList.add('commit');

//      const timeElement = document.createElement('span');
//      timeElement.classList.add('time');
//      const commitDate = new Date(commit.commit.author.date);
//      const formattedDate = `${commitDate.getDate()} ${commitDate.toLocaleString('default', { month: 'short' })} ${commitDate.getFullYear()} ${commitDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
//      timeElement.textContent = formattedDate;

//      const authorElement = document.createElement('span');
//      authorElement.classList.add('author');
//      authorElement.textContent = commit.commit.author.name;
//      commitElement.appendChild(authorElement);

//      const messageElement = document.createElement('span');
//      messageElement.classList.add('message');
//      messageElement.textContent = `: ${commit.commit.message} `;
//      commitElement.appendChild(messageElement);
//      commitElement.appendChild(timeElement);
//      commitHistoryElement.appendChild(commitElement); 
//        });
//      })
//      .catch(error => {
//        console.error('Error fetching commit history:', error);
//      });
 
//  }
/*

*/
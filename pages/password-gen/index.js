let passwordEl = document.getElementById("password-el");
let copyBtn = document.getElementById("copy");
function generatePassword(){
    const validPasswordCharacters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', '!', '@', '#', '$', '%', '^', '&', '*',
        '(', ')', '-', '_', '=', '+', '[', ']', '{', '}',
        '|', ';', ':', '"', '', '<', '>', ',', '.', '/',
        '?', '`', '~'
      ];
    passwordEl.textContent = ""
    for(let i = 1; i < Math.floor(Math.random()*30)+20 ; i++) {
        passwordEl.textContent += validPasswordCharacters[Math.floor(Math.random()*validPasswordCharacters.length)]
    }
    copyBtn.removeAttribute('disabled')
}

copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(passwordEl.textContent)
        .then(function () {
            alert("Copied the text: " + passwordEl.textContent);
        })
        .catch(function (err) {
            console.error("Error copying text: ", err);
        });
});
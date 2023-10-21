import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



document.addEventListener('click', function(e){
    if (e.target.id == "tweet-btn"){
        handleTweetBtnClick()
    }
    else if (e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }else if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }

})

function handleTweetBtnClick(e) {
    const tweetInput = document.getElementById('tweet-input')
    const tweet = {
        handle: `@Blazt`,
        profilePic: `images/twitterClone_ico.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    }
    if(tweetInput.value){
        tweetsData.unshift(tweet)
        render()
    }
    tweetInput.value = ""
   
}

function handleReplyClick(tweetId){
    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')

}
function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]
    
    
    if (targetTweetObj.isLiked){
        
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]
    
    
    if (targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++ 
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function getFeedHtml(){
    let feedHtml = "";
    
    tweetsData.forEach(function(tweet , index){
        let likeIconClass = ''  
        let retweetClass = ''
        if(tweet.isLiked){
            likeIconClass = "liked"
        }
        if(tweet.isRetweeted){
            retweetClass = "retweeted"
        }

        let repliesHtml = "";
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml += `
            <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
        }

        feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}" ></i>
                      ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"  data-like="${tweet.uuid}" ></i>
                    ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
        </div>   
    </div>`
    })
   return feedHtml
}
    
function render(){
     document.getElementById('feed').innerHTML = getFeedHtml()
   
}    


    
render()
chrome.webNavigation.onCompleted.addListener(function() {
  alert("This is my favorite website!");
}, {url: [{urlMatches : 'https://app.dailybot.co/followups/*'}]});
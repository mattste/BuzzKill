chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		var newsfeed = $('#topnews_main_stream_408239535924329');
		findBuzzFeedPosts(newsfeed);

		$(newsfeed).bind('DOMNodeInserted', function(e) {
			findBuzzFeedPosts(e);
		});
	}
	}, 10);
});

function findBuzzFeedPosts(newsfeed) {
	var urls = $(newsfeed).find('._52c6');
	// console.log(urls);
	var buzzFeedRegex = /buzzfeed\.com/
	var buzzfeedPosts = [];
	for (var i=0; i<urls.length; i++) {
		if (buzzFeedRegex.test(urls[i].href)) {
			console.log("what now buzzfeed " + urls[i].href);
			$(urls[i]).closest("._4-u2.mbm._5jmm._5pat._5v3q._5x16").remove();
		}
		// if (urls[i].href.indexOf("buzzfeed.com") > -1) {
		// 	console.log("I FOUND YOU buzzfeed: " + urls[i].href);
		// 	$(urls[i]).closest("._4-u2.mbm._5jmm._5pat._5v3q._5x16").remove();
		// }
		// console.log("url: " + urls[i].href + " test: " + buzzFeedRegex.test("http://l.facebook.com/l.php?u=http%3A%2F%2Fwww.buzzfeed.com%2Ftomphillips%2Fplease-like-me%233ujrp3z&h=bAQEaqFQ7AQF5mM64I_fL-B-jP6U1ZkQAxKHlLMSEalUxcQ&enc=AZPp7VMxdXNREKroipeU82DhdPJzsFGwqtsQOMSI-b_NP1ajlmD1mmTEhHW-ZsggRkLtcoWxSMY1GKmOtuHimZazds0yqgThR7jvODYE7uyuE1SGlf_Nd15cnNxWAs4ZZfDNFfHO2e3f9TNs5RWn7W-l&s=1"));
	}
}

function removePosts(obj) {
	obj.each(function(index) {
		console.log("Hello!");
		console.log( index + ": " + $( this ).text() );
	});
}


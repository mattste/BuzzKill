chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		var regexes = [
			"buzzfeed\.com"
		];
		var bannedSitesRegex = joinRegexes(regexes);
		console.log(bannedSitesRegex);
		var filter = new filterNewsfeed(bannedSitesRegex);
		filter.removePosts();

		var newsfeed = $('#topnews_main_stream_408239535924329');
		$(newsfeed).bind('DOMNodeInserted', function(e) {
			var activeFilter = new filterNewsfeed(bannedSitesRegex);
			activeFilter.removePosts();
		});
	}
	}, 10);
});

function joinRegexes(regexes) {
	return(new RegExp(regexes.join("|"), "i"));
}

function filterNewsfeed(regex) {

	this.newsfeed = $('#topnews_main_stream_408239535924329');
	this.newsfeedDivSelector = $('._52c6');
	this.newsfeedPostDivSelector = '._4-u2.mbm._5jmm._5pat._5v3q._5x16';
	this.regex = regex;

	this.removePosts = function() {
		var urls = $(this.newsfeed).find(this.newsfeedDivSelector);
		for (var i=0; i<urls.length; i++) {
			var temp = /buzzfeed\.com/i;
			if (temp.test(urls[i].href)) {
				console.log("buzzfeed url: " + urls[i].href);
			}
			if (this.regex.test(urls[i].href)) {
				console.log($(urls[i]).closest('.userContentWrapper'));
				$(urls[i]).closest(this.newsfeedPostDivSelector).remove();
			}
		}
	};
}


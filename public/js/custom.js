/*$(document).ready(function(){
	$("#search").click(function() {
		$('.jumbotron').slideUp();
		setTimeout(function(){
		$('.product').css("display","flex");
		},1000);
	});

	$('.track').click(function() {
		track= 1;
		if(signedin==1)
		{
			$(this).html("Your product is set to be watch.");
			$(this).addClass("btn-success");
			//$('.product-details').append('<br/><br/><a onClick="document.getElementById("watchlist").simulateClick()">See your watchlist</a>');
		}
		else
		{
			$('.product').slideUp();
			$('.jumbotron').slideUp();
			$('.product-search-box').slideUp();
			$('.watchlist').slideUp();
			setTimeout(function(){
				$('.signin').slideDown();
			},500);
		}
	});

	$("#trackProduct").click(function() {
		$('.product').slideUp();
		$('.product-search-box').slideDown();
		$(".signin").slideUp();
		$('.watchlist').slideUp();
	});

	$("#signin").click(function() {
		$('.product').slideUp();
		$('.jumbotron').slideUp();
		$('.product-search-box').slideUp();
		$('.watchlist').slideUp();
		setTimeout(function(){
			$('.signin').slideDown();
		},500);
	});

	$("#watchlist").click(function() {
		if(signedin==0)
		{
			$('.product').slideUp();
			$('.jumbotron').slideUp();
			$('.product-search-box').slideUp();
			$('.watchlist').slideUp();
			setTimeout(function(){
				$('.signin').slideDown();
			},500);
			showWatchlist= 1;
		}
		else
		{
			$('.product').slideUp();
			$('.jumbotron').slideUp();
			$('.product-search-box').slideUp();
			$('.signin').slideUp();
			setTimeout(function(){
				$('.watchlist').slideDown();
			},500);
		}
	});

	var signedin =0;
	var track= 0;
	var showWatchlist= 0;
	if(signedin==0)
		$('#signin').html('<a class="nav-link" href="#">Sign in</a>');
	else
	{
		$('#signin').html('<a class="nav-link" style="padding: 0 7px 0 20px !important;" href="">Sign Out <img class="profile-photo" src="https://lh3.googleusercontent.com/o0uHIKz1q9l1RnXIcEDE6rmfEKbbp4i9FHHjefbdQNPpIYedn8q-dzITPGcgOSDRK8xUWwRv4syUpQ=w1366-h768-rw-no"/></a>');
		$(this).attr('id','signout');
	}

	$('.facebook, .google').click(function(){
		signedin= 1;
		$('#signin').html('<a class="nav-link" style="padding: 0 7px 0 20px !important;" href="">Sign Out <img class="profile-photo" src="https://lh3.googleusercontent.com/o0uHIKz1q9l1RnXIcEDE6rmfEKbbp4i9FHHjefbdQNPpIYedn8q-dzITPGcgOSDRK8xUWwRv4syUpQ=w1366-h768-rw-no"/></a>');
		$(this).attr('id','signout');

		if(showWatchlist==1)
		{
			$('.product').slideUp();
			$('.jumbotron').slideUp();
			$('.product-search-box').slideUp();
			$('.signin').slideUp();
			setTimeout(function(){
				$('.watchlist').slideDown();
			},500);
			showWatchlist= 0;
		}
		else if(track==0)
		{
			$('.jumbotron').slideDown();
			$('.product-search-box').slideDown();
			$(".signin").slideUp();
		}
		else
		{
			$('.jumbotron').slideUp();
			$('.product-search-box').slideDown();
			$('.product').slideDown();
			$(".signin").slideUp();
		}
	});

	$('#signout').click(function(){
		$('#signin').html('<a class="nav-link" href="#">Sign in</a>');
		signedin= 0;
	});
});
*/

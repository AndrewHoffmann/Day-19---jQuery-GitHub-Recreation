// alert('test') // use in every js, makes sure no errors, will load when ok
// APIs replace "yourusername" with "AndrewHoffmann"

$( document ).ready(function() {
	'use strict';

			//User API 		
	$.ajax({ 
		url: 'https://api.github.com/users/AndrewHoffmann',
	    success: (response) => {
	        console.log(response);
	        $(".profilePic img").attr("src",response.avatar_url);
	        $(".name").html(`<p>${response.name}</p>`);
	        $(".userName").html(`<p>${response.login} </p>`);
	        $(".location").html(`<p>${response.location} </p>`);
	        $(".blog").html(`<p>${response.blog} </p>`);
	        $(".joined").html(`<p>${response.created_at} </p>`);
	        $(".replaceFollowers").html(`<p>${response.followers}</p>`);
	        $(".replaceFollowing").html(`<p>${response.following}</p>`);
	    },

	    error:function(error) {
	    	console.log(error);
	    }
	});

			// Repos API will - will need forEach and moment
			// moment - shows how long repo was updated from then til now
	$.ajax({ 
		url: 'https://api.github.com/users/AndrewHoffmann/repos',
	    success: (response) => {
	        console.log(response);
	        	response.forEach((repo) =>{
	        			$(".repositoriesGoHere").append(`
	        				<div class="col-md-9">
	        					<h2>${repo.name}</h2>
						    	<h5>${moment(repo.updated_at).from()}</h5>
					    	</div>

					    	<div class="col-md-3">
					    		<h4>${repo.language}</h4>
						    		<span class="pull-right">
						    			<h5>${repo.stargazers_count}</h5>
						    			<h5>${repo.forks_count}</h5>
						    		</span>
					    	</div>
				        `)
				})
	    }
	});


			// (Public) Activity API - will need forEach
	$.ajax({
	    url:'https://api.github.com/users/AndrewHoffmann/events',
	    success: (response) => {
	        console.log(response);
	        response.forEach((activity) =>{

	            if(activity.type==="PushEvent")
	            {
	                let branch = activity.payload.ref;
	                branch = branch.split('/');

	                $("#publicActivity").append(`
	                    <div class="publicActivity clearfix">
	                        <h2>${moment(activity.created_at).from()}</h2>
	                        <h5><span class="blue">${activity.payload.commits[0].author.name}</span> pushed to ${branch[2]} at ${activity.repo.name}</h5>
	                        <h5><img class="smallActivityPic" src=${activity.actor.avatar_url}>${activity.payload.commits[0].sha} ${activity.payload.commits[0].message}</h5>
	                    </div>
	                `)
        		}
            })
        }
    })
})
			// do NOT need Orgs API 

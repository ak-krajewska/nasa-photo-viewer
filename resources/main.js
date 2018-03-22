/*jshint browser: true, esversion: 6 */

//use destructuring on the json somehow, so it's less annoying to parse --> not really sure how this is going to be useful
//handle 200, 400, and 500 codes using promises (then -- which I still don't understand)
//use a mouseover event to make a caption appear
//use arrow functions
//DONE use a default value for when the user doesn't put anything in the search box
//DONE use template strings to display all text on the page
//DONE show loading indicator

var response = null;
var photos = null; 

document.getElementById('search').addEventListener('click', function() {
  console.log('you clicked search');
    if (document.getElementById('keyword').value.length > 1) {
        var keyword = document.getElementById('keyword').value;
        console.log(`the button says the keyword is ${keyword}`);
        searchPhotos(keyword);
    } else {
        searchPhotos();
    }
});

function listThumbnails(keyword) {
    // j.collection.items[1].data[0].media_type);
    
   photos.forEach(function(element, index) {
       if (photos[index].data[0].media_type === 'image'){
            var li = document.createElement('li');
            li.innerHTML = `<img src=${photos[index].links[0].href}>`;
            document.getElementById('list').appendChild(li);
       }
  });
    document.getElementById('loading').innerHTML = `Results for ${keyword}`;
}

function clearPrevious() {
    let node = document.getElementById('list');
    while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
    }
}

function searchPhotos(keyword = 'mars') {
    document.getElementById('loading').style.display = 'block';
    //console.log(keyword);
  fetch(`https://images-api.nasa.gov/search?q=${keyword}`)
    .then(function(response) {
      return response.json();
    })
    //do some error checking
    .then(function(j) {
      console.log(j);
      response = j;
      photos = response.collection.items;
      console.log(photos);
      //console.log(photos[0].links[0].href);
    
      clearPrevious();
      listThumbnails(keyword);
  });
    /*
    .then(function(j) {
      response = j;
      assignValues();
      getFollowers(j.followers_url);
    })*/
    
}

// collection.metadata.total_hits = 0 means no results


/*
fetch('https://images-api.nasa.gov/search?q=mars')
    //fetch('https://api.github.com/users/cassidoo')
      .then(function(response) {
        return response.json();
      })

.then(function(j) {
        console.log(j);
        console.log(j.collection.items[1]);
     console.log("title: " + j.collection.items[1].data[0].title);
     console.log("media type: " + j.collection.items[1].data[0].media_type);
     console.log("link to json with all the image sizes: " + j.collection.items[1].href);
    console.log("thumbnail :" + j.collection.items[1].links[0].href);

      }); */

//you'll have to check if the media type is image
//might need to limit the search results OR do pagination somehow
//you probably want to pull in the entire response and store it
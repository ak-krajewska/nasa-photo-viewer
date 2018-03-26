/*jshint browser: true, esversion: 6 */

//use destructuring on the json somehow, so it's less annoying to parse --> not really sure how this is going to be useful
//handle 200, 400, and 500 codes using promises (then -- which I still don't understand) -> doesn't then just deal with them? do I really need to do anything special?
//use a mouseover event to make a caption appear
//use arrow functions
//DONE use a default value for when the user doesn't put anything in the search box
//DONE use template strings to display all text on the page
//DONE show loading indicator

var response = null;
var photos = null; 

document.getElementById('search').addEventListener('click', function() {
  window.console.log('you clicked search');
    if (document.getElementById('keyword').value.length > 1) {
        var keyword = document.getElementById('keyword').value;
        window.console.log(`the button says the keyword is ${keyword}`);
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
            li.innerHTML = `<img alt="${photos[index].data[0].title}" src="${photos[index].links[0].href}"><br><span class="hidden-caption">  ${photos[index].data[0].title} </span>`;
            document.getElementById('list').appendChild(li);
           //use last child here
           document.getElementById('list').lastChild.id = index;
           //now add the event listener
           document.getElementById(index).addEventListener('mouseenter', function() {
               //when you mouse over, change the span's class to invisible (for testing)
                document.getElementById(index).lastChild.className = 'caption';
           });
           document.getElementById(index).addEventListener('mouseout', function() {
               //when you mouse over, change the span's class to invisible (for testing)
                document.getElementById(index).lastChild.className = 'hidden-caption';
           });
            
       }
  });
    if (photos.length === 0) { //results are 0 
        document.getElementById('loading').innerHTML = `Sorry, no images found for ${keyword}`; 
    } else {
        document.getElementById('loading').innerHTML = `Results for ${keyword}`;
    }
}

function clearPrevious() {
    let node = document.getElementById('list');
    while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
    }
}

function searchPhotos(keyword = 'mars') {
    document.getElementById('loading').style.display = 'block';
    //window.console.log(keyword);
  fetch(`https://images-api.nasa.gov/search?q=${keyword}`)
    .then(function(response) {
      window.console.log(`status is ${response.status}`);
      if (response.status != 200){
          document.getElementById('loading').innerHTML = `Something has gone wrong. Error ${response.status}`;
      }
      return response.json();
    })
    //do some error checking
    .then(function(j) {
      window.console.log(j);
      response = j;
      photos = response.collection.items;
      window.console.log(photos);
      
    
      clearPrevious();
      listThumbnails(keyword);
  });  
}



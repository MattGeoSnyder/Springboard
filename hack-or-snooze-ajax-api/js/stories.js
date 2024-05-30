"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}
        <i class="favorite-icon fa-xl fa-regular fa-heart"></i></small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function modifyFavoriteIcon(storyIcon) {
  let favorited = storyIcon.getAttribute('favorited');

  if (favorited === 'true'){
    storyIcon.classList.replace('fa-solid', 'fa-regular');
    storyIcon.setAttribute('favorited', 'false');
  } else if (favorited === 'false') {
    storyIcon.classList.replace('fa-regular', 'fa-solid');
    storyIcon.setAttribute('favorited', 'true');
  } else {
    storyIcon.setAttribute('favorited', 'false');
  }

}


function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  console.log('putStoriesOnPage');

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $story.find('i').on('click', handleFavorite);
    let icon = $story.find('i').get()[0];
    icon.setAttribute('favorited', false);

    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

async function submitStory(evt) {
  evt.preventDefault();
  await storyList.addStory(currentUser, 
    {
      author: $('#create-author').val(), 
      title: $('#create-title').val(),
      url: $('#create-url').val()
    });
    putStoriesOnPage();
    $('#story-form input').val("");
}

function putFavoritesOnPage(evt) {
  console.debug("Displaying current User's favorite stories");
  evt.preventDefault();
  $allStoriesList.empty();

  currentUser.getFavoritesFromLocalStorage();

  for(let favorite of currentUser.favorites){
    const $story = generateStoryMarkup(favorite);
    let icon = $story.find('i').get()[0];
    icon.addEventListener('click', handleFavorite);
    icon.classList.replace('fa-regular', 'fa-solid');
    icon.setAttribute('favorited', 'true');
    $allStoriesList.append($story);

    $allStoriesList.show();
  }
}


$storyForm.on('submit', submitStory);
/* eslint-disable indent */
import $ from 'jquery';
import store from './store.js';
import api from './api';
//This bookmark.js file holds all the event listeners for the app
//and the html that's being rendered in the page

const generateMainPageLayout = () => {
    return `
    <section class="container">
        <h1>My Bookmarks</h1>
        <div class="error-container shadow"></div>
        <div class="even-flex js-add-bookmark-button ">
          <button class='js-add-bookmark shadow'></button>
          <select class='js-filter-rating shadow'>
            <option value="0">minimum rating</option>
            <option value="1">1+ ♥</option>
            <option value="2">2+ ♥</option>
            <option value="3">3+ ♥</option>
            <option value="4">4+ ♥</option>
            <option value="5">5 ♥</option>
          </select>
        </div>
        <div id="js-add-new-bookmark" class="js-add-new-bookmark"></div>
    </section>
    <section class="container">
        <ul id="js-bookmark-list" class="bookmark-list"></ul>
    </section>
    `;
};

// generateForm is the form page with a place to input: Title, URL, rating and description 
const generateForm = () => {
    //form includes labels - a11y requirements
    //and the "for" attr matches the "id" - a11y requirements
    return `
    <form id="js-add-new-bookmark-form" class="js-add-new-bookmark-form">
        <div class="even-flex flex-direction">
            <fieldset class="flex-desktop">
                <label for="bookName">Add Bookmark Title</label>
                <input type="text" id="bookName" name="title" class="js-bookmark-title-entry" placeholder="write title here" required/>
            </fieldset>
            
            <fieldset class="flex-desktop">
                <label for="siteURL">Add Site</label>
                <input type="text" id="siteURL" name="url" class="js-bookmark-url-entry" placeholder="e.g., https://google.com" required/>
            </fieldset>
        </div>
        <div>
            <fieldset>
                <label for="addDescr">Add Description</label>
                <textarea name="desc" id="addDescr" class="js-bookmark-desc-entry textarea-newadd" maxlength="300" required></textarea>
            </fieldset>
        </div>

        <div class="flex-between">
            <div class="rating left-side heart-size" aria-label="please select rating for new bookmark">
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" required/>
                    <span class="icon">♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" />
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" />
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>   
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" />
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" />
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                    <span class="icon">♥</span>
                </label>
            </div>
            <button class="right-side add-button" type= "submit">CREATE</button>
        </div>
    </form>`;
}


// generateBookmarkElement & generateExpandedBookmarkElement adds html elements to the DOM, which are rendered by renderPage
const generateBookmarkElement = (bookmark, hearts) => {
    return `
      <li class="js-bookmark-item shadow" data-item-id="${bookmark.id}">
        <div class="top-half" tabindex=0>
          <h2>${bookmark.title}</h2>
        </div>
        <div class="bottom-half">
          <div class="rating even-flex">
          <span class="icon background-hearts">${hearts}</span>
          
          </div>
        </div>
      </li>
    `;
  };
const generateExpandedBookmarkElement = (bookmark) => {
    return `
    <li class="js-bookmark-item" data-item-id="${bookmark.id}">
       <div class="top-half" tabindex=0>
            <h2 class="bookmark-title">${bookmark.title}</h2>
       </div>
       <div class="flex-details">
            <div class="flex-link">
                <button class="flex-button" aria-label="click to visit bookmark" onclick=" window.open('${bookmark.url}','_blank')">visit</button>
            </div>
            <textarea name="desc" class="js-bookmark-desc-entry flex-desc" maxlength="300" required>${bookmark.desc}</textarea>
        </div>
        <div class="bottom-half flex-between">
            <div class="rating left-side heart-size>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" ${bookmark.rating == 1 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" ${bookmark.rating == 2 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" ${bookmark.rating == 3 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" ${bookmark.rating == 4 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                </label>
                <label>
                    <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" ${bookmark.rating == 5 ? 'checked' : '' } required/>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                    <span class="icon"♥</span>
                </label>
            </div>
            <div class="right-side">
                <button class="js-bookmark-save expand-buttons shadow" aria-label="click to save bookmark"><span class="buttonLabel">save</span></button>
                <button class="js-bookmark-delete expand-buttons shadow" aria-label="click to delete bookmark"><span class="buttonLabel">delete</span></button>
            </div>
        </div>
    </li>
       `;
};

const generateHeartRating = (number) => {
    let hearts = '';
    for(let i = 0; i < number; i++) {
      hearts += '♥';
    }
    return `<span class="icon colored-hearts">${hearts}</span>`;
  };

  // generateBookmarkString is the function that generates a string of bookmarks
  const generateBookmarkListString = (bookmarkList) => {
    const bookmarks = bookmarkList
     //.map passes the bookmark function that's then applied to every element of the array
    //returns a new array
      .filter((bookmark) => {
        return bookmark.rating >= store.rating;
      }).map((bookmark) => (!bookmark.expand) ? generateBookmarkElement(bookmark, generateHeartRating(bookmark.rating)) : generateExpandedBookmarkElement(bookmark));
    return bookmarks.join('');
  };

  const render = () => {
    renderError();
    $('main').html(generateMainPageLayout);
    if (store.addNewBookmark) {
      $('.js-add-new-bookmark').html(generateForm());
    } else {
      $('.js-add-new-bookmark').empty();
    }
    let bookmarks = [...store.bookmarks];
    //This renders the bookmark list in the DOM
    const bookmarkListString = generateBookmarkListString(bookmarks);
    //This inserts the HTML into the DOM
    $('.js-add-bookmark').html(!store.addNewBookmark ? 'add bookmark' : 'cancel bookmark');
    $('#js-bookmark-list').html(bookmarkListString);
  };

  const generateError = (message) => {
    return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
  };

const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.js-bookmark-item')
      .data('item-id');
};

//   ------------------event handlers -------------- //

//still working on this
  const renderError = () => {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  };
//still working on this
  const handleCloseError = () => {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      renderError();
    });
  };

  
  const handleAddNewBookmarkClick = () => {
    $('main').on('click','.js-add-bookmark', event => {
        event.preventDefault();
        store.toggleAddNewBookmark();
        render();
    });
};
  
const handleSubmitNewBookmark = () => {
    //console.log('CREATE BUTTON BOOKMARKS');
    $('main').on('submit', '.js-add-new-bookmark-form', event => {
      event.preventDefault();
      const newBookmarkData = $(event.target).serializeJson();
      api.createBookmark(newBookmarkData)
        .then((newBookmark) => {
          store.addBookmark(newBookmark);
          store.toggleAddNewBookmark();
          render();
        })
        .catch((error) => {
          store.setError(error.message);
          renderError();
        });
    });
};

const handleClickToExpandBookmark = () => {
    $('main').on('click', '.top-half', event => {
      const bookmarkId = getItemIdFromElement(event.currentTarget);
      const bookmark = store.findById(bookmarkId);
      store.findAndUpdate(bookmarkId, {expand: !bookmark.expand});
      render();
      store.bookmarks.forEach(bookmark => bookmark.expand = false);
    });
  };  

  
const handleDeleteBookmark = () => {
    $('main').on('click', '.js-bookmark-delete', event => {
      const bookmarkId = getItemIdFromElement(event.currentTarget);
      api.deleteBookmark(bookmarkId)
        .then(() => {
          store.findAndDelete(bookmarkId);
          render();
        })
        .catch((error) => {
          store.setError(error.message);
          renderError();
        });
    });
};
  
  const handleRatingFilter = () => {
    $('main').on('change', '.js-filter-rating', event => {
      store.rating = $(event.target).val();
      render();
    });
  };
  
const handleBookmarkSaveClick = () => {
    $('main').on('click', '.js-bookmark-save', event => {
      const bookmarkId = getItemIdFromElement(event.currentTarget);
      const newDesc = $('.js-bookmark-desc-entry').val();
      const newRating = $('input[name="rating"]:checked').val();
      const newData = JSON.stringify({desc: newDesc, rating: newRating});
      const parsedNewData = JSON.parse(newData);
      api.updateBookmark(bookmarkId, newData)
        .then(() => {
          store.findAndUpdate(bookmarkId, parsedNewData);
          render();
        })
        .catch((error) => {
          store.setError(error.message);
          renderError();
        });
    });
  };
  
$.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
});

const bindEventListeners = () => {
    handleAddNewBookmarkClick();
    handleSubmitNewBookmark();
    handleClickToExpandBookmark();
    handleDeleteBookmark();
    handleBookmarkSaveClick();
    renderError();
    handleCloseError();
    handleRatingFilter();
};


export default {
    generateMainPageLayout,
    generateForm,
    generateBookmarkElement,
    generateExpandedBookmarkElement,
    generateHeartRating,
    generateBookmarkListString,
    render,
    bindEventListeners,
}
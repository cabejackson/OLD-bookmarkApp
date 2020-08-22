/* eslint-disable indent */
import $ from 'jquery';
import store from './store.js';
import api from './api';
//This bookmark.js file holds all the event listeners for the app
//and the html that's being rendered on the page
 
 
 
/*
To-Dos:
-Create Toggle button to show STORE.expanded vs !STORE.expanded
-Get a list of bookmarks to be shown when user first opens the app
-make these required:
   Add Book Title
   Add Site Name
   Add Book Description
-Check all validations in the API documentation (e.g. title and url field required)
   -this and the above might be the same
   -not quite sure what this means
 
-BUT how do I make the cancel button not require rating input?
(maybe put it on the same level as the addNew button)
(the radio buttons are set to required, so that's why it happens)
- Create a dropdown (a <select> element)
   with a "minimum rating" to filter the list by
   all bookmarks rated at or above the chosen selection
BONUS: (Extension feature - optional)
- I can edit the rating and description of a bookmark in my list
NOTE:
Minimal global variables - what exactly are my global variables?
Follow a11y best practices
Use namespacing to adhere to good architecture practices
*/
 
 
 
 
// generateBookElement adds html elements to the DOM, which are rendered by renderPage
// Here's what I still need to do:
   //create a list of bookmarks to be shown when user first opens the app
const generateBookElement = function (STORE) {
   //if the STORE.expanded property is set to true
   //then the description, url, edit button and delete button will be shown
   if(STORE.expanded ===true){
       // each bookmark has it's own unique id
       // QUESTION: Why doesn't the STORE.stars string attach itself to the STORE.rating?
       // aria-label added for edit & delete button - a11y requirements
       return `
       <li class="bookmark" data-bookmark-id="${STORE.id}">
           <div class="bookmark-title">${STORE.title}</div><div class="bookmark-rating">${STORE.rating}${STORE.stars}</div>
           <div class="expanded">
           <button class="editBookmark" aria-label="click to edit bookmark">
           <span class="buttonLabel">✏️</span>
         </button>
           <button class="delete" aria-label="click to delete bookmark"><span class="buttonLabel">🗑</span></button>
           <p class="bookmark-description">${STORE.desc}</p>
           <a href="${STORE.url}"><button class="visit site"> Visit Site</button></a>
           </div>
       </li>`;
   } else {
       //if the STORE.expanded property is set to false,
       //then only the title and rating will be shown in the DOM
       // THIS fufills the "All bookmarks in the list default to a
       // "condensed" view showing only title and rating" requirement
       return `
       <li class="bookmark" data-bookmark-id="${STORE.id}">
           <div class="bookmark-title">${STORE.title}</div><div class="bookmark-rating"> ${STORE.rating}${STORE.stars}</div>
           <div class="expanded hidden">
           </div>
       </li>`;
   }
};
 
 
// generateForm is the form page with a place to input: Title, URL, rating and description
// Here's what I still need to do:
   //fix unecessary divs & I can't click cancel w/o it requiring radio button selection
function generateForm() {
   //form includes labels - a11y requirements
   //and the "for" attr matches the "id" - a11y requirements
   return `
 <form id="add-bookmark">
     <div class="form-group">
         <label for="bookName">Add Bookmark Title</label>
         <input type="text" class="form-control" id="bookName" placeholder="write title here" required>
     </div>
     <div class="form-group">
         <label for="siteURL">Add Site URL</label>
         <input type="text" class="form-control" id="siteURL" placeholder="http://samplelink.com" required>
     </div>
     <div class="form-group">
         <label for="addDescr">Add Description</label>
         <input type="text" class="form-control" id="addDescr" placeholder="write description here">
     </div>
     <div id="star-rating">
      <div class="add-book-rating-radio-button" aria-label="please select rating for new bookmark">
     <fieldset>
         <legend aria-label="star ratings" >⭐️Ratings</legend>
         <label aria-label="select 5 star rating" for="5">5</label>
         <input type="radio" id="5" value= "5" name="radioRating">
         <label aria-label="select 4 star rating" for="4">4</label>
         <input type="radio" id="4" value= "4" name="radioRating">
         <label aria-label="select 3 star rating" for="3">3</label>
         <input type="radio" id="3" value= "3" name="radioRating">
         <label aria-label="select 2 star rating" for="2">2</label>
         <input type="radio" id="2" value= "2" name="radioRating">
         <label aria-label="select 1 star rating" for="1">1</label>
         <input type="radio" id="1" value= "1" name="radioRating">
     </fieldset>
     <button id= "create" type= "submit">CREATE</button>
 </div>
  <form id="cancel-addBookmark">
 <button id="buttonCancel" aria-label="click to cancel bookmark creation">CANCEL</button>
 </form>
 </div>
  </div>`;
 
};

const  generateFilter = function() {
    if (store.filter) {
        let filterArr = [];
        for (let i = 1; i < 6; i++) {
            if (i === store.filterVal) {
                filterArr.push(`<option class='filter-option' value="${i}" selected>${i}</option>`);
            } else {
                filterArr.push(`<option class='filter-option' value="${i}">${i}</option>`);
            }
        }
        let optionStr = filterArr.join('');

        return `<div class="bookmark-filter">
    <label for="filter">Filter Bookmarks: Minimum Rating</label>
    <select name="filter" id="filter" value="">
        ${optionStr}
       </select>
      </div>`;
    }
};



// Here's what I still need to do:
   // Understand how this generateError message works!!
   //Questions:
       // where should the message go?
       // what is the message?
       // should it be in store.js?
const generateError = function (message) {
   return `<section class="errorContent">
   <button id="cancelError">X</button>
   <p>${message}</p>
</section>`;
};
 
// generateBookmarkString is the function that generates a string of bookmarks
const generateBookmarkString = function (bookmarkList) {
   //.map passes the bookmark function that's then applied to every element of the array
   //returns a new array
   const bookmarks = bookmarkList.map((bookmark) => generateBookElement(bookmark));
   return bookmarks.join('');
};
 
 
//opens new bookmark form
const handleOpenAddForm = function () {
   $('#addNew').click(function () {
       store.handleAddShow();
       renderPage();
   });
};
 
 
//opens new the visit site in a new tab once clicked
//listens for visit site click
//returns user to href in new tab?
const handleVisitSite = function () {
 
};
 
//listens for when the x on the error is clicked
const handleDismissError = function () {
   $('.errorContent').on('click', '#cancelError', () => {
       store.setError(null);
       renderError();
   });
};


const filterButton = function() {
    $('.header').on('click', '#filter-start', () => {
        store.states.filter = !store.states.filter;
        renderPage();
    });
};

const filterSelection = function() {
    $('main').on('change', '#filter', () => {
        store.states.filterVal = $('option:selected').val();
        renderPage();
    });
};
 
 
//VERY CoNFUSED
//should returns user back to initialPage
const handleBookmarkCancel = function () {
   // $('#cancel-addBookmark').click(function (){
   // add event.preventDefault to this
   //     store.handleAddHide();
   //     let cancel = generateForm();
   //     console.log('heyyyyyyy', cancel);
   //     $('form').html(cancel);
   //     renderPage();
 
   //   });
};
 
//says POST Bad request - hmmm idk ask later
//listens for form submit
//Adds newly created bookmark to the store and api
const handleAddBookmarkSubmit = function () {
   console.log('CREATE BUTTON BOOKMARKS');
   $('#formContent').submit(function (event) {
       event.preventDefault();
       const newBookmarkName = $('#bookName').val();
       const newBookmarkURL = $('#siteURL').val();
       //const newBookmarkDescr = $('#addDescr').val();
       const newBookmarkRating = $('input[name=\'radioRating\']:checked').val();
       $('#bookName').val('');
       api.createBookmark(newBookmarkName, newBookmarkURL, newBookmarkRating)
           .then((newBookmark) => {
               store.addBookmark(newBookmark);
               renderPage();
           })
           .catch((error) => {
               store.setError(error.message);
               renderError();
           });
   });
};
 
 
 
 
// .closest('.js-bookmark-element')
// .data('bookmark-id');
 
const getIdFromElement = function (bookmark) {
   return $(bookmark)
       .closest('.bookmark') //closest list item
       .data('id'); // item-id is an attr used in <li data-id="${store.STORE[i].id}">
};
 
 
 
 
//This function deletes bookmark in store/api then updates the DOM
const handleDeleteBookmarkClicked = function () {
   console.log('DELETE is running');
   $('.bookmark').on('click', '.delete', e => {
       const id = getIdFromElement(e.currentTarget);
       api.deleteBookmark(id)
           .then(() => {
               store.findAndDelete(id);
               renderPage();
           })
           .catch((error) => {
               store.setError(error.message);
               renderError(); // add renderError
           });
   });
};
 
 
 
 
const renderError = function () {
   if (store.error) {
       const el = generateError(store.error);
       $('.errorContent').html(el);
   } else {
       $('.errorContent').empty();
   }
};
 
 
//conditional statement needed for error vs rederPage?
const renderPage = function () {
   console.log('RENDER PAGE!', store.adding);
   renderError();
   let bookmarks = [...store.STORE];
   //let html = generateHtml(); -- maybe not needed
   const bookmarkListString = generateBookmarkString(bookmarks);
   $('.bookmarkList').html(bookmarkListString);
 
 
   if (store.adding) {
       //console.log('RENDER PAGE!');
       $('#formContent').html(generateForm());
   } else {
       $('#formContent').empty();
   }
};
 
 
 
 
//this function is running all the e listeners
function bindEventListeners() {
   handleOpenAddForm();
   handleAddBookmarkSubmit();
   handleDeleteBookmarkClicked();
   handleBookmarkCancel();
   handleDismissError();
   handleVisitSite();
   filterButton();
   filterSelection();
}

export default {
    generateBookElement,
    generateForm,
    generateFilter,
    getIdFromElement,
    renderPage,
    renderError,
    bindEventListeners,
 };
 
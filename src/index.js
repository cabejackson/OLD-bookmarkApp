/* eslint-disable indent */
import './index.css';
import $ from 'jquery';
import api from './scripts/api';
import store from './scripts/store';
import bookmarks from './scripts/bookmarks';
 
 
const main = function () {
 console.log('MAIN -THISSSS WORKS!');
 api.getBookmarks()
 .then((bookmarksArr) => {
   bookmarksArr.forEach((bookmark) => store.addBookmark(bookmark));
   bookmarks.renderPage();
 });
 bookmarks.bindEventListeners();
 bookmarks.renderPage();
};
 
$(main);
/* eslint-disable indent */
//looks similar to shopping list
//import cuid from 'cuid';
 
const STORE = [
    {
        id: '',
        title: '',
        rating: 0,
        stars: '⭐️',
        url: '',
        description: '',
        expanded: false
    }
 ];
 let adding = false;
 let error = null;
 let filter = 0;
  
 function handleAddShow() {
    //console.log('THIS IS ADDING', adding);
    this.adding = true;
 }
 // function handleAddHide() {
 //     //console.log('THIS IS ADDING', adding);
 //     this.adding = false;
 // }
  
  
 const findById = function (id) {
    return this.STORE.find(currentBookmark => currentBookmark.id === id);
 };
  
 const addBookmark = function (bookmark) {
    this.STORE.push(bookmark);
 };
  
 const findAndDelete = function (id) {
    this.STORE = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
 };
  
 const toggleExpandBookmark = function () {
    this.bookmarks.expanded = !this.bookmarks.expanded;
 };
  
 const toggleAdding = function () {
    this.adding = !this.adding;
 };
  
 const findAndUpdate = function (id, newData) {
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newData);
 };
  
 const setError = function (error) {
    this.error = error;
 };
  
 export default {
    STORE,
    adding,
    error,
    filter,
    findById,
    addBookmark,
    findAndDelete,
    toggleExpandBookmark,
    toggleAdding,
    findAndUpdate,
    setError,
    handleAddShow,
 };
 
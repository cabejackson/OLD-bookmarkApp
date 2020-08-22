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
 //different states (global var)
 //move these to store?
 let adding = false;
 let error = null;
 let filterVal = 0;
 let filter = false;
 
//HMMMMMMM
// function to toggle
// function toggleAdding(){
//    if (adding === false){
//      adding = true;
//    } else {
//      adding = false;
//    }
//  }

// Function to toggle exanded
// function toggleExpand(val){
//    STORE.expanded = val;
//  }

 function handleAddShow() {
    //console.log('THIS IS ADDING', adding);
    this.adding = true;
 }
 function handleAddHide() {
     //console.log('THIS IS ADDING', adding);
     this.adding = false;
 }
  
  
 const findById = function (id) {
    return this.STORE.find(currentBookmark => currentBookmark.id === id);
 };
  
 const addBookmark = function (bookmark) {
    this.STORE.push(bookmark);
 };
  
 const findAndDelete = function (id) {
    this.STORE = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
 };
  
 const toggleExpandBookmark = function (id) {
    console.log('newwwwwww toggle');
   const bookmark = this.findById(id);
   console.log('tHIS IS THE BOOKMARK ->', bookmark);
   bookmark.expanded = !bookmark.expanded;
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
    filterVal,
    findById,
    addBookmark,
    findAndDelete,
    toggleExpandBookmark,
    //toggleAdding,
    //toggleExpand,
    findAndUpdate,
    setError,
    handleAddShow,
    handleAddHide,
 };
 
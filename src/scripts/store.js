'use_strict';
//minimal global variables
let bookmarks = [];
let addNewBookmark = false;
let rating = 0;
let error = null;

function setError(error) {
   this.error = error;
}

function findById(id) {
   return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
}


function addBookmark(bookmark) {
   let expand = {
      expand: false
   };
   bookmark = {
      ...bookmark,
      ...expand
   }
   this.bookmarks.push(bookmark);
}

function findAndUpdate(id, newData) {
   Object.assign(this.bookmarks.find(bookmark => bookmark.id === id), newData);
}

function findAndDelete(id) {
   this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
}
// function addBookmark(bookmark) {
//   let expand = {expand:true};
//    //console.log('store expanded', expand)
//   bookmark = {...bookmark, ...expand}
//   this.bookmarks.push(bookmark);
// }

function toggleAddNewBookmark() {
   this.addNewBookmark = !this.addNewBookmark;
}



export default {
   bookmarks,
   addNewBookmark,
   rating,
   setError,
   findById,
   addBookmark,
   toggleAddNewBookmark,
   findAndUpdate,
   findAndDelete,
   error
}






// /* eslint-disable indent */
// //looks similar to shopping list
// //import cuid from 'cuid';

// const STORE = [
//     {
//         id: '',
//         title: '',
//         rating: 0,
//         stars: '⭐️',
//         url: '',
//         description: '',
//         expanded: false
//     }
//  ];
//  //different states (global var)
//  //move these to store?
//  let adding = false;
//  let error = null;
//  let filterVal = 0;
//  let filter = false;
//  let bookmarks = [];

// //HMMMMMMM
// // function to toggle
// // function toggleAdding(){
// //    if (adding === false){
// //      adding = true;
// //    } else {
// //      adding = false;
// //    }
// //  }

// // Function to toggle exanded
// // function toggleExpand(val){
// //    STORE.expanded = val;
// //  }

// //  function handleAddShow() {
// //     //console.log('THIS IS ADDING', adding);
// //     this.adding = true;
// //  }
// //  function handleAddHide() {
// //      //console.log('THIS IS ADDING', adding);
// //      this.adding = false;
// //  }


//  const findById = function (id) {
//     return this.STORE.find(currentBookmark => currentBookmark.id === id);
//  };

//  const addBookmark = function (bookmark) {
//     this.STORE.push(bookmark);
//  };

//  const findAndDelete = function (id) {
//     this.STORE = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
//  };

//  function toggleAddNewBookmark() {
//    this.addNewBookmark = !this.addNewBookmark;
//  }

//  const toggleExpandBookmark = function (id) {
//     console.log('newwwwwww toggle');
//    const bookmark = this.findById(id);
//    console.log('tHIS IS THE BOOKMARK ->', bookmark);
//    bookmark.expanded = !bookmark.expanded;
//  };


//  const findAndUpdate = function (id, newData) {
//     const currentBookmark = this.findById(id);
//     Object.assign(currentBookmark, newData);
//  };

//  const setError = function (error) {
//     this.error = error;
//  };



//  function findById(id) {
//    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
//  }

//  function addBookmark(bookmark) {
//    let expand = {expand:false};
//    bookmark = {...bookmark, ...expand}
//    this.bookmarks.push(bookmark);
//  }

//  function toggleAddNewBookmark() {
//    this.addNewBookmark = !this.addNewBookmark;
//  }

//  function findAndUpdate(id, newData) {
//    Object.assign(this.bookmarks.find(bookmark => bookmark.id === id), newData);
//  }

//  function findAndDelete(id) {
//    this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
//  }

//  export default {
//     STORE,
//     adding,
//     error,
//     filter,
//     bookmarks,
//     filterVal,
//     findById,
//     addBookmark,
//     findAndDelete,
//     toggleAddNewBookmark
//     toggleExpandBookmark,
//     //toggleAdding,
//     //toggleExpand,
//     findAndUpdate,
//     setError,
//     handleAddShow,
//     handleAddHide,
//  };
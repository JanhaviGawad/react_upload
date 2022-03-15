import React from 'react';

const FriendsContext = React.createContext({
  items: [],
  currentPage:1,
  postsPerPage:1,
  searchText: "",
  paginate:(number)=>{},
  onAddNewFriend: (item) => {},
  onDeleteFriend: (id) => {},
  onFavFriend:(id)=>{}
});

export default FriendsContext;

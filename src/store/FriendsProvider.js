import { useReducer } from 'react';
import FriendsContext from "./store-context";
const defaultFriendsState = {
  items: [
    { name: "Rahul Gupta", id: 1, fav: true},
    { name: "Shivangi Sharma", id: 2, fav: false },
    { name: "Rohit Sharma", id: 3, fav: false}
  ],
  postsPerPage: 4,
  currentPage: 1,
  searchText: "",
};
let count=defaultFriendsState.items.length+1;

const friendsReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems;
    updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
      postsPerPage: state.postsPerPage,
      currentPage: state.currentPage,
      searchText: state.searchText,
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems;
    updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      items: updatedItems,
      postsPerPage: state.postsPerPage,
      currentPage: state.currentPage,
      searchText: state.searchText
    };
  }

  if (action.type === "FAVOURITE") {
    let updatedItems;
    updatedItems = state.items.map((item) => {
      if (item.id === action.id)
        if (item.fav) item.fav = false;
        else item.fav = true;
      return item;
    });
    updatedItems.sort( (a, b)=> {
      if (a.fav < b.fav) {
        return 1;
      }
      if (a.fav > b.fav) {
        return -1;
      }
      return 0;
    });
    return {
      items: updatedItems,
      postsPerPage: state.postsPerPage,
      currentPage: state.currentPage,
      searchText: state.searchText
      
    };
  }

  if (action.type === "PAGINATE") {
    return {
      items: state.items,
      postsPerPage: state.postsPerPage,
      currentPage: action.pageNo,
      searchText: state.searchText
    };
  }

 

  return defaultFriendsState;
};

const FriendsProvider = (props) => {
  const [friendState, dispatchAction] = useReducer(friendsReducer,defaultFriendsState);

  const addFriendHandler = (item) => {
    const newFriend={ name: item, id: count++, fav: false };
    dispatchAction({ type: "ADD", item: newFriend });
  };

  const deleteFriendHandler = (id) => {
    dispatchAction({ type: "REMOVE", id: id });
  };

  const favFriendHandler = (id) => {
    dispatchAction({ type: "FAVOURITE", id: id });
  };

  const paginateHandler = (number) => {
    dispatchAction({ type: "PAGINATE", pageNo: number });
  };

 

  const friendsContext = {
    items: friendState.items,
    postsPerPage: friendState.postsPerPage,
    currentPage: friendState.currentPage,
    searchText: friendState.searchText,
    onAddNewFriend: addFriendHandler,
    onDeleteFriend: deleteFriendHandler,
    onFavFriend: favFriendHandler,
    onPaginate: paginateHandler
  };

  return (
    <FriendsContext.Provider value={friendsContext}>
      {props.children}
    </FriendsContext.Provider>
  );
};

export default FriendsProvider;

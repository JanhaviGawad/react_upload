import styles from "./FriendsList.module.css";
import { useState,useContext } from "react";
import FriendCard from "./FriendCard";
import AddFriends from "./AddFriends";
import Pagination from "./UI/Pagination";
import SearchBox from "./UI/SearchBox";
import FriendsContext from "../store/store-context";

const FriendsList = () => {
  const friendCtx = useContext(FriendsContext);
  const [searchText, setSearchText] = useState("");

  const indexOfLastPost = friendCtx.currentPage * friendCtx.postsPerPage;
  const indexOfFirstPost = indexOfLastPost - friendCtx.postsPerPage;
  const currentPosts = friendCtx.items.slice(indexOfFirstPost, indexOfLastPost);


  const searchTextValue = (text) => {
    setSearchText(text.toLocaleLowerCase());
  };

  const paginate=(number)=>{
    friendCtx.onPaginate(number);

  }

  return (
    <>
      <AddFriends ></AddFriends>
      <SearchBox onSearch={searchTextValue}></SearchBox>
      <section className={styles.FriendDetails}>
        {currentPosts.filter((val) => {
            if (searchText == "") 
              return val;
            else if (val.name.toLocaleLowerCase().includes(searchText))
              return val;
              return false;
          }).map((item) => {
            return (
              <FriendCard
                key={item.id}
                fav={item.fav}
                name={item.name}
                id={item.id}
              ></FriendCard>
            );
          })}
      </section>
      <Pagination
        postsPerPage={friendCtx.postsPerPage}
        totalPosts={friendCtx.items.length}
        paginate={paginate}
      ></Pagination>
    </>
  );
};

export default FriendsList;

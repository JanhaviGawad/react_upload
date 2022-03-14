import styles from "./FriendsList.module.css";
import { useState } from "react";
import FriendCard from "./FriendCard";
import AddFriends from "./AddFriends";
import Pagination from "./UI/Pagination";
import SearchBox from "./UI/SearchBox";
const dummyData = [
  { name: "Rahul Gupta", id: 1, fav: "true" },
  { name: "Shivangi Sharma", id: 2, fav: "false" },
  { name: "Rohit Sharma", id: 3, fav: "false" },
];
let count = dummyData.length+1;
const FriendsList = () => {
  const [friendsData, setFriendsData] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [searchText, setSearchText] = useState("");

  const onAddNewFriend = (enteredName) => {
    setFriendsData((prevList) => {
      const updatedList = [...prevList];
      updatedList.push({ name: enteredName, id: count++, fav: false });
      return updatedList;
    });
  };

  const deleteFriendHandler = (friendId) => {
    setFriendsData((prevGoals) => {
      const updatedList = prevGoals.filter(
        (friends) => friends.id !== friendId
      );
      return updatedList;
    });
  };

  function compare(a, b) {
    if (a.fav < b.fav) {
      return 1;
    }
    if (a.fav > b.fav) {
      return -1;
    }
    return 0;
  }

  const favFriendHandler = (friendId) => {
    setFriendsData((prevFriends) => {
      const updatedList = prevFriends.map((friend) => {
        if (friend.id == friendId) {
          if(friend.fav=="true")
            friend.fav="false";
          else 
          friend.fav="true";
        }

        return friend;
      });
      updatedList.sort(compare);
      return updatedList;
    });
  };

  const searchTextValue = (text) => {
    setSearchText(text.toLocaleLowerCase());
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = friendsData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <AddFriends onAddNewFriend={onAddNewFriend}></AddFriends>
      <SearchBox onSearch={searchTextValue}></SearchBox>
      <section className={styles.FriendDetails}>
        {currentPosts
          .filter((val) => {
            if (searchText == "") return val;
            else if (val.name.toLocaleLowerCase().includes(searchText))
              return val;
          })
          .map((item) => {
            return (
              <FriendCard
                key={item.id}
                fav={item.fav}
                name={item.name}
                id={item.id}
                onDelete={deleteFriendHandler}
                onFav={favFriendHandler}
              ></FriendCard>
            );
          })}
      </section>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={friendsData.length}
        paginate={paginate}
      ></Pagination>
    </>
  );
};

export default FriendsList;

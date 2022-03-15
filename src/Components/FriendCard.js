import { useState,useContext } from "react";
import styles from "./FriendCard.module.css";
import FriendsContext from "../store/store-context";

const FriendCard = (props) => {
  const friendCtx = useContext(FriendsContext);
  const [isFav, setIsFav] = useState(props.fav);

  const deleteHandler = () => {
    friendCtx.onDeleteFriend(props.id);
  };
  const favHandler = (event) => {
    friendCtx.onFavFriend(props.id);
    setIsFav((prev) => {
      if (prev == true) return false;
      else return true;
    });
   
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_details}>
        <h2>{props.name}</h2>
        <h3>is your friend</h3>
      </div>
      {!isFav && (
        <button className={styles.star} onClick={favHandler}>
          &#9734;
        </button>
      )}
      {isFav && (
        <button className={styles.star} onClick={favHandler}>
          {" "}
          &#9733;
        </button>
      )}

      <button className="fa fa-trash-o" onClick={deleteHandler}></button>
    </div>
  );
};

export default FriendCard;

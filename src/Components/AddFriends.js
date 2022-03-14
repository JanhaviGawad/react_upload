import { useState, useRef } from "react";
import classes from "./AddFriends.module.css";

const AddFriends = (props) => {
  const [nameIsValid, setNameIsValid] = useState(true);
  const [friendName, setFriendName] = useState("");
  const friendInputRef = useRef();

  const submitHandler = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      const enteredName = friendInputRef.current.value;
      if (enteredName.trim().length === 0) {
        setNameIsValid(false);
        return;
      }
      console.log("added name");
      props.onAddNewFriend(enteredName);
      setFriendName("");
    }
  };

  const nameChangeHandler = (event) => {
    setFriendName(event.target.value);  
  };


  return (
    <form className={classes.form}>
      <div>
        <input
          ref={friendInputRef}
          value={friendName}
          onChange={nameChangeHandler}
          onKeyDown={submitHandler}
          placeholder="Enter your friend's name"
          id="newFriend"
          type="text"
        />
      </div>

      {!nameIsValid && <p>Please enter a valid name.</p>}
    </form>
  );
};

export default AddFriends;

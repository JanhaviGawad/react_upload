import classes from './SearchBox.module.css'

const SearchBox=(props)=>{


    const searchBoxHandler=(event)=>{
        props.onSearch(event.target.value);
    }
    return (<input  className={classes.search} onChange={searchBoxHandler} type="search" placeholder="Search.."></input>);
  }
  
export default SearchBox;
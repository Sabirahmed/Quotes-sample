import { useRef, useEffect, useState } from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import {addComment} from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const [enteredValue, setEnteredValue] = useState(false);


  const {sendRequest, status, error} = useHttp(addComment);

  const {onAddedComment, quoteId} = props;

  useEffect(()=>{
    if(status === 'completed' && !error) {
      onAddedComment();
    }
  },[status, error, onAddedComment])

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    if(enteredText === '' || enteredText.trim().length === 0){
        setEnteredValue(true);
    }else {
        sendRequest({commentData:{text:enteredText}, quoteId});
        setEnteredValue(false);
    }

  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && 
        (<div className='centered'>
          <LoadingSpinner />
        </div>)
      }
      {enteredValue && (<p className='centered'>Please fill commentbox before submitting.</p>)}
      
      <div className={classes.control}>
        <label htmlFor='comment'>Your Comment!</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;

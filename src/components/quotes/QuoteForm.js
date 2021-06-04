import { Fragment, useRef, useState } from 'react';
import {Prompt} from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const [isEntering, setIsEntering] = useState(false);
  const [enteredValue, setEnteredValue] = useState(true);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here
    if(enteredText === ' ' || enteredText.trim().length === 0 ||  enteredAuthor === '' || enteredAuthor.trim().length === 0){
      setEnteredValue(true);
    }else {
      setEnteredValue(false);
      props.onAddQuote({ author: enteredAuthor, text: enteredText });
    }
    
  }
  

  const focusCompletionHandler = () => {
    setIsEntering(false);
  }

  const formFocusHandler = () => {
    setIsEntering(true);
  }

  return (
    <Fragment>
      <Prompt when={isEntering} 
        message={()=> 'Are you sure want to leave this page? All entered data would be lost!'}
      />
    
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler} onFocus={formFocusHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        {enteredValue && isEntering &&(
           <p className='centered'>Please enter all the value before submitting the form!</p>)
        }

        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
       
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button className='btn' onClick={focusCompletionHandler}>Add Quote</button>
        </div>
      </form>
    </Card>
    </Fragment>
  );
};

export default QuoteForm;

import React, { useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { ref, set, remove } from '@firebase/database';

export default function EditingBug({
  setIsEditing,
  setCurrentEditbug,
  currentComments,
  currentEditBug,
}) {
  // Current User
  const { currentUser } = useAuth();
  const commentRef = useRef();

  //   Time Functions
  // For todays date;
  Date.prototype.today = function () {
    return (
      (this.getMonth() + 1 < 10 ? '0' : '') +
      (this.getMonth() + 1) +
      '/' +
      (this.getDate() < 10 ? '0' : '') +
      this.getDate() +
      '/' +
      this.getFullYear()
    );
  };

  // For the time now
  Date.prototype.timeNow = function () {
    return (
      (this.getHours() < 10 ? '0' : '') +
      this.getHours() +
      ':' +
      (this.getMinutes() < 10 ? '0' : '') +
      this.getMinutes()
    );
  };

  let datetime = new Date().today() + ' @ ' + new Date().timeNow();

  //   Create new comment for the bug
  const createNewComment = (e) => {
    e.preventDefault();
    // Random Comment ID
    let randomID = Math.floor(1000 + Math.random() * 9000);

    // users/${currentUser.uid}/bug/${bug.id}
    if (commentRef.current.value.length > 0) {
      set(
        ref(
          db,
          'orgs/' +
            currentUser.photoURL +
            '/bugs/' +
            currentEditBug.id +
            '/comments/' +
            randomID
        ),
        {
          user: currentUser.displayName,
          string: commentRef.current.value,
          created: datetime,
          id: randomID,
          uid: currentUser.uid,
        }
      );
    } else {
      return;
    }
  };

  //   Delete Comment
  const deleteComment = (id) => {
    // Edit Bug
    let instanceComment = ref(
      db,
      'orgs/' +
        currentUser.photoURL +
        '/bugs/' +
        currentEditBug.id +
        '/comments/' +
        id
    );
    try {
      remove(instanceComment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p
        className='goBackBTN'
        onClick={() => {
          setCurrentEditbug(null);
          setIsEditing(false);
        }}
      >
        GO BACK
      </p>
      <h2 className='commentTitle'>Comments</h2>
      <div className='commentsWrapper'>
        {currentComments.length >= 1 ? (
          currentComments.map((comment, i) => {
            return (
              <div className='comment' key={i}>
                <p className='commentUser'>
                  <strong>User:</strong> {comment.user}
                </p>
                <p className='commentString'>{comment.string}</p>
                <p className='commentCreated'>
                  <strong>Posted on:</strong> {comment.created}
                </p>
                {comment.uid === currentUser.uid ? (
                  <p
                    commentID={comment.id}
                    onClick={() => deleteComment(comment.id)}
                    className='deleteCommentBTN'
                  >
                    X
                  </p>
                ) : null}
              </div>
            );
          })
        ) : (
          <p className='noComments'>No comments have been posted</p>
        )}
      </div>
      <form
        className='commentAddWrapper'
        onSubmit={(e) => {
          createNewComment(e);
          commentRef.current.value = '';
        }}
      >
        <input
          type='text'
          className='addComment'
          ref={commentRef}
          defaultValue=''
        />
        <input
          type='submit'
          value='Add Comment'
          className='addCommentBTN'
          onClick={(e) => {
            createNewComment(e);
            commentRef.current.value = '';
          }}
        />
      </form>
    </div>
  );
}

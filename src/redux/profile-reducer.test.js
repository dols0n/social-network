import postPhoto from "../assets/image/postPhoto.jpg";
import profileReducer, {addNewUserPost, deleteUserPost} from "./profile-reducer";

let state = {
    posts: [{id: 1, postMessage: 'it is my first post on this social network',likes: 4, isLikes: false, postPhoto: postPhoto},
        {id: 2, postMessage: 'it is my second post on this social network', likes: 2, isLikes: false, postPhoto: postPhoto},
        {id: 3, postMessage: 'oh, this social network is so small', likes: 7, isLikes: false, postPhoto: postPhoto},
        {id: 4, postMessage: 'i go to the theatre this evening', likes: 1, isLikes: false, postPhoto: postPhoto}
    ]
}

it('new post should be added', () => {
    let actionMessage = 'it is new post from test'
    let action = addNewUserPost(actionMessage)

    let newState = profileReducer(state, action)

    expect(newState.posts[4].postMessage).toBe(actionMessage)
})

it('after deleting length of message should be decrement', () => {
    let action = deleteUserPost(2)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})
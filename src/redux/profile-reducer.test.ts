import {
	addPostAC,
	deletePostAC,
	initialStateProps,
	PostDataProps,
	profileReducer,
} from "./profile-reducer"

let startState: initialStateProps

beforeEach(() => {
	startState = {
		PostData: [
			{ id: "1", message: "hello", likeCount: 0 },
			{ id: "2", message: "yes", likeCount: 5 },
			{ id: "3", message: "hi", likeCount: 9 },
		],
		profile: null,
		status: "",
	} 
})

test(" new post should be added", () => {
	let newPostText = "new post added"
	let action = addPostAC(newPostText)

	let endState = profileReducer(startState, action)

	expect(endState.PostData.length).toBe(4)
	// expect(endState.postsMessagesData[0].likesCounter).toBe(0)
})
test(" new post should be correct", () => {
	let newPostText = "new post added"
	let action = addPostAC(newPostText)

	let endState = profileReducer(startState, action)

	expect(endState.PostData[3].message).toBe(newPostText)
	// expect(endState.postsMessagesData[0].likesCounter).toBe(0)
})

test('post should be deleted', () => {
  let action = deletePostAC('1')
    let endState = profileReducer(startState, action)

    expect(endState.PostData.length).toBe(2)
})

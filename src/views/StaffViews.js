import { Route, Routes } from "react-router-dom"
import { PostList } from "../components/posts/PostList"
import { UserPost } from "../components/posts/UserPost"
import { PostDetails } from "../components/posts/PostDetails"
import { UserList } from "../components/users/StaffUsers/UserList"
import { PostForm } from "../components/posts/PostForm"
import { PostEdit } from "../components/posts/PostEdit"
import { UserDetail } from "../components/users/StaffUsers/UserDetail"
import { PostComments } from "../components/comments/PostComments"
import { CommentForm } from "../components/comments/CommentForm"
import { EditComment } from "../components/comments/CommentEdit"
import { LandingPageGreeting } from "../components/landingPage/LandingPage.js"
import { StaffProfile } from "../components/profile/StaffProfile/StaffProfile.js"




export const StaffViews = ({ token, setToken}) => {
  return <>
    <Routes>
        <Route path="/" element={<LandingPageGreeting/>}  />
        <Route path="/posts" element={<PostList />}  />
        <Route path="/my-posts" element={<UserPost token={token}/>}  />
        <Route path="/posts/:postId" element={<PostDetails />}  />
        <Route path="/comments/:postId" element={<PostComments token={token}/>}  />
        <Route path="/commentform/:postId" element={<CommentForm token={token}/>}  />
        
        <Route index element={<UserList />} />
        <Route path=":userId" element={<UserDetail token={token}/>} />
        <Route path="profile/:userId" element={<StaffProfile />} />
        <Route path="/postform" element={<PostForm token={token}/>}  />
        <Route path="/my-posts/:postId/edit" element={<PostEdit />}  />
        <Route path="/comments/:commentId/edit" element={<EditComment />}  />

    </Routes>
  </>
}


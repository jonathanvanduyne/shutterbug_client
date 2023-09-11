import { Route, Routes } from "react-router-dom"
import { PostList } from "../components/posts/PostList"
import { PostDetails } from "../components/posts/PostDetails"
import { UserList } from "../components/users/StaffUsers/UserList"
import { PostForm } from "../components/posts/PostForm"
import { PostEdit } from "../components/posts/PostEdit"
import { UserDetail } from "../components/users/StaffUsers/UserDetail"
import { PostComments } from "../components/comments/PostComments"
import { CommentForm } from "../components/comments/CommentForm"
import { EditComment } from "../components/comments/CommentEdit"
import { LandingPageGreeting } from "../components/landingPage/StaffLandingPage.js"
import { StaffProfile } from "../components/profile/staffProfile/StaffProfile.js"
import { StaffEditProfile } from "../components/profile/staffProfile/StaffEditProfile.js"
import { UserProfileWithPosts } from "../components/profile/staffProfile/CompleteProfile.js"




export const StaffViews = ({ token, setToken}) => {
  return <>
    <Routes>
        <Route path="/" element={<LandingPageGreeting/>}  />
        
        <Route path="/posts" element={<PostList />}  />
        <Route path="/postform" element={<PostForm token={token}/>}  />
        <Route path="/my-posts/:postId/edit" element={<PostEdit />}  />
        <Route path="/posts/:postId" element={<PostDetails />}  />
        
        <Route path="/commentform/:postId" element={<CommentForm token={token}/>}  />
        <Route path="/comments/:commentId/edit" element={<EditComment />}  />
        
        <Route path="users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetail token={token}/>} />
        
        <Route path="/profile" element={<UserProfileWithPosts />} />
        <Route path="/profile/editForm" element={<StaffEditProfile />} />

    </Routes>
  </>
}


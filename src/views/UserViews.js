import { Route, Routes } from "react-router-dom"
import { PostList } from "../components/posts/PostList"
import { PostDetails } from "../components/posts/PostDetails"
import { PostForm } from "../components/posts/PostForm"
import { PostEdit } from "../components/posts/PostEdit"
import { UserDetail } from "../components/users/StaffUsers/UserDetail"
import { CommentForm } from "../components/comments/CommentForm"
import { EditComment } from "../components/comments/CommentEdit"
import { LandingPageGreeting } from "../components/landingPage/StaffLandingPage.js"
import { StaffEditProfile } from "../components/profile/staffProfile/StaffEditProfile.js"
import { UserProfileWithPosts } from "../components/profile/staffProfile/CompleteProfile.js"
import { UserLandingPageGreeting } from "../components/landingPage/UserLandingPage.js"
import { DirectMessagesList } from "../components/directMessages/DirectMessagesList.js"
import { DirectMessageThread } from "../components/directMessages/DirectMessageThread.js"
import { NewDMForm } from "../components/directMessages/NewDirectMessageForm.js"

export const UserViews = ({ token, setToken}) => {
  return <>
    <Routes>
        <Route path="/" element={<UserLandingPageGreeting token={token} setToken={setToken}/>}  />
        
        <Route path="/posts" element={<PostList />}  />
        <Route path="/postform" element={<PostForm token={token}/>}  />
        <Route path="/my-posts/:postId/edit" element={<PostEdit />}  />
        <Route path="/posts/:postId" element={<PostDetails />}  />
        
        <Route path="/commentform/:postId" element={<CommentForm token={token}/>}  />
        <Route path="/comments/:commentId/edit" element={<EditComment />}  />
        
        <Route path="/users/:Id" element={<UserDetail token={token}/>} />

        <Route path="/direct_messages" element={<DirectMessagesList />} />
        <Route path="/direct_messages_thread/:userId" element={<DirectMessageThread />} />
        <Route path="/newDM" element={<NewDMForm />} />
        
        <Route path="/profile" element={<UserProfileWithPosts />} />
        <Route path="/profile/editForm" element={<StaffEditProfile />} />

    </Routes>
  </>
}


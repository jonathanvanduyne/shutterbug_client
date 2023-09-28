import { Route, Routes } from "react-router-dom"
import { PostList } from "../components/posts/PostList"
import { PostDetails } from "../components/posts/PostDetails"
import { UserList } from "../components/users/StaffUsers/UserList"
import { PostForm } from "../components/posts/PostForm"
import { PostEdit } from "../components/posts/PostEdit"
import { UserDetail } from "../components/users/StaffUsers/UserDetail"
import { CommentForm } from "../components/comments/CommentForm"
import { EditComment } from "../components/comments/CommentEdit"
import { StaffLandingPageGreeting } from "../components/landingPage/StaffLandingPage"
import { StaffEditProfile } from "../components/profile/StaffProfile/StaffEditProfile"
import { UserProfileWithPosts } from "../components/profile/StaffProfile/CompleteProfile"
import { FlaggedAndUnapprovedPostList} from "../components/users/StaffUsers/NaughtyPostsMonitor"
import { DirectMessagesList } from "../components/directMessages/DirectMessagesList"
import { DirectMessageThread } from "../components/directMessages/DirectMessageThread"
import { NewDMForm } from "../components/directMessages/NewDirectMessageForm"

export const StaffViews = ({ token, setToken}) => {
  return <>
    <Routes>
        <Route path="/" element={<StaffLandingPageGreeting token={token} setToken={setToken}/>}  />
        
        <Route path="/posts" element={<PostList />}  />
        <Route path="/postform" element={<PostForm token={token}/>}  />
        <Route path="/my-posts/:postId/edit" element={<PostEdit />}  />
        <Route path="/posts/:postId" element={<PostDetails />}  />
        
        <Route path="/commentform/:postId" element={<CommentForm token={token}/>}  />
        <Route path="/comments/:commentId/edit" element={<EditComment />}  />
        
        <Route path="users" element={<UserList />} />
        <Route path="/users/:Id" element={<UserDetail token={token}/>} />
        <Route path="/flaggedPosts" element={<FlaggedAndUnapprovedPostList />} />
        
        <Route path="/direct_messages" element={<DirectMessagesList />} />
        <Route path="/direct_messages_thread/:userId" element={<DirectMessageThread />} />
        <Route path="/newDM" element={<NewDMForm />} />


        <Route path="/profile" element={<UserProfileWithPosts />} />
        <Route path="/profile/editForm" element={<StaffEditProfile />} />

    </Routes>
  </>
}


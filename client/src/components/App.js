import { BrowserRouter, Routes , Route} from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "./Homepage";
import LikedPhotos from "./LikedPhotos";
import SignUp from "./SignUp";
import PostPhoto from "./PostPhoto";
import Posted from "./Posted";
import LogIn from "./LogIn";
import PhotoInformation from "./PhotoInformation";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='liked_photos' element={<LikedPhotos/>}/>
        <Route path='post_photo' element={<PostPhoto/>}/>
        <Route path='sign_up' element={<SignUp/>}/>
        <Route path="log_in" element={<LogIn/>}/>
        <Route path="posted" element={<Posted/>}/>
        <Route path="photo/:photoId" element={<PhotoInformation/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "../screens";

const AuthRouter = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col d-none d-lg-block text-center" style={{ margin: "auto" }}>
            <img src={"https://firebasestorage.googleapis.com/v0/b/f-salon-51786.appspot.com/o/kanban-logo.png?alt=media&token=7649839d-e485-4eb0-aaba-b03b8031aa04"} 
          alt="Logo Kanban"
          style={{
            width: 256,
            objectFit: "cover",
          }} />
            <h1>KANBAN</h1>
          </div>
          <div className="col content-center">
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRouter;

import { Auth } from "../component/Auth"
import {ImageComponent}  from "../component/Image"


export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div>
        <Auth type="signup" />
      </div>
      <div className="hidden lg:flex justify-center items-center">
        <ImageComponent />
      </div>
    </div>
  );
};

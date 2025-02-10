import { Auth } from "../component/Auth"
import {ImageComponent}  from "../component/Image"


export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="w-full">
        <Auth type="signin" />
      </div>
      <div className="hidden lg:block justify-center items-center">
        <ImageComponent />
      </div>
    </div>
  );
};

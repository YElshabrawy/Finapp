import Image from "next/image";
import AuthBtn from "./AuthBtn";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <Image src="/logo.png" alt="Logo" width={60} height={60} />
      <AuthBtn />
    </div>
  );

  // return <div>Navbar</div>;
}

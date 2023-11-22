import Image from "next/image";
import styles from "@/styles/Navbar.module.css";
import Link from 'next/link';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Image alt="logo" src="/next.svg" width={20} height={20} />
      <input />
      <div>
        <Link href={"/"}>Home</Link>
        <Link href={"/categories/list"}>Categories List</Link>
      </div>
    </div>
  );
}

export default Navbar;

import Link from "next/link";
import classes from "./Navbar.module.css";

export default function NavBar() {
  return (
    <nav className={classes.nav}>
      <Link className={classes.link} href="/">
        <p className={classes.logo}>PDF Extraction</p>
      </Link>
    </nav>
  );
}

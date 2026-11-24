import { Link, NavLink } from "react-router-dom";
import { UserSelector } from "../../features/users/UserSelector";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          rastro
        </Link>
        <NavLink to="/" end>
          Anuncios
        </NavLink>
        <NavLink to="/listings/new">Publicar</NavLink>
        <span className={styles.spacer} />
        <div className={styles.user}>
          <UserSelector />
        </div>
      </nav>
    </header>
  );
}

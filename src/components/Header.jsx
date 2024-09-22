import styles from "./Header.module.css";
export default function Header() {
  return (
    <header className={styles.container}>
      <img src="react-logo.png" alt="" />
      <h1>The React Quiz</h1>
    </header>
  );
}

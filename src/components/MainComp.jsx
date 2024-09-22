import styles from "./MainComp.module.css";
import QuestionBox from "./QuestionBox";
export default function MainComp({ children }) {
  return <main className={styles.container}>{children}</main>;
}

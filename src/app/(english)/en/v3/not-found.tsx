import Link from "next/link";
import { Arrow } from "@/english/components/v3/Motion";
import styles from "@/english/components/v3/Experience.module.css";

export default function NotFound() {
  return <div className={`${styles.wrap} ${styles.notFound}`}><span dir="ltr">404</span><h1>{"Page not found"}</h1><Link href={"/en/v3"} className={styles.solidLink}>{"Home "}<Arrow /></Link></div>;
}

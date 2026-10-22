import Link from "next/link";
import { Arrow } from "@/components/v3/Motion";
import styles from "@/components/v3/Experience.module.css";

export default function NotFound() {
  return <div className={`${styles.wrap} ${styles.notFound}`}><span dir="ltr">404</span><h1>الصفحة غير موجودة</h1><Link href="/v3" className={styles.solidLink}>الرئيسية <Arrow /></Link></div>;
}

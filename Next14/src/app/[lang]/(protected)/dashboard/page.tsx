import { getUser } from '@/lib/auth';
import styles from './dashboard.module.css';

export default async function Dashboard() {
  return <main className={styles.main}>Dashboard</main>;
}

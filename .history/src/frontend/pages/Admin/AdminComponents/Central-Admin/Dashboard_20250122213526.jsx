import React from "react"
import { Bell, Search, Moon, Star, Home } from "lucide-react"
import { LineChart } from "./LineChart"
import { TopProducts } from "./TopProducts"
import { NewUsers } from "./NewUsers"
import { TeamActivity } from "./TeamActivity"
import styles from "./Dashboard.module.css"

const salesData = [
  { month: "Jan", marketing: 60, online: 90 },
  { month: "Feb", marketing: 80, online: 120 },
  { month: "Mar", marketing: 65, online: 180 },
  { month: "Apr", marketing: 90, online: 160 },
  { month: "May", marketing: 75, online: 240 },
  { month: "Jun", marketing: 110, online: 220 },
  { month: "Jul", marketing: 95, online: 200 },
  { month: "Aug", marketing: 105, online: 260 },
  { month: "Sep", marketing: 85, online: 230 },
  { month: "Oct", marketing: 100, online: 240 },
  { month: "Nov", marketing: 90, online: 220 },
  { month: "Dec", marketing: 115, online: 250 },
]

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Welcome Alex 👋</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Search size={20} />
            <input type="text" placeholder="Search" />
          </div>
          <Star size={20} />
          <Moon size={20} />
          <Bell size={20} />
          <div className={styles.profile}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-abG0Gn1cIu6YxBeZzd3ksQeB5J8R01.png"
              alt="Profile"
            />
            <span>Admin</span>
          </div>
        </div>
      </header>

      <div className={styles.breadcrumb}>
        <Home size={16} />
        <span>Dashboard</span>
        <span>/</span>
        <span>Default</span>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.chartSection}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>
              <h2>Revenue Growth</h2>
              <div className={styles.legend}>
                <span className={styles.marketingLegend}>Marketing Sale</span>
                <span className={styles.onlineLegend}>Online Sale</span>
              </div>
            </div>
            <select defaultValue="This Year">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <LineChart data={salesData} />
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <h3>TOTAL SALES</h3>
              <h2>$56,265.08</h2>
              <p className={styles.comparison}>
                Compared to <span className={styles.positive}>(+40.15% than)</span> last year
              </p>
            </div>
            <div className={styles.metric}>
              <h3>TOTAL PURCHASE</h3>
              <h2>$42,256.26</h2>
              <p className={styles.comparison}>
                Compared to <span className={styles.negative}>(-20.25% than)</span> last year
              </p>
            </div>
            <div className={styles.metric}>
              <h3>TOTAL RETURNS</h3>
              <h2>$5,215.62</h2>
              <p className={styles.comparison}>
                Compared to <span className={styles.negative}>(-18.15% than)</span> last year
              </p>
            </div>
          </div>
        </div>

        <div className={styles.promotionCard}>
          <div className={styles.promotionContent}>
            <h2>Boost up your sale</h2>
            <p>by upgrading your account you can increase your sale by 30% more.</p>
            <button>Upgrade Now</button>
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <TopProducts />
        <NewUsers />
        <TeamActivity />
      </div>
    </div>
  )
}


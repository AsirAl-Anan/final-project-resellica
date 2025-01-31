import React from "react"
import styles from "./Cards.module.css"

interface Activity {
  user: {
    name: string
    avatar: string
  }
  action: string
  time: string
}

const activities: Activity[] = [
  {
    user: {
      name: "Floyd Miles",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "has moved to the warehouse.",
    time: "5 min ago",
  },
  {
    user: {
      name: "Ralph Edwards",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "has solved Mr.williams project.",
    time: "6 min ago",
  },
  {
    user: {
      name: "Esther Howard",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "has changed his to active, now.",
    time: "10 min ago",
  },
  {
    user: {
      name: "Jacob Jones",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "has make changes in sold it.",
    time: "11 min ago",
  },
  {
    user: {
      name: "Theresa Webb",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "has complete old task and move on.",
    time: "12 min ago",
  },
]

export function TeamActivity() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Team Activity</h2>
        <a href="#" className={styles.viewAll}>
          View All
        </a>
      </div>
      <div className={styles.activityList}>
        {activities.map((activity, index) => (
          <div key={index} className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <img
                src={activity.user.avatar || "/placeholder.svg"}
                alt={activity.user.name}
                className={styles.activityAvatar}
              />
              <div>
                <div className={styles.activityText}>
                  <span className={styles.userName}>{activity.user.name}</span> {activity.action}
                </div>
                <div className={styles.activityTime}>{activity.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


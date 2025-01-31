import React from "react"
import { MoreVertical } from "lucide-react"
import styles from "./Cards.module.css"

interface User {
  name: string
  location: string
  avatar: string
}

const users: User[] = [
  {
    name: "Smith John",
    location: "India",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Robert Fox",
    location: "Afghanistan",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Darlene Robtson",
    location: "Georgia",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Floyd Miles",
    location: "Pakistan",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function NewUsers() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>New User</h2>
        <a href="#" className={styles.viewAll}>
          View All
        </a>
      </div>
      <div className={styles.userList}>
        {users.map((user, index) => (
          <div key={index} className={styles.userItem}>
            <div className={styles.userInfo}>
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className={styles.userAvatar} />
              <div>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userLocation}>{user.location}</div>
              </div>
            </div>
            <button className={styles.moreButton}>
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


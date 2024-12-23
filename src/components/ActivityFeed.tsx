import React, { useState, useEffect } from "react"
import ActivityCard from "./ActivityCard"

interface RoastActivity {
  id: number
  roaster: string
  target: string
  location: string
  timestamp: Date
}

const MOCK_ACTIVITIES: RoastActivity[] = [
  {
    id: 1,
    roaster: "Mike",
    target: "Chris",
    location: "Los Santos",
    timestamp: new Date(),
  },
  {
    id: 2,
    roaster: "Sarah",
    target: "John",
    location: "Vice City",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: 3,
    roaster: "Alex",
    target: "Emma",
    location: "Liberty City",
    timestamp: new Date(Date.now() - 300000),
  },
]

const MOCK_NAMES = {
  roasters: ["Mike", "Sarah", "Alex", "Emma", "Chris"],
  targets: ["John", "Jane", "Bob", "Alice", "Tom"],
  locations: ["Los Santos", "Vice City", "Liberty City"],
}

const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<RoastActivity[]>(MOCK_ACTIVITIES)

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        roaster: getRandomItem(MOCK_NAMES.roasters),
        target: getRandomItem(MOCK_NAMES.targets),
        location: getRandomItem(MOCK_NAMES.locations),
        timestamp: new Date(),
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 4)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          roaster={activity.roaster}
          target={activity.target}
          location={activity.location}
          timestamp={activity.timestamp}
        />
      ))}
    </div>
  )
}

export default ActivityFeed

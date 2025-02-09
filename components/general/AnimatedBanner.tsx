import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedBanner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const calculateRotation = (x: number, y: number) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const rotateX = (y - centerY) / 50
    const rotateY = (centerX - x) / 50
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  return (
    <div className="w-full h-64 md:h-96 relative overflow-hidden rounded-xl bg-gray-900 perspective-1000">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-hustlr-green/30 via-purple-500/20 to-blue-600/30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          duration: 10,
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: calculateRotation(mousePosition.x, mousePosition.y),
        }}
        transition={{ type: "spring", stiffness: 75, damping: 15 }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute w-32 h-32 bg-hustlr-green/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 8,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -70, 0],
              y: [0, 40, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-36 h-36 bg-blue-600/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.4, 1],
              x: [0, 60, 0],
              y: [0, -50, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 9,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-center px-4 mb-4"
        >
          Revolutionize Your Career
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-center px-4"
        >
          AI-Powered Job Matching • Global Opportunities • Professional Growth
        </motion.div>
      </div>
    </div>
  )
}



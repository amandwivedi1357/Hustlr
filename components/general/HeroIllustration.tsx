import { motion } from "framer-motion"

const HeroIllustration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full h-64 md:h-96 relative overflow-hidden rounded-xl bg-gradient-to-br from-hustlr-green/20 to-gray-900"
    >
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "linear",
        }}
        className="absolute w-20 h-20 bg-hustlr-green opacity-10 rounded-full blur-xl top-1/4 left-1/4"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 18,
          ease: "linear",
        }}
        className="absolute w-16 h-16 bg-hustlr-green opacity-20 rounded-full blur-xl top-1/2 right-1/3"
      />
      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 15,
          ease: "linear",
        }}
        className="absolute w-24 h-24 bg-hustlr-green opacity-10 rounded-full blur-xl bottom-1/4 right-1/4"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-4xl md:text-6xl font-bold text-white text-center"
        >
          Hustle Your Way
          <br />
          to Success
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HeroIllustration


import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function Reveal({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

import { create } from 'zustand'
import gsap from 'gsap'

export const useTimelinesStore = create(() => ({
  state: {
    timelines: {
      low: gsap.timeline({defaults: {duration: 0.7, stagger: .15}}),
      lowLoop: gsap.timeline({defaults: {duration: 0.2, stagger: .15}, paused: true}),
      top: gsap.timeline({defaults: {duration: 0.7, stagger: .15}, paused: true}),
      ctaPulse: gsap.timeline({defaults: {duration: 0.2}, paused: true}),
    }
  }
}))
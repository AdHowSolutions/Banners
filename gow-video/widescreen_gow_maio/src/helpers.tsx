import gsap from 'gsap'

export function collapseBanner() {
  gsap.to('#adh-t, #adh-v-container', {duration: .7, y: 600, ease: 'power3.out'})
  gsap.to('#adh-overlay', {opacity: 0, pointerEvents: 'none'})
  gsap.to('#adh-collapse-btn', {opacity: 0})
}
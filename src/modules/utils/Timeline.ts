import type {Euler, Vector3, Vector4} from 'three'

import {EASE, type EasingFunctionNames} from './easing'

type dataType = Euler[] | Vector3[] | unknown[] | Vector4[] | any

interface TimelineOptions {
  easing?: EasingFunctionNames
  delay?: number
  onUpdate?: () => void
  onComplete?: () => void
}
// interface AnimationProperties {
//   y?: number
//   x?: number
//   z?: number
//   value?: number
//   anim_rotating?: number
//   radian?: number,
//   target?: number,
//   onComplete?: () => void
//   easing?: EasingFunctionNames
//   onUpdate?: () => void
// }
interface arrangedValues {
  key: string
  start: number[] | unknown[]
  current: unknown[]
  end: number[] | unknown[]
}

interface Animation {
  datas: dataType
  duration: number
  easing: EasingFunctionNames
  onComplete?: () => void
  onUpdate?: () => void
  values: arrangedValues[]
  delay: number
  properties: any
  isStarted: boolean
  isLast?: boolean
  isFinished?: boolean
}

export default class Timeline {
  easing: EasingFunctionNames
  options: TimelineOptions
  onUpdate: () => void
  onComplete: () => void
  delay: number
  isFinished: boolean
  lastIndex: number
  isWindowFocus: boolean
  animations: Animation[]
  startTime?: Date
  oldTime?: Date
  time: number

  constructor(options: TimelineOptions = {}) {
    this.easing = options.easing || 'linear'
    this.options = options
    this.onUpdate = options.onUpdate || function () {}
    this.onComplete = options.onComplete || function () {}

    this.delay = options.delay || 0

    this.isFinished = false

    this.lastIndex = -1

    this.isWindowFocus = true

    this.animations = []
    this.time = 0
  }

  to(_datas: dataType, duration: number, properties: any, _delay: number): this {
    this._to(_datas, duration, properties, _delay)
    return this
  }

  private _to(_datas: dataType, duration: number, properties: any, _delay: number): Animation {
    let delay = 0
    if (!isNaN(_delay)) {
      delay = _delay
    } else {
      if (this.animations.length > 0) {
        const prevAnim = this.animations[this.animations.length - 1]
        if (prevAnim) {
          delay = prevAnim.duration + prevAnim.delay
        }
      }
    }

    delay += this.delay
    const datas = Array.isArray(_datas) ? _datas : [_datas]

    const animation: Animation = {
      datas,
      duration,
      easing: properties.easing || this.easing,
      onComplete: properties.onComplete,
      onUpdate: properties.onUpdate,
      values: [],
      delay,
      properties,
      isStarted: false,
    }

    this.animations.push(animation)

    let longestTime = 0

    for (let index = 0; index < this.animations.length; index++) {
      const item = this.animations[index]
      if (!item) continue
      const t = item.duration + item.delay
      if (longestTime < t) {
        longestTime = t
        this.lastIndex = index
      }

      item.isLast = false
    }

    return animation
  }

  start() {
    if (this.lastIndex === -1) return
    this.startTime = new Date()
    this.oldTime = new Date()
    const lastAnimation = this.animations[this.lastIndex]
    if (lastAnimation) lastAnimation.isLast = true
    window.addEventListener('visibilitychange', this.onVisiblitychange)

    this.animate()
  }

  animate = () => {
    const currentTime = new Date()

    if (!this.isWindowFocus) {
      this.oldTime = currentTime
    }

    if (this.oldTime) {
      const delta = currentTime.getTime() - this.oldTime.getTime()
      this.time += delta
    }

    this.oldTime = currentTime

    for (const item of this.animations) {
      const {datas, duration, easing, values, delay} = item

      if (this.time > delay && !item.isFinished) {
        if (!item.isStarted) {
          item.isStarted = true
          this.arrangeDatas(item)
        }
        const startTime = 0
        const endTime = duration

        let progress = this.calcProgress(startTime, endTime, this.time - delay)
        progress = EASE[easing](progress)

        for (let i = 0; i < values.length; i++) {
          const v = values[i]
          if (!v) continue
          for (let j = 0; j < datas.length; j++) {
            const d = datas[j]
            v.current[j] = this.calcLerp(v.start[j]! as number, v.end[j]! as number, progress)

            if (typeof d === 'object' && d !== null) {
              d[v.key as keyof typeof d] = v.current[j] as never
            }
          }
        }

        if (item.onUpdate) {
          item.onUpdate()
        }

        if (progress === 1) {
          item.isFinished = true
          if (item.onComplete) item.onComplete()
          if (item.isLast) {
            this.isFinished = true
            return
          }
        }
      }
    }

    if (!this.isFinished) {
      this.onUpdate()
      requestAnimationFrame(this.animate)
    } else {
      window.removeEventListener('visibilitychange', this.onVisiblitychange)
      this.onComplete()
    }
  }

  arrangeDatas(animation: Animation) {
    const {properties, datas, values} = animation
    for (const key in properties) {
      let index = 0
      const start: unknown[] = []
      const current: unknown[] = []
      const end = []
      switch (key) {
        case 'easing':
        case 'onComplete':
        case 'onUpdate':
          break
        default:
          for (const item of datas) {
            if (item !== null && typeof item === 'object') {
              start[index] = item[key as keyof typeof item]
              current[index] = item[key as keyof typeof item]
              end[index] = properties[key as keyof typeof properties]
              index++
            }
          }

          values.push({
            key,
            start,
            current,
            end,
          })
          break
      }
    }
  }

  calcProgress(start: number, end: number, currentTime: number) {
    const p = (currentTime - start) / (end - start)
    return Math.max(0, Math.min(1, p))
  }

  calcLerp(start: number, end: number, progress: number) {
    return start + (end - start) * progress
  }

  onVisiblitychange = () => {
    if (document.visibilityState === 'visible') {
      this.isWindowFocus = true
    } else {
      this.isWindowFocus = false
    }
  }
}
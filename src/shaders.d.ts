/// <reference types="vite/client" />

declare module '*.scss'

declare module '*.glsl' {
  const shader: string
  export default shader
}

declare module '*.vert' {
  const shader: string
  export default shader
}

declare module '*.frag' {
  const shader: string
  export default shader
}
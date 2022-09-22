declare module "*.module.css" {
  const styles: { [className: string]: string, imageEffects: string }
  export * from styles
  export { imageEffects } from styles
}
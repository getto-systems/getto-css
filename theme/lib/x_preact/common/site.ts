export type SiteInfo = Readonly<{
    brand: string
    title: string
    subTitle: string
}>

export function siteInfo(): SiteInfo {
    return {
        brand: "GETTO",
        title: "CSS",
        subTitle: "simple admin theme",
    }
}

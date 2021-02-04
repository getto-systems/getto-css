import { SiteInfo } from "../../z_vendor/getto-css/site";

export function siteInfo(): SiteInfo {
    return {
        brand: "GETTO",
        title: "CSS",
        subTitle: "simple admin theme",
    }
}

export function poweredBy(): string[] {
    return ["LineIcons", "みんなの文字"]
}

export function copyright(): string {
    return "GETTO.systems"
}

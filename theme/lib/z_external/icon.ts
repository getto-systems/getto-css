export type Icon = Readonly<{ type: "LineIcons"; name: string }>

export function lnir(name: string): Icon {
    return { type: "LineIcons", name }
}

export function iconClass(icon: Icon): string {
    switch (icon.type) {
        case "LineIcons":
            return `lnir lnir-${icon.name}`
    }
}

import { TableDataStyleMutable, TableDataMutable_group, TableDataViewMutable } from "../mutable"
import { decorateStyle, TableDataGroupDecorator, TableDataViewDecorator } from "../decorator"
import { inheritStyle } from "../style"

export function tableDataMutable_group(): TableDataMutable_group {
    return new Mutable()
}
class Mutable implements TableDataMutable_group {
    view: TableDataViewMutable
    groupStyle: TableDataStyleMutable

    constructor() {
        this.view = {
            decorator: { type: "none" },
        }
        this.groupStyle = {
            style: inheritStyle(),
        }
    }

    viewMutable(): TableDataViewMutable {
        return this.view
    }
    groupStyleMutable(): TableDataStyleMutable {
        return this.groupStyle
    }

    decorateView(decorator: TableDataViewDecorator): void {
        this.view = { ...this.view, decorator }
    }
    decorateGroup(decorator: TableDataGroupDecorator): void {
        this.groupStyle = {
            ...this.groupStyle,
            style: decorateStyle(this.groupStyle.style, decorator),
        }
    }
}

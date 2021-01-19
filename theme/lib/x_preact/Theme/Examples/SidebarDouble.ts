import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { useTerminate } from "../../common/hooks"
import { mainFooter, menuHeader, menuFooter } from "../../common/layout"
import { form, simpleBox_fill } from "./box"

import { ApplicationError } from "../../common/System/ApplicationError"
import { MenuList } from "../../Outline/MenuList"
import { BreadcrumbList } from "../../Outline/BreadcrumbList"
import { Container } from "./SidebarDouble/Container"

import { ExampleEntryPoint } from "../../../theme/Example/view"

type Props = Readonly<{
    example: ExampleEntryPoint
}>
export function Form({ example: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `Sidebar (double size) | ${document.title}`
    }, [])

    const title = html`Sidebar <small><span class="noWrap">(double size)</span></small>`

    return html`<main class="layout__app layout__app__sidebar_double">
        <section class="layout__app__container">
            <article class="layout__app__main">
                <header class="main__header">
                    <h1 class="main__title">${title}</h1>
                    ${h(BreadcrumbList, resource)}
                </header>
                <section class="main__body">${h(Container, NO_PROPS)}</section>
                ${mainFooter()}
            </article>
            <aside class="layout__app__sidebar">
                <section class="sidebar">
                    <header class="main__header">
                        <h1 class="main__title">List</h1>
                    </header>
                    <section class="main__body">${h(Pager, NO_PROPS)}</section>
                    <section class="main__body sidebar__main">${h(Table, NO_PROPS)}</section>
                    ${mainFooter()}
                </section>
            </aside>
        </section>
        <aside class="layout__app__menu">
            <section class="menu">${menuHeader()} ${h(MenuList, resource)} ${menuFooter()}</section>
        </aside>
    </main>`
}

type TableProps = {
    // no props
}
function Table(_: TableProps): VNode {
    return simpleBox_fill(html`<table class="table table_sticky table_fill">
        <thead class="table__header">
            <tr>
                <th class="cell_sticky cell_sticky_top cell_border_bb cell_border_rr">
                    <a href="#">ID <i class="lnir lnir-chevron-down"></i></a>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_bb">
                    <a href="#">名前</a>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_bb">
                    <a href="#">状態</a>
                </th>
            </tr>
        </thead>
        <tbody>
            ${repeatedRows()}
        </tbody>
    </table>`)

    function repeatedRows() {
        const result = []
        for (let i = 0; i < 100; i++) {
            result.push(rows())
        }
        return result
    }

    function rows() {
        return html`
            <tr class="row row_hover">
                <td class="cell_border_b cell_border_rr">1234</td>
                <td class="cell_border_b">GETTO CSS</td>
                <td class="cell_border_b cell_center"><span class="label label_gray">仮</span></td>
            </tr>
            <tr class="row row_hover">
                <td class="cell_border_b cell_border_rr">123</td>
                <td class="cell_border_b">GETTO</td>
                <td class="cell_border_b cell_center">
                    <span class="label label_warning">作業中</span>
                </td>
            </tr>
        `
    }
}

type PagerProps = {
    // no props
}
function Pager(_: PagerProps): VNode {
    return simpleBox_fill([form("全 5532 件中", [select(), button()])])

    function select() {
        return html`<select class="pager__select">
            <option>1 ～ 1000 件</option>
            <option>1001 ～ 2000 件</option>
            <option>2001 ～ 3000 件</option>
            <option>3001 ～ 4000 件</option>
            <option>4001 ～ 5000 件</option>
            <option>5001 ～ 5532 件</option>
        </select>`
    }
    function button() {
        return html`<button class="button button_search">移動</button>`
    }
}

const NO_PROPS = {}

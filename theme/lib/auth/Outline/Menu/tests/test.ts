import { initMenuExpandTestStorage, MenuRepository, MenuSimulator, newMenuResource } from "./core"

import { initMenuExpandRepository } from "../../../permission/menu/impl/repository/menuExpand"

import { MenuBadge, MenuTree } from "../../../permission/menu/infra"

import { BreadcrumbListState } from "../../breadcrumbList/component"
import { MenuListState } from "../../menuList/component"

import { markMenuCategoryLabel, Menu } from "../../../permission/menu/data"

describe("BreadcrumbList", () => {
    test("load breadcrumb", (done) => {
        const { resource } = standardMenuResource()

        resource.breadcrumbList.addStateHandler(stateHandler())

        resource.breadcrumbList.load()

        function stateHandler(): Listener<BreadcrumbListState> {
            const stack: BreadcrumbListState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-breadcrumb-list":
                        // work in progress...
                        break

                    case "succeed-to-load":
                        expect(stack).toEqual([
                            {
                                type: "succeed-to-load",
                                breadcrumb: [
                                    {
                                        type: "category",
                                        category: { label: "MAIN" },
                                    },
                                    {
                                        type: "item",
                                        item: {
                                            label: "ホーム",
                                            icon: "home",
                                            href: "/1.0.0/index.html",
                                        },
                                    },
                                ],
                            },
                        ])
                        done()
                        break

                    default:
                        assertNever(state)
                }
            }
        }
    })

    test("load empty breadcrumb; unknown menu target", (done) => {
        const { resource } = unknownMenuResource()

        resource.breadcrumbList.addStateHandler(stateHandler())

        resource.breadcrumbList.load()

        function stateHandler(): Listener<BreadcrumbListState> {
            const stack: BreadcrumbListState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-breadcrumb-list":
                        // work in progress...
                        break

                    case "succeed-to-load":
                        expect(stack).toEqual([
                            {
                                type: "succeed-to-load",
                                breadcrumb: [],
                            },
                        ])
                        done()
                        break

                    default:
                        assertNever(state)
                }
            }
        }
    })
})

describe("MenuList", () => {
    test("load menu", (done) => {
        const { resource } = standardMenuResource()

        resource.menuList.addStateHandler(stateHandler())

        resource.menuList.load()

        function stateHandler(): Listener<MenuListState> {
            const stack: MenuListState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-menu-list":
                    case "succeed-to-instant-load":
                        // work in progress...
                        break

                    case "succeed-to-load":
                        expect(stack).toEqual([
                            {
                                type: "succeed-to-instant-load",
                                menu: [
                                    {
                                        type: "category",
                                        category: { label: "MAIN" },
                                        path: ["MAIN"],
                                        children: [
                                            {
                                                type: "item",
                                                item: {
                                                    label: "ホーム",
                                                    icon: "home",
                                                    href: "/1.0.0/index.html",
                                                },
                                                isActive: true,
                                                badgeCount: 0,
                                            },
                                            {
                                                type: "item",
                                                item: {
                                                    label: "ドキュメント",
                                                    icon: "docs",
                                                    href: "/1.0.0/docs/index.html",
                                                },
                                                isActive: false,
                                                badgeCount: 0,
                                            },
                                        ],
                                        isExpand: true,
                                        badgeCount: 0,
                                    },
                                    {
                                        type: "category",
                                        category: { label: "DOCUMENT" },
                                        path: ["DOCUMENT"],
                                        children: [
                                            {
                                                type: "item",
                                                item: {
                                                    label: "認証・認可",
                                                    icon: "auth",
                                                    href: "/1.0.0/docs/auth.html",
                                                },
                                                isActive: false,
                                                badgeCount: 0,
                                            },
                                            {
                                                type: "category",
                                                category: { label: "DETAIL" },
                                                path: ["DOCUMENT", "DETAIL"],
                                                children: [
                                                    {
                                                        type: "item",
                                                        item: {
                                                            label: "詳細",
                                                            icon: "detail",
                                                            href: "/1.0.0/docs/auth.html",
                                                        },
                                                        isActive: false,
                                                        badgeCount: 0,
                                                    },
                                                ],
                                                isExpand: false,
                                                badgeCount: 0,
                                            },
                                        ],
                                        isExpand: false,
                                        badgeCount: 0,
                                    },
                                ],
                            },
                            {
                                type: "succeed-to-load",
                                menu: [
                                    {
                                        type: "category",
                                        category: { label: "MAIN" },
                                        path: ["MAIN"],
                                        children: [
                                            {
                                                type: "item",
                                                item: {
                                                    label: "ホーム",
                                                    icon: "home",
                                                    href: "/1.0.0/index.html",
                                                },
                                                isActive: true,
                                                badgeCount: 10,
                                            },
                                            {
                                                type: "item",
                                                item: {
                                                    label: "ドキュメント",
                                                    icon: "docs",
                                                    href: "/1.0.0/docs/index.html",
                                                },
                                                isActive: false,
                                                badgeCount: 20,
                                            },
                                        ],
                                        isExpand: true,
                                        badgeCount: 30,
                                    },
                                    {
                                        type: "category",
                                        category: { label: "DOCUMENT" },
                                        path: ["DOCUMENT"],
                                        children: [
                                            {
                                                type: "item",
                                                item: {
                                                    label: "認証・認可",
                                                    icon: "auth",
                                                    href: "/1.0.0/docs/auth.html",
                                                },
                                                isActive: false,
                                                badgeCount: 0,
                                            },
                                            {
                                                type: "category",
                                                category: { label: "DETAIL" },
                                                path: ["DOCUMENT", "DETAIL"],
                                                children: [
                                                    {
                                                        type: "item",
                                                        item: {
                                                            label: "詳細",
                                                            icon: "detail",
                                                            href: "/1.0.0/docs/auth.html",
                                                        },
                                                        isActive: false,
                                                        badgeCount: 0,
                                                    },
                                                ],
                                                isExpand: false,
                                                badgeCount: 0,
                                            },
                                        ],
                                        isExpand: false,
                                        badgeCount: 0,
                                    },
                                ],
                            },
                        ])
                        done()
                        break

                    case "failed-to-load":
                    case "succeed-to-toggle":
                    case "failed-to-toggle":
                        done(new Error(`${state.type}`))
                        break

                    default:
                        assertNever(state)
                }
            }
        }
    })

    test("load menu; saved expands", (done) => {
        const { resource } = expandMenuResource()

        resource.menuList.addStateHandler(stateHandler())

        resource.menuList.load()

        function stateHandler(): Listener<MenuListState> {
            const stack: MenuListState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-menu-list":
                    case "succeed-to-instant-load":
                        // work in progress...
                        break

                    case "succeed-to-load":
                        expect(stack).toEqual([
                            {
                                type: "succeed-to-instant-load",
                                menu: [
                                    {
                                        type: "category",
                                        category: { label: "MAIN" },
                                        path: ["MAIN"],
                                        children: [
                                            {
                                                type: "item",
                                                item: {
                                                    label: "ホーム",
                                                    icon: "home",
                                                    href: "/1.0.0/index.html",
                                                },
                                                isActive: true,
                                                badgeCount: 0,
                                            },
                                            {
                                                type: "item",
                                                item: {
                                                    label: "ドキュメント",
                                                    icon: "docs",
                                                    href: "/1.0.0/docs/index.html",
                                                },
                                                isActive: false,
                                                badgeCount: 0,
                                            },
                                        ],
                                        isExpand: true,
                                        badgeCount: 0,
                                    },
                                    {
                                        type: "category",
                                        category: { label: "DOCUMENT" },
                                        path: ["DOCUMENT"],
                                        children: [
                                            {
                                                type: "item",
                                                item: {
                                                    label: "認証・認可",
                                                    icon: "auth",
                                                    href: "/1.0.0/docs/auth.html",
                                                },
                                                isActive: false,
                                                badgeCount: 0,
                                            },
                                            {
                                                type: "category",
                                                category: { label: "DETAIL" },
                                                path: ["DOCUMENT", "DETAIL"],
                                                children: [
                                                    {
                                                        type: "item",
                                                        item: {
                                                            label: "詳細",
                                                            icon: "detail",
                                                            href: "/1.0.0/docs/auth.html",
                                                        },
                                                        isActive: false,
                                                        badgeCount: 0,
                                                    },
                                                ],
                                                isExpand: false,
                                                badgeCount: 0,
                                            },
                                        ],
                                        isExpand: true,
                                        badgeCount: 0,
                                    },
                                ],
                            },
                            {
                                type: "succeed-to-load",
                                menu: [
                                    {
                                        type: "category",
                                        category: { label: "MAIN" },
                                        path: ["MAIN"],
                                        children: [
                                            {
                                                type: "item",
                                                item: {
                                                    label: "ホーム",
                                                    icon: "home",
                                                    href: "/1.0.0/index.html",
                                                },
                                                isActive: true,
                                                badgeCount: 10,
                                            },
                                            {
                                                type: "item",
                                                item: {
                                                    label: "ドキュメント",
                                                    icon: "docs",
                                                    href: "/1.0.0/docs/index.html",
                                                },
                                                isActive: false,
                                                badgeCount: 20,
                                            },
                                        ],
                                        isExpand: true,
                                        badgeCount: 30,
                                    },
                                    {
                                        type: "category",
                                        category: { label: "DOCUMENT" },
                                        path: ["DOCUMENT"],
                                        children: [
                                            {
                                                type: "item",
                                                item: {
                                                    label: "認証・認可",
                                                    icon: "auth",
                                                    href: "/1.0.0/docs/auth.html",
                                                },
                                                isActive: false,
                                                badgeCount: 0,
                                            },
                                            {
                                                type: "category",
                                                category: { label: "DETAIL" },
                                                path: ["DOCUMENT", "DETAIL"],
                                                children: [
                                                    {
                                                        type: "item",
                                                        item: {
                                                            label: "詳細",
                                                            icon: "detail",
                                                            href: "/1.0.0/docs/auth.html",
                                                        },
                                                        isActive: false,
                                                        badgeCount: 0,
                                                    },
                                                ],
                                                isExpand: false,
                                                badgeCount: 0,
                                            },
                                        ],
                                        isExpand: true,
                                        badgeCount: 0,
                                    },
                                ],
                            },
                        ])
                        done()
                        break

                    case "failed-to-load":
                    case "succeed-to-toggle":
                    case "failed-to-toggle":
                        done(new Error(`${state.type}`))
                        break

                    default:
                        assertNever(state)
                }
            }
        }
    })

    test("load menu; toggle expands", (done) => {
        const { repository, resource } = standardMenuResource()

        resource.menuList.addStateHandler(stateHandler())

        resource.menuList.load()

        const toggles = [
            [markMenuCategoryLabel("DOCUMENT")],
            [markMenuCategoryLabel("DOCUMENT"), markMenuCategoryLabel("DETAIL")],
        ]

        function stateHandler(): Listener<MenuListState> {
            const stack: MenuListState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-menu-list":
                    case "succeed-to-instant-load":
                        // work in progress...
                        break

                    case "succeed-to-load":
                    case "succeed-to-toggle":
                        toggleOrCheckExpects(state.menu)
                        break

                    case "failed-to-load":
                    case "failed-to-toggle":
                        done(new Error(`${state.type}`))
                        break

                    default:
                        assertNever(state)
                }

                function toggleOrCheckExpects(menu: Menu) {
                    const path = toggles.shift()
                    if (path) {
                        resource.menuList.toggle(menu, path)
                    } else {
                        checkExpects()
                    }
                }
                function checkExpects() {
                    expect(stack).toEqual([
                        {
                            type: "succeed-to-instant-load",
                            menu: [
                                {
                                    type: "category",
                                    category: { label: "MAIN" },
                                    path: ["MAIN"],
                                    children: [
                                        {
                                            type: "item",
                                            item: {
                                                label: "ホーム",
                                                icon: "home",
                                                href: "/1.0.0/index.html",
                                            },
                                            isActive: true,
                                            badgeCount: 0,
                                        },
                                        {
                                            type: "item",
                                            item: {
                                                label: "ドキュメント",
                                                icon: "docs",
                                                href: "/1.0.0/docs/index.html",
                                            },
                                            isActive: false,
                                            badgeCount: 0,
                                        },
                                    ],
                                    isExpand: true,
                                    badgeCount: 0,
                                },
                                {
                                    type: "category",
                                    category: { label: "DOCUMENT" },
                                    path: ["DOCUMENT"],
                                    children: [
                                        {
                                            type: "item",
                                            item: {
                                                label: "認証・認可",
                                                icon: "auth",
                                                href: "/1.0.0/docs/auth.html",
                                            },
                                            isActive: false,
                                            badgeCount: 0,
                                        },
                                        {
                                            type: "category",
                                            category: { label: "DETAIL" },
                                            path: ["DOCUMENT", "DETAIL"],
                                            children: [
                                                {
                                                    type: "item",
                                                    item: {
                                                        label: "詳細",
                                                        icon: "detail",
                                                        href: "/1.0.0/docs/auth.html",
                                                    },
                                                    isActive: false,
                                                    badgeCount: 0,
                                                },
                                            ],
                                            isExpand: false,
                                            badgeCount: 0,
                                        },
                                    ],
                                    isExpand: false,
                                    badgeCount: 0,
                                },
                            ],
                        },
                        {
                            type: "succeed-to-load",
                            menu: [
                                {
                                    type: "category",
                                    category: { label: "MAIN" },
                                    path: ["MAIN"],
                                    children: [
                                        {
                                            type: "item",
                                            item: {
                                                label: "ホーム",
                                                icon: "home",
                                                href: "/1.0.0/index.html",
                                            },
                                            isActive: true,
                                            badgeCount: 10,
                                        },
                                        {
                                            type: "item",
                                            item: {
                                                label: "ドキュメント",
                                                icon: "docs",
                                                href: "/1.0.0/docs/index.html",
                                            },
                                            isActive: false,
                                            badgeCount: 20,
                                        },
                                    ],
                                    isExpand: true,
                                    badgeCount: 30,
                                },
                                {
                                    type: "category",
                                    category: { label: "DOCUMENT" },
                                    path: ["DOCUMENT"],
                                    children: [
                                        {
                                            type: "item",
                                            item: {
                                                label: "認証・認可",
                                                icon: "auth",
                                                href: "/1.0.0/docs/auth.html",
                                            },
                                            isActive: false,
                                            badgeCount: 0,
                                        },
                                        {
                                            type: "category",
                                            category: { label: "DETAIL" },
                                            path: ["DOCUMENT", "DETAIL"],
                                            children: [
                                                {
                                                    type: "item",
                                                    item: {
                                                        label: "詳細",
                                                        icon: "detail",
                                                        href: "/1.0.0/docs/auth.html",
                                                    },
                                                    isActive: false,
                                                    badgeCount: 0,
                                                },
                                            ],
                                            isExpand: false,
                                            badgeCount: 0,
                                        },
                                    ],
                                    isExpand: false,
                                    badgeCount: 0,
                                },
                            ],
                        },
                        {
                            type: "succeed-to-toggle",
                            menu: [
                                {
                                    type: "category",
                                    category: { label: "MAIN" },
                                    path: ["MAIN"],
                                    children: [
                                        {
                                            type: "item",
                                            item: {
                                                label: "ホーム",
                                                icon: "home",
                                                href: "/1.0.0/index.html",
                                            },
                                            isActive: true,
                                            badgeCount: 10,
                                        },
                                        {
                                            type: "item",
                                            item: {
                                                label: "ドキュメント",
                                                icon: "docs",
                                                href: "/1.0.0/docs/index.html",
                                            },
                                            isActive: false,
                                            badgeCount: 20,
                                        },
                                    ],
                                    isExpand: true,
                                    badgeCount: 30,
                                },
                                {
                                    type: "category",
                                    category: { label: "DOCUMENT" },
                                    path: ["DOCUMENT"],
                                    children: [
                                        {
                                            type: "item",
                                            item: {
                                                label: "認証・認可",
                                                icon: "auth",
                                                href: "/1.0.0/docs/auth.html",
                                            },
                                            isActive: false,
                                            badgeCount: 0,
                                        },
                                        {
                                            type: "category",
                                            category: { label: "DETAIL" },
                                            path: ["DOCUMENT", "DETAIL"],
                                            children: [
                                                {
                                                    type: "item",
                                                    item: {
                                                        label: "詳細",
                                                        icon: "detail",
                                                        href: "/1.0.0/docs/auth.html",
                                                    },
                                                    isActive: false,
                                                    badgeCount: 0,
                                                },
                                            ],
                                            isExpand: false,
                                            badgeCount: 0,
                                        },
                                    ],
                                    isExpand: true,
                                    badgeCount: 0,
                                },
                            ],
                        },
                        {
                            type: "succeed-to-toggle",
                            menu: [
                                {
                                    type: "category",
                                    category: { label: "MAIN" },
                                    path: ["MAIN"],
                                    children: [
                                        {
                                            type: "item",
                                            item: {
                                                label: "ホーム",
                                                icon: "home",
                                                href: "/1.0.0/index.html",
                                            },
                                            isActive: true,
                                            badgeCount: 10,
                                        },
                                        {
                                            type: "item",
                                            item: {
                                                label: "ドキュメント",
                                                icon: "docs",
                                                href: "/1.0.0/docs/index.html",
                                            },
                                            isActive: false,
                                            badgeCount: 20,
                                        },
                                    ],
                                    isExpand: true,
                                    badgeCount: 30,
                                },
                                {
                                    type: "category",
                                    category: { label: "DOCUMENT" },
                                    path: ["DOCUMENT"],
                                    children: [
                                        {
                                            type: "item",
                                            item: {
                                                label: "認証・認可",
                                                icon: "auth",
                                                href: "/1.0.0/docs/auth.html",
                                            },
                                            isActive: false,
                                            badgeCount: 0,
                                        },
                                        {
                                            type: "category",
                                            category: { label: "DETAIL" },
                                            path: ["DOCUMENT", "DETAIL"],
                                            children: [
                                                {
                                                    type: "item",
                                                    item: {
                                                        label: "詳細",
                                                        icon: "detail",
                                                        href: "/1.0.0/docs/auth.html",
                                                    },
                                                    isActive: false,
                                                    badgeCount: 0,
                                                },
                                            ],
                                            isExpand: true,
                                            badgeCount: 0,
                                        },
                                    ],
                                    isExpand: true,
                                    badgeCount: 0,
                                },
                            ],
                        },
                    ])
                    expectToSaveExpand(repository, [["MAIN"], ["DOCUMENT"], ["DOCUMENT", "DETAIL"]])
                    done()
                }
            }
        }
    })
})

function standardMenuResource() {
    const version = standardVersion()
    const url = standardURL()
    const menuTree = standardMenuTree()
    const repository = standardRepository()
    const simulator = standardSimulator()
    const resource = newMenuResource(version, url, menuTree, repository, simulator)

    return { repository, resource }
}
function unknownMenuResource() {
    const version = standardVersion()
    const url = unknownURL()
    const menuTree = standardMenuTree()
    const repository = standardRepository()
    const simulator = standardSimulator()
    const resource = newMenuResource(version, url, menuTree, repository, simulator)

    return { resource }
}
function expandMenuResource() {
    const version = standardVersion()
    const url = standardURL()
    const menuTree = standardMenuTree()
    const repository = expandRepository()
    const simulator = standardSimulator()
    const resource = newMenuResource(version, url, menuTree, repository, simulator)

    return { resource }
}

function standardVersion(): string {
    return "1.0.0"
}

function standardURL(): URL {
    return new URL("https://example.com/1.0.0/index.html")
}
function unknownURL(): URL {
    return new URL("https://example.com/1.0.0/unknown.html")
}

function standardMenuTree(): MenuTree {
    return [
        {
            type: "category",
            category: { label: "MAIN", permission: { type: "any" } },
            children: [
                { type: "item", item: { label: "ホーム", icon: "home", path: "/index.html" } },
                {
                    type: "item",
                    item: { label: "ドキュメント", icon: "docs", path: "/docs/index.html" },
                },
            ],
        },
        {
            type: "category",
            category: { label: "DOCUMENT", permission: { type: "any" } },
            children: [
                { type: "item", item: { label: "認証・認可", icon: "auth", path: "/docs/auth.html" } },
                {
                    type: "category",
                    category: { label: "DETAIL", permission: { type: "any" } },
                    children: [
                        {
                            type: "item",
                            item: { label: "詳細", icon: "detail", path: "/docs/auth.html" },
                        },
                    ],
                },
            ],
        },
    ]
}

function standardRepository(): MenuRepository {
    return {
        menuExpands: initMenuExpandRepository(
            initMenuExpandTestStorage({
                menuExpand: { set: false },
            })
        ),
    }
}
function expandRepository(): MenuRepository {
    return {
        menuExpands: initMenuExpandRepository(
            initMenuExpandTestStorage({
                menuExpand: { set: true, value: [[markMenuCategoryLabel("DOCUMENT")]] },
            })
        ),
    }
}

function standardSimulator(): MenuSimulator {
    return {
        menuBadge: {
            getMenuBadge: async (): Promise<MenuBadge> => {
                return {
                    "/index.html": 10,
                    "/docs/index.html": 20,
                }
            },
        },
    }
}

function expectToSaveExpand(repository: MenuRepository, menuExpand: string[][]) {
    expect(repository.menuExpands.findMenuExpand()).toEqual({ success: true, menuExpand })
}

interface Listener<T> {
    (state: T): void
}

function assertNever(_: never): never {
    throw new Error("NEVER")
}

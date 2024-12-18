"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MultipleAccordion } from "@/components/shadcn_components/multiple_accordion";
import {
    makePath,
    PATH_DASHBOARD,
    PATH_SEGMENT,
    PATH_SEGMENT_LOAD,
    PATH_SEGMENT_NOTFOUND,
    PATH_SEGMENT_ROUTE,
    PATH_CRUD,
    PATH_CRUD_FETCH,
    PATH_CRUD_SSR,
    PATH_CRUD_SSG,
    PATH_CRUD_ISR,
    PATH_SHADCN,
    PATH_SHADCN_ACCORDION,
    PATH_SHADCN_TOGGLE,
    PATH_SHADCN_TOOTLIP,
    PATH_SHADCN_TABLE,
    PATH_SHADCN_SWITCH,
    PATH_SHADCN_SHEET,
    PATH_SHADCN_TOAST,
    PATH_SHADCN_SLIDER,
    PATH_SHADCN_SCROLL,
    PATH_SHADCN_NAVI,
    PATH_SHADCN_SONNER,
    PATH_SHADCN_TABS,
    PATH_SHADCN_SKELTON,
    PATH_SHADCN_SEPARATOR,
    PATH_SHADCN_RESIZABLE,
    PATH_SHADCN_PROGRESS,
    PATH_SHADCN_POPOVER,
    PATH_SHADCN_PAGINATION,
    PATH_SHADCN_LABEL,
    PATH_SHADCN_INPUT,
    PATH_SHADCN_INPUT_OTP,
    PATH_SHADCN_RADIO,
    PATH_OTHER,
    PATH_OTHER_PARALLEL,
    PATH_OTHER_NO_PARALLEL,
    PATH_OTHER_INTERCEPT,
    PATH_OTHER_NO_INTERCEPT,
    PATH_SAMPLE,
    PATH_SAMPLE_DND,
    PATH_SAMPLE_FORM,
    PATH_SAMPLE_ROUTECACHE,
    PATH_SHADCN_ALERT,
    PATH_SHADCN_ALERT_DIALOG,
    PATH_SHADCN_BADGE,
    PATH_SHADCN_ASPECT,
    PATH_SHADCN_AVATAR,
    PATH_SHADCN_CALENDAR,
    PATH_SHADCN_CARD,
    PATH_SHADCN_CHART,
    PATH_SHADCN_BUTTON,
    PATH_SHADCN_BREADCRUMB,
    PATH_SHADCN_MENUBAR,
    PATH_SHADCN_HOVERCARD,
    PATH_SHADCN_DROPDOWN_MENU,
    PATH_SHADCN_DRAWER,
    PATH_SHADCN_DIALOG,
    PATH_SHADCN_DATA_TABLE,
    PATH_SHADCN_CONTEXT_MENU,
    PATH_SHADCN_COMMAND,
    PATH_SHADCN_COLLAPSIBLE,
    PATH_SHADCN_CAROUSEL
} from "@/lib/paths";
// 画像
import { ChevronDown } from "lucide-react";

type SideMenuPageType = {
    path: string;
    label: string;
};
type SideMenuStructType = {
    path: string;
    label: string;
    activeImage: React.ReactNode;
    inactiveImage: React.ReactNode;
    pages?: SideMenuPageType[];
};
type SideMenuStructsType = {
    dashboard: SideMenuStructType;
    // segment: SideMenuStructType;
    crud: SideMenuStructType;
    shadcn: SideMenuStructType;
    // other: SideMenuStructType;
    sample: SideMenuStructType;
};

const URL_FIRST_LAYER: number = 1;
const URL_SECOND_LAYER: number = 2;

// --------- group パス一覧 ----------- //
export const SEGMENT_PATH: string[] = [PATH_SEGMENT_LOAD, PATH_SEGMENT_NOTFOUND, PATH_SEGMENT_ROUTE].map(path => path.split("/")[URL_SECOND_LAYER]);

export const CRUD_PATH: string[] = [PATH_CRUD_FETCH, PATH_CRUD_SSR, PATH_CRUD_SSG, PATH_CRUD_ISR].map(path => path.split("/")[URL_SECOND_LAYER]);

export const SHADCN_PATH: string[] = [
    PATH_SHADCN_ACCORDION,
    PATH_SHADCN_TOGGLE,
    PATH_SHADCN_TOOTLIP,
    PATH_SHADCN_SWITCH,
    PATH_SHADCN_TABLE,
    PATH_SHADCN_SHEET,
    PATH_SHADCN_TOAST,
    PATH_SHADCN_SLIDER,
    PATH_SHADCN_SCROLL,
    PATH_SHADCN_NAVI,
    PATH_SHADCN_SONNER,
    PATH_SHADCN_TABS,
    PATH_SHADCN_SKELTON,
    PATH_SHADCN_SEPARATOR,
    PATH_SHADCN_RESIZABLE,
    PATH_SHADCN_PROGRESS,
    PATH_SHADCN_POPOVER,
    PATH_SHADCN_PAGINATION,
    PATH_SHADCN_LABEL,
    PATH_SHADCN_INPUT,
    PATH_SHADCN_INPUT_OTP,
    PATH_SHADCN_RADIO,
    PATH_SHADCN_ALERT,
    PATH_SHADCN_ALERT_DIALOG,
    PATH_SHADCN_BADGE,
    PATH_SHADCN_ASPECT,
    PATH_SHADCN_AVATAR,
    PATH_SHADCN_BREADCRUMB,
    PATH_SHADCN_CALENDAR,
    PATH_SHADCN_CARD,
    PATH_SHADCN_CHART,
    PATH_SHADCN_BUTTON,
    PATH_SHADCN_MENUBAR,
    PATH_SHADCN_HOVERCARD,
    PATH_SHADCN_DROPDOWN_MENU,
    PATH_SHADCN_DRAWER,
    PATH_SHADCN_DIALOG,
    PATH_SHADCN_DATA_TABLE,
    PATH_SHADCN_CONTEXT_MENU,
    PATH_SHADCN_COMMAND,
    PATH_SHADCN_COLLAPSIBLE,
    PATH_SHADCN_CAROUSEL
].map(path => path.split("/")[URL_SECOND_LAYER]);

export const OTHER_PATH: string[] = [PATH_OTHER_PARALLEL, PATH_OTHER_NO_PARALLEL, PATH_OTHER_INTERCEPT, PATH_OTHER_NO_INTERCEPT].map(path => path.split("/")[URL_SECOND_LAYER]);

export const SAMPLE_PATH: string[] = [PATH_SAMPLE, PATH_SAMPLE_DND, PATH_SAMPLE_FORM, PATH_SAMPLE_ROUTECACHE].map(path => path.split("/")[URL_SECOND_LAYER]);
/**
 * サイドバー情報
 */
const SIDE_MENU_STRUCTS: SideMenuStructsType = {
    dashboard: {
        path: PATH_DASHBOARD,
        label: "ダッシュボード",
        activeImage: <ChevronDown width={16} height={15} />,
        inactiveImage: <ChevronDown width={16} height={15} />
    },
    // segment: {
    //   path: PATH_SEGMENT,
    //   label: "segment file",
    //   activeImage: <ChevronDown width={16} height={15} />,
    //   inactiveImage: <ChevronDown width={16} height={15} />,
    //   pages: [
    //     {path: PATH_SEGMENT_LOAD,label: "loading"},
    //     {path: PATH_SEGMENT_NOTFOUND,label: "not-found"},
    //     {path: PATH_SEGMENT_ROUTE,label: "route"},
    //   ]
    // },
    crud: {
        path: PATH_CRUD,
        label: "crud",
        activeImage: <ChevronDown width={16} height={15} />,
        inactiveImage: <ChevronDown width={16} height={15} />,
        pages: [
            { path: PATH_CRUD_FETCH, label: "Fetch" },
            { path: PATH_CRUD_SSR, label: "SSR" },
            { path: PATH_CRUD_SSG, label: "SSG" },
            { path: PATH_CRUD_ISR, label: "ISR" }
        ]
    },
    shadcn: {
        path: PATH_SHADCN,
        label: "shadcn",
        activeImage: <ChevronDown width={16} height={15} />,
        inactiveImage: <ChevronDown width={16} height={15} />,
        pages: [
            { path: PATH_SHADCN_ACCORDION, label: "Accordion" },
            { path: PATH_SHADCN_ALERT, label: "ALERT" },
            { path: PATH_SHADCN_ALERT_DIALOG, label: "ALERT_DIALOG" },
            { path: PATH_SHADCN_AVATAR, label: "AVATAR" },
            { path: PATH_SHADCN_ASPECT, label: "ASPECT" },
            { path: PATH_SHADCN_BADGE, label: "BADGE" },
            { path: PATH_SHADCN_BREADCRUMB, label: "BREADCRUMB" },
            { path: PATH_SHADCN_BUTTON, label: "Button" },
            { path: PATH_SHADCN_CALENDAR, label: "Calendar" },
            { path: PATH_SHADCN_CARD, label: "Card" },
            { path: PATH_SHADCN_CAROUSEL, label: "Carousel" },
            { path: PATH_SHADCN_CHART, label: "Chart" },
            { path: PATH_SHADCN_COLLAPSIBLE, label: "Collapsible" },
            { path: PATH_SHADCN_COMMAND, label: "Command" },
            { path: PATH_SHADCN_CONTEXT_MENU, label: "Context Menu" },
            { path: PATH_SHADCN_DATA_TABLE, label: "Data Table" },
            { path: PATH_SHADCN_DIALOG, label: "Dialog" },
            { path: PATH_SHADCN_DRAWER, label: "Drawer" },
            { path: PATH_SHADCN_DROPDOWN_MENU, label: "Dropdown Menu" },
            { path: PATH_SHADCN_HOVERCARD, label: "Hover Card" },
            { path: PATH_SHADCN_INPUT, label: "Input" },
            { path: PATH_SHADCN_INPUT_OTP, label: "Input OTP" },
            { path: PATH_SHADCN_LABEL, label: "Label" },
            { path: PATH_SHADCN_MENUBAR, label: "Menubar" },
            { path: PATH_SHADCN_NAVI, label: "Navigation Menu" },
            { path: PATH_SHADCN_PAGINATION, label: "Pagination" },
            { path: PATH_SHADCN_POPOVER, label: "Popover" },
            { path: PATH_SHADCN_PROGRESS, label: "Progress" },
            { path: PATH_SHADCN_RADIO, label: "Radio" },
            { path: PATH_SHADCN_RESIZABLE, label: "Resizable" },
            { path: PATH_SHADCN_SCROLL, label: "Scroll" },
            { path: PATH_SHADCN_SEPARATOR, label: "Separator" },
            { path: PATH_SHADCN_SHEET, label: "Sheet" },
            { path: PATH_SHADCN_SKELTON, label: "Skelton" },
            { path: PATH_SHADCN_SLIDER, label: "Slider" },
            { path: PATH_SHADCN_SONNER, label: "Sonner" },
            { path: PATH_SHADCN_SWITCH, label: "Switch" },
            { path: PATH_SHADCN_TABLE, label: "Table" },
            { path: PATH_SHADCN_TABS, label: "Tabs" },
            { path: PATH_SHADCN_TOAST, label: "Toast" },
            { path: PATH_SHADCN_TOGGLE, label: "Toggle" },
            { path: PATH_SHADCN_TOOTLIP, label: "Tooltip" }
        ]
    },
    // other: {
    //   path: PATH_OTHER,
    //   label: "other",
    //   activeImage: <ChevronDown width={16} height={15} />,
    //   inactiveImage: <ChevronDown width={16} height={15} />,
    //   pages: [
    //     {path: PATH_OTHER_PARALLEL,label: "parallel"},
    //     {path: PATH_OTHER_NO_PARALLEL,label: "no_parallel"},
    //     {path: PATH_OTHER_INTERCEPT,label: "intercept"},
    //     {path: PATH_OTHER_NO_INTERCEPT,label: "no_intercept"},
    //   ]
    // }
    sample: {
        path: PATH_SAMPLE,
        label: "sample",
        activeImage: <ChevronDown width={16} height={15} />,
        inactiveImage: <ChevronDown width={16} height={15} />,
        pages: [
            { path: PATH_SAMPLE_DND, label: "Drag and Drop" },
            { path: PATH_SAMPLE_FORM, label: "Hook-Form" },
            { path: PATH_SAMPLE_ROUTECACHE, label: "Route Cache" }
        ]
    }
};

export const Sidebar = () => {
    const [sidebarMenu, setSidebarMenu] = useState({ firstMenu: "", secondMenu: "" });
    const triggerCss = "flex items-center justify-between px-3 py-3 text-base font-bold rounded-md cursor-pointer w-full";
    const contentCss = "px-4 py-2 rounded-md cursor-pointer ";
    const router = useRouter();
    const path = usePathname();

    const accordionTriger = (path: string, label: string, icon: boolean, activeImage: React.ReactNode, inactiveImage: React.ReactNode): React.ReactNode => {
        return (
            <>
                <div
                    className={`flex items-center w-full ${triggerCss} + ${sidebarMenu.firstMenu === path ? "text-white bg-black" : "text-black"}`}
                    // allow icon 不要なトリガーにはpageを持たせているのでクリックイベント付与
                    onClick={() => !icon && router.push(makePath(path))}
                >
                    <div className="flex items-center gap-x-2">
                        {/* {sidebarMenu.firstMenu === path ? activeImage : inactiveImage} */}
                        {label}
                    </div>
                    {icon && <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />}
                </div>
            </>
        );
    };

    const accordionContent = (pages: { path: string; label: string }[]): React.ReactNode => {
        return (
            <div className={`pl-9 w-full py-1`}>
                {pages.map(page => {
                    return (
                        <div
                            key={page.path}
                            onClick={() => router.push(makePath(page.path))}
                            className={`
                ${contentCss}  
                ${sidebarMenu.secondMenu === page.path.split("/")[URL_SECOND_LAYER] ? "bg-gray-200" : "bg-white"}
              `}
                        >
                            <p className="font-bold text-sm text-RT-dark-blue">{page.label}</p>
                        </div>
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        const tmpPath = path.split("/")[URL_SECOND_LAYER];
        if (CRUD_PATH.includes(tmpPath)) {
            setSidebarMenu({ firstMenu: SIDE_MENU_STRUCTS.crud.path, secondMenu: tmpPath });
        }
        // else if (SEGMENT_PATH.includes(tmpPath)) {
        //   setSidebarMenu({ firstMenu: SIDE_MENU_STRUCTS.segment.path, secondMenu: tmpPath });
        // }
        else if (SHADCN_PATH.includes(tmpPath)) {
            setSidebarMenu({ firstMenu: SIDE_MENU_STRUCTS.shadcn.path, secondMenu: tmpPath });
        }
        // else if (OTHER_PATH.includes(tmpPath)) {
        //   setSidebarMenu({ firstMenu: SIDE_MENU_STRUCTS.other.path, secondMenu: tmpPath });
        // }
        else if (SAMPLE_PATH.includes(tmpPath)) {
            setSidebarMenu({ firstMenu: SIDE_MENU_STRUCTS.sample.path, secondMenu: tmpPath });
        } else if (PATH_DASHBOARD === path) {
            setSidebarMenu({ firstMenu: SIDE_MENU_STRUCTS.dashboard.path, secondMenu: "" });
        } else {
            setSidebarMenu({ firstMenu: "", secondMenu: "" });
        }
    }, [path, setSidebarMenu]);

    return (
        <div className="flex flex-col w-64 px-4 bg-white h-screen overflow-y-scroll">
            <MultipleAccordion
                accordionCss="overflow-y-scroll"
                items={[
                    {
                        value: SIDE_MENU_STRUCTS.dashboard.path,
                        children: accordionTriger(
                            SIDE_MENU_STRUCTS.dashboard.path,
                            SIDE_MENU_STRUCTS.dashboard.label,
                            false,
                            SIDE_MENU_STRUCTS.dashboard.activeImage,
                            SIDE_MENU_STRUCTS.dashboard.inactiveImage
                        )
                    },
                    // {
                    //   value: SIDE_MENU_STRUCTS.segment.path,
                    //   children: accordionTriger(
                    //     SIDE_MENU_STRUCTS.segment.path,
                    //     SIDE_MENU_STRUCTS.segment.label,
                    //     true,
                    //     SIDE_MENU_STRUCTS.segment.activeImage,
                    //     SIDE_MENU_STRUCTS.segment.inactiveImage
                    //   ),
                    //   content: () => SIDE_MENU_STRUCTS.segment.pages && accordionContent(SIDE_MENU_STRUCTS.segment.pages)
                    // },
                    {
                        value: SIDE_MENU_STRUCTS.crud.path,
                        children: accordionTriger(
                            SIDE_MENU_STRUCTS.crud.path,
                            SIDE_MENU_STRUCTS.crud.label,
                            true,
                            SIDE_MENU_STRUCTS.crud.activeImage,
                            SIDE_MENU_STRUCTS.crud.inactiveImage
                        ),
                        content: () => SIDE_MENU_STRUCTS.crud.pages && accordionContent(SIDE_MENU_STRUCTS.crud.pages)
                    },
                    {
                        value: SIDE_MENU_STRUCTS.shadcn.path,
                        children: accordionTriger(
                            SIDE_MENU_STRUCTS.shadcn.path,
                            SIDE_MENU_STRUCTS.shadcn.label,
                            true,
                            SIDE_MENU_STRUCTS.shadcn.activeImage,
                            SIDE_MENU_STRUCTS.shadcn.inactiveImage
                        ),
                        content: () => SIDE_MENU_STRUCTS.shadcn.pages && accordionContent(SIDE_MENU_STRUCTS.shadcn.pages)
                    },
                    // {
                    //   value: SIDE_MENU_STRUCTS.other.path,
                    //   children: accordionTriger(
                    //     SIDE_MENU_STRUCTS.other.path,
                    //     SIDE_MENU_STRUCTS.other.label,
                    //     true,
                    //     SIDE_MENU_STRUCTS.other.activeImage,
                    //     SIDE_MENU_STRUCTS.other.inactiveImage
                    //   ),
                    //   content: () => SIDE_MENU_STRUCTS.other.pages && accordionContent(SIDE_MENU_STRUCTS.other.pages)
                    // },
                    {
                        value: SIDE_MENU_STRUCTS.sample.path,
                        children: accordionTriger(
                            SIDE_MENU_STRUCTS.sample.path,
                            SIDE_MENU_STRUCTS.sample.label,
                            true,
                            SIDE_MENU_STRUCTS.sample.activeImage,
                            SIDE_MENU_STRUCTS.sample.inactiveImage
                        ),
                        content: () => SIDE_MENU_STRUCTS.sample.pages && accordionContent(SIDE_MENU_STRUCTS.sample.pages)
                    }
                ]}
            />
        </div>
    );
};

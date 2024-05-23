import { LayoutDefaultComponent } from '../layout-default/layout-default.component';


export const ModuleDataAdmin: Array<any> = [
    //PARTNER
    {
        Code: 'config',
        Name: 'CẤU HÌNH',
        Link: 'config/config001-hamper-detail',
        Path: 'config',
        LoadChildren: () => import('../../in-config/in-config.module').then(m => m.InConfigModule),
        // component: LayoutDefaultComponent,
        ListMenu: [
            {
                Name: "Quản lý sản phẩm",
                Code: "config001-product-management",
                Link: "/config/config001-hamper-detail",
                Type: 'group',
                Icon:'k-i-files',
                ModuleID: "config001-hamper-detail",
                Actived: false,
                disabled: false,
                LstChild: [
                    {
                        Name: "Chi tiết hamper",
                        Code: "config001-hamper-detail",
                        Link: "/config/config001-hamper-detail",
                        Type: 'function',
                        ModuleID: "config001-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    },
                    {
                        Name: "Chi tiết hamper",
                        Code: "config002-hamper-detail",
                        Link: "/config/config002-hamper-detail",
                        Type: 'function',
                        ModuleID: "config002-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    },
                    {
                        Name: "Chi tiết hamper",
                        Code: "config003-hamper-detail",
                        Link: "/config/config003-hamper-detail",
                        Type: 'function',
                        ModuleID: "config003-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    },
                    {
                        Name: "Chi tiết hamper",
                        Code: "config004-hamper-detail",
                        Link: "/config/config004-hamper-detail",
                        Type: 'function',
                        ModuleID: "config004-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    },
                    {
                        Name: "Chi tiết hamper",
                        Code: "config005-hamper-detail",
                        Link: "/config/config005-hamper-detail",
                        Type: 'function',
                        ModuleID: "config005-hamper-detail",
                        Parent: "Quản lý sản phẩm",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    }
                ]
                
            },
            {
                Name: "Quản lý đối tác",
                Code: "config002-partner-management",
                Link: "/config/config002-partner-management",
                Type: 'function',
                Icon:'k-i-files',
                ModuleID: "config002-partner-management",
                Actived: false,
                disabled: false,
                LstChild: []
            },
            {
                Name: "Quản trị hệ thống",
                Code: "config001-system-management",
                Link: "/config/config001-authorization",
                Type: 'group',
                Icon:'k-i-files',
                ModuleID: "config001-authorization",
                Actived: false,
                disabled: false,
                LstChild: [
                    {
                        Name: "Phân quyền",
                        Code: "config001-authorization",
                        Link: "/config/config001-authorization",
                        Type: 'function',
                        ModuleID: "config001-authorization",
                        Parent: "Quản trị hệ thống",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    }
                ]
                
            },

        ]
    },
    {
        Code: 'hri',
        Name: 'NHÂN SỰ',
        Link: 'hri/hri001-evaluation-list',
        Path: 'hri',
        LoadChildren: () => import('../../in-hri/in-hri.module').then(m => m.InHriModule),
        // component: LayoutDefaultComponent,
        ListMenu: [
            {
                Name: "Đợt đánh giá",
                Code: "chri001-evaluation-list",
                Link: "/hri/hri001-evaluation-list",
                Type: 'group',
                Icon:'k-i-files',
                ModuleID: "hri001-evaluation-list", 
                Actived: false,
                disabled: false,
                LstChild: [
                    {
                        Name: "Danh sách đợt đánh giá",
                        Code: "hri001-evaluation-list",
                        Link: "/hri/hri001-evaluation-list",
                        Type: 'function',
                        ModuleID: "hri001-evaluation-list",
                        Parent: "Đợt đánh giá",
                        LstChild: [],
                        Actived: false,
                        disabled: false,
                    }
                ]
                
            },
        ]
    }
]
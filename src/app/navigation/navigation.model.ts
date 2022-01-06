import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';
import { Constants } from '../shared/constants';

export class FuseNavigationModel implements FuseNavigationModelInterface {
    public model: any[];
    

    constructor(model: any[]) {
        let isAdmin = localStorage.getItem("admin")
        if (isAdmin == 'true') {

            this.model = [
                {
                    id: "applications",
                    translate: "NAV.Personal",
                    type: "group",
                    children: [
                        // {
                        //     id: "user",
                        //     translate: "Thông tin cá nhân",
                        //     icon: "account_circle",
                        //     type: "item",
                        //     url: "/information/student-info",
                        // },
                        {
                            id: "user",
                            translate: "Danh sách lớp sinh viên",
                            icon: "supervisor_account",
                            type: "item",
                            url: "/student-manager/student-list",
                        },
                    
                    ],
                },
    
                {
                    id: "applications",
                    translate: "NAV.System",
                    type: "group",
                    children: [
                        {
                            id: "menu",
                            translate: "Danh mục học phần",
                            type: "item",
                            icon: "list",
                            url: "/student-manager/subject-list",
                        },
                        
                    ],
                },
            ];

        } else {
            this.model = [
                // {
                //     'id': 'applications',
                //     'translate': 'NAV.Personal',
                //     'type': 'group',
                //     'children': [
                //         {
                //         'id': 'user',
                //         'translate': 'Thông tin cá nhân',
                //         'icon': 'account_circle',
                //         'type': 'item',
                //         'url': '/information/student-info'
                //     },
                  
                //     ]
                // },

                {
                    'id': 'applications',
                    'translate': 'NAV.System',
                    'type': 'group',
                    'children': [
                        {
                            'id': 'menu',
                            'translate': 'Danh mục học phần',
                            'type': 'item',
                            'icon': 'list',
                            'url': '/student-manager/subject-list'
                        },
                        {
                            id: "menu",
                            translate: "Đăng kí học tập",
                            type: "item",
                            icon: "playlist_add_check_circle",
                            url: "/information/subject-join",
                        }
                    ]
                },
            ];
        }
    }

}


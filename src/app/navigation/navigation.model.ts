import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';
import { Constants } from '../shared/constants';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor(model: any[])
    {
        this.model = [
            {
                'id'      : 'applications',
                'translate': 'NAV.Personal',
                'type'    : 'group',
                'children': [{
                    'id'   : 'user',
                    'translate': 'Thông tin cá nhân',
                    'icon': 'account_circle',
                    'type' : 'item',
                    'url'  : '/information/student-info'
                },
                // {
                //     'id'   : 'menu',
                //     'translate': 'Thông tin chức năng',
                //     'type' : 'item',
                //     'icon': 'apps',
                //     'url'  : '/information/system-info'
                // },
                // {
                //     'id'   : 'menu',
                //     'translate': 'Đăng kí học phần',
                //     'type' : 'item',
                //     'icon': 'apps',
                //     'url'  : '/student-manager/subject-subscribe'
                // },
                
                {
                    'id'   : 'menu',
                    'translate': 'Học phần đã đăng kí',
                    'type' : 'item',
                    'icon': 'playlist_add_check_circle',
                    'url'  : '/information/subject-join'
                }]
            },

            {
                'id'      : 'applications',
                'translate': 'NAV.System',
                'type'    : 'group',
                'children': [{
                    'id'   : 'user',
                    'translate': 'Danh sách lớp sinh viên',
                    'icon': 'supervisor_account',
                    'type' : 'item',
                    'url'  : '/student-manager/student-list'
                },
                {
                    'id'   : 'menu',
                    'translate': 'Danh mục học phần',
                    'type' : 'item',
                    'icon': 'list',
                    'url'  : '/student-manager/subject-list'
                },
                // {
                //     'id'   : 'menu',
                //     'translate': 'Đăng kí học phần',
                //     'type' : 'item',
                //     'icon': 'apps',
                //     'url'  : '/student-manager/subject-subscribe'
                // },
            ]
            },
        ];
    }
    
}

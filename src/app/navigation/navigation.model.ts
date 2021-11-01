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
                    'translate': 'Danh sách môn học',
                    'type' : 'item',
                    'icon': 'apps',
                    'url'  : '/student-manager/subject-list'
                },
                ]
            },
        ];
    }
    public static getPublicModel(): FuseNavigationModel {
        return new FuseNavigationModel(FuseNavigationModel.publicModel);
    }

    private static publicModel = [
        {
            'id'      : 'applications',
            'translate': 'NAV.APPLICATIONS',
            'type'    : 'group',
            'children': [{
                'id'   : 'intro',
                'translate': 'User.Title',
                'type' : 'item',
                'url'  : '/admin/user-manager'
            }]
        }
    ];
}

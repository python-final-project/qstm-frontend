
import ApiUrl from '../constants/url';


export async function getSitesByStudentId(id) {
    const url = ApiUrl.BASE + ApiUrl.SITE + `?student_id=${id}`

    const response = await fetch(url);
    const data = await response.json()
    
    return data
};


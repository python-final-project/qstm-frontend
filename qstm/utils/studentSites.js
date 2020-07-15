

export async function getSitesByStudentId(id) {
    const url = `http://ec2-18-191-129-83.us-east-2.compute.amazonaws.com/api/v1/sites/?student_id=${id}`

    const response = await fetch(url);
    const data = await response.json()
    
    return data
};


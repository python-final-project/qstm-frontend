
export async function apiConfigBuilder() {

    let token = window.localStorage.getItem('token');
    console.log(token.access)

    const config = {
        headers: { Authorization: `Bearer ${token.access}` }
    };

    return config
};


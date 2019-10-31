import axios from 'axios'
async function checkRoleId(token) {
    let result;
    await axios.get("/user/getRoleId", {
        params: {
            token: token
        }
    }).then(response => {
        result=response.data.isSuccess
    }
    )
    return result
}
export {
    checkRoleId,
}
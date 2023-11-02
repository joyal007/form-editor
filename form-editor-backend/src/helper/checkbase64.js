export const check = (data) => {
    if(data && data.startsWith("data:image/jpeg;base64,")){
        return true
    }
    return false
}
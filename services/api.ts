import axios from "axios"

export const generateImage = async ({ formData }: { formData: any }) => {
    return await axios({
        url: "http://localhost:5000/api/tryon",
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData
    })
}
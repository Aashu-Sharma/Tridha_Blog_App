
// const adminEmails = [
//   "sujalsharma7804@gmail.com",
//   "pranprakashsharma@gmail.com",
//   "shivangi2020jyotish@gmail.com",
// ];

const adminEmails = [
    import.meta.env.VITE_APPWRITE_EMAIL1,
    import.meta.env.VITE_APPWRITE_EMAIL2,
    import.meta.env.VITE_APPWRITE_EMAIL3,
]

function isAdmin(email) {
    if(!adminEmails.includes(email)){
        return false;
    }else{
        return true;
    }
}

export default isAdmin;
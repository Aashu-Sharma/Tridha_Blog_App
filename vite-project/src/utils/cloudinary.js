import { data } from "react-router-dom";

async function uploadOnCloudinary(file) {
  try {
    const data = new FormData();
    console.log("file: ", file);

    data.append("file", file);
    data.append("upload_preset", "Tridha_Meditation_Blogs");
    data.append("cloud_name", "dhxa3rrhs");

    console.log("Data: ", data);

    if (!data) throw new Error("sorry there is no data to upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhxa3rrhs/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    // console.log("UploadImageUrl: ", res.json());
    return res.json();
  } catch (error) {
    console.log("Couldn't upload image to cloudinary!!!");
  }
}

export { uploadOnCloudinary};

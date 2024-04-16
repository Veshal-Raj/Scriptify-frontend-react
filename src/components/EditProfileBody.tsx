import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Typography, TextField, Button } from "@mui/material";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../utils/firebase";
import { useMutation } from "@tanstack/react-query";
import { EditProfileDataApi } from "../api/user";
import { CircularProgress } from "@mui/material";
import { setUser } from "../redux/slice/userSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";

const EditProfileBody = () => {
    const { userData } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const personalInfo = userData.personal_info;
    const socialLinks = userData.social_links;
    const userId = userData._id

    const [editedSocialLinks, setEditedSocialLinks] = useState(socialLinks);
    const [editedPersonalInfo, setEditedPersonalInfo] = useState(personalInfo)
    const fileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState(undefined)
    const [imagePercentage, setImagePercentage] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (image) {
            handleFileUpload(image)
        }
    }, [image])

    const { mutate: EditProfileData } = useMutation({
        mutationFn: EditProfileDataApi,
        onMutate: ()=>{
            setIsLoading(true)
        },
        onSuccess: (response)=> {
            console.log('profile edit success')
            console.log(response.data.response)
            dispatch(setUser(response.data.response));
            setIsLoading(false)
            toast.success('Profile edited successfully')
        },
        onError: (error: AxiosError | unknown ) => {
            console.log(error)
            setIsLoading(false)
            if (error instanceof AxiosError) {
                const message = error.response?.data?.error as string
                toast.error(message)
            } else {
                toast.error((error as Error).message || 'An unknown error occurred')
            }
        }
    })

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        // toast.warning('hi')
        if (name === "username" || name === "email" || name === "bio") {
            if (value.length > 200) {
                toast.warning('Bio must be maximum 200 characters');
                return;
            }
    
            setEditedPersonalInfo((prevState: Record<string, string>) => ({
                ...prevState,
                [name]: value.trim()
            }));
        } else {
            setEditedSocialLinks(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files
        if (files) {
            const fileToUpload = files[0]
            console.log('file upload...', fileToUpload)
            setImage(fileToUpload)
        }
    }

    const handleFileUpload = async (image) => {
        console.log('image --- ', image)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setImagePercentage(Math.round(progress));
            },
            (error) => {
                console.error(error);

                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('donwloading...', downloadURL)
                    setUploadedImage(downloadURL)
                })

            }
        )

    }

    const handleSave = () => {
        // Combine updated personal info and social links
        const trimmedUsername = editedPersonalInfo.username.trim();
    const trimmedEmail = editedPersonalInfo.email.trim();
    console.log(editedPersonalInfo)
    console.log(editedPersonalInfo.bio)
    console.log(editedPersonalInfo.bio.length)
    if (editedPersonalInfo.bio.length >200) {
        toast.error('Bio must be maximum 200 characters')
        return
    }
    if (trimmedUsername === "" || trimmedEmail === "") {
        // Show error message or handle invalid input
        console.error("Name and email cannot be empty");
        toast.error("Name and email cannot be empty")
        return;
    }
        const updatedUserData = {
            personal_info: editedPersonalInfo,
            social_links: editedSocialLinks,
            ...(uploadedImage && { uploaded_image: uploadedImage }),
            userId
        };

        // Logging updated user data
        console.log('updated userData --- ',updatedUserData);
        EditProfileData(updatedUserData)
    }

    return (
        <Box p={4}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <label htmlFor="profileImage " className=" items-center flex justify-center flex-col">
                    <Avatar
                        alt={editedPersonalInfo.username}
                        src={uploadedImage || editedPersonalInfo.profile_img}
                        sx={{ width: 100, height: 100, cursor: 'pointer', borderRadius: '50%',  border: '2px solid #2E8B57'  }}
                        onClick={() => { fileRef?.current?.click(); }}
                    />
                    <p className="text-sm self-center  text-center mx-auto">
                        {imageError ? (
                            <span className="text-red-700">
                                Error uploading image (file size must be less than 2 MB)
                            </span>
                        ) : imagePercentage > 0 && imagePercentage < 100 ? (
                            <span className="text-slate-700">{`Uploading: ${imagePercentage} %`}</span>
                        ) : imagePercentage === 100 ? (
                            <span className="text-green-700">Image uploaded successfully</span>
                        ) : (
                            ""
                        )}
                    </p>
                </label>
                <input id="profileImage" ref={fileRef} type="file" accept=".png, .jpg, .jpeg, .webp" style={{ display: 'none' }} onChange={handleImage} />
                <Box mt={2}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        name="username"
                        defaultValue={editedPersonalInfo.username}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        defaultValue={editedPersonalInfo.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        label="Bio"
                        variant="outlined"
                        fullWidth
                        name="bio"
                        defaultValue={editedPersonalInfo.bio || 'Type your bio...'}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Typography variant="h5" mb={2}>Social Links:</Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                        <TextField
                            label="YouTube"
                            variant="outlined"
                            fullWidth
                            name="youtube"
                            defaultValue={editedSocialLinks.youtube || 'https://youtube.com/username'}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Instagram"
                            variant="outlined"
                            fullWidth
                            name="instagram"
                            defaultValue={editedSocialLinks.instagram || 'https://instagram.com/username'}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Facebook"
                            variant="outlined"
                            fullWidth
                            name="facebook"
                            defaultValue={editedSocialLinks.facebook || 'https://facebook.com/username'}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Twitter"
                            variant="outlined"
                            fullWidth
                            name="twitter"
                            defaultValue={editedSocialLinks.twitter || 'https://twitter.com/username'}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="GitHub"
                            variant="outlined"
                            fullWidth
                            name="github"
                            defaultValue={editedSocialLinks.github || 'https://github.com/username'}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            label="Website"
                            variant="outlined"
                            fullWidth
                            name="website"
                            defaultValue={editedSocialLinks.website || 'https://website.com'}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <Button variant="contained" disabled={isLoading} fullWidth onClick={handleSave} sx={{ bgcolor: '#007bff', color: "white", px: 2, py: 1, mx: 2, my: 1 }}>
                            {isLoading ? <CircularProgress size={24} color="inherit" />: "Save"}</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default EditProfileBody;

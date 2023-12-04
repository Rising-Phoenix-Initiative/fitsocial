import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { uploadImage, deleteOldImage } from "../../services/posts.service"; // Adjust the import based on your project structure
import { Typography } from "@mui/material";

type EditPostProps = {
    post: {
        text: string;
        imageUrl?: string;
    };
    onEditSubmit: (editedContent: string, newImageUrl?: string) => void;
    onEditClose: () => void;
    editSubmitting: boolean;
};

const EditPost: React.FC<EditPostProps> = ({
    post,
    onEditSubmit,
    onEditClose,
    editSubmitting,
}) => {
    const [editedContent, setEditedContent] = useState<string>(post.text);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditedContent(event.target.value);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setNewImageFile(event.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        setIsUploading(true);
        let newImageUrl = post.imageUrl;

        if (newImageFile) {
            if (post.imageUrl) {
                await deleteOldImage(post.imageUrl); // Function to delete the old image from storage
            }
            newImageUrl = await uploadImage(newImageFile); // Function to upload new image and return the URL
        }

        onEditSubmit(editedContent, newImageUrl);
        setIsUploading(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                my: 3,
            }}
        >
            {/* Post Content Editing */}
            <TextField
                onChange={handleContentChange}
                value={editedContent}
                autoFocus
                margin="dense"
                id="post"
                label="Edit Post"
                type="text"
                fullWidth
                multiline
                rows={4}
            />

            {/* Image Upload */}
            <Box sx={{ my: 2 }}>
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                />
                {newImageFile && <Typography>{newImageFile.name}</Typography>}
            </Box>

            {/* Action Buttons */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 3,
                }}
            >
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={editSubmitting || isUploading}
                    sx={{ fontSize: "0.9rem", fontWeight: "700" }}
                >
                    Save
                </Button>
                <Button
                    onClick={onEditClose}
                    variant="outlined"
                    color="error"
                    disabled={editSubmitting || isUploading}
                    sx={{
                        fontSize: "0.9rem",
                        fontWeight: "700",
                        ml: 2,
                        "&:hover": {
                            backgroundColor: "#f7fff722",
                        },
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default EditPost;

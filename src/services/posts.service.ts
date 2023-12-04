import { db, storage } from "./firebase";
import {
    doc,
    runTransaction,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    Timestamp,
    getDoc,
    deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserDocument } from "../features/user/_types/User";

export type PostDocument = {
    id?: string | undefined;
    postId: string;
    userId: string; // Reference to UserDocument's uid
    createdAt: Date;
    updatedAt: Date;
    content: string;
    imageUrl?: string | undefined; // URL of an image if the post includes media
    likesCount: number; // Total number of likes
    commentsCount: number; // Total number of comments
    likedBy: string[]; // Array of user IDs who liked the post
    comments: CommentDocument[]; // Array of comments
};

type CommentDocument = {
    commentId: string;
    userId: string; // Reference to UserDocument's uid
    content: string;
    createdAt: Date;
};

const addRecentLikedPostToUser = async (userId: string, postId: string) => {
    const userRef = doc(db, "users", userId);

    await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        const userData = userDoc.data() as UserDocument;
        let recentLikedPosts = userData.recentLikedPosts || [];

        recentLikedPosts.unshift(postId);
        recentLikedPosts = recentLikedPosts.slice(0, 10);

        transaction.update(userRef, { recentLikedPosts });
    });
};

const likePost = async (userId: string, postId: string) => {
    const postRef = doc(db, "posts_collection", postId);

    await updateDoc(postRef, {
        likedBy: arrayUnion(userId),
    });

    await addRecentLikedPostToUser(userId, postId);
};

const unlikePost = async (userId: string, postId: string) => {
    const postRef = doc(db, "posts_collection", postId);

    await updateDoc(postRef, {
        likedBy: arrayRemove(userId),
    });
};

const fetchLikedPosts = async (userId: string) => {
    const postsQuery = query(
        collection(db, "posts_collection"),
        where("likedBy", "array-contains", userId)
    );
    const postsSnapshot = await getDocs(postsQuery);

    return postsSnapshot.docs.map((doc) => ({
        ...(doc.data() as PostDocument),
        id: doc.id,
    }));
};

// Function to create a new post
const createPost = async (
    userId: string,
    content: string,
    file?: File
): Promise<PostDocument> => {
    let imageUrl = "";
    if (file) {
        imageUrl = await uploadImage(file);
    }

    const now = Timestamp.now();
    const newPostRef = doc(collection(db, "posts_collection"));
    const newPost: PostDocument = {
        postId: newPostRef.id,
        userId,
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
        content,
        imageUrl,
        likesCount: 0,
        commentsCount: 0,
        likedBy: [],
        comments: [],
    };

    await setDoc(newPostRef, newPost);

    return newPost;
};

// Upload Image to Firebase Storage and return the URL
const uploadImage = async (file: File): Promise<string> => {
    if (!file) {
        throw new Error("No file to upload.");
    }

    const storageRef = ref(storage, `post-images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
};

const getPosts = async (): Promise<PostDocument[]> => {
    const postsSnapshot = await getDocs(collection(db, "posts_collection"));
    return postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as PostDocument),
    }));
};

const getPostById = async (postId: string): Promise<PostDocument> => {
    const postRef = doc(db, "posts_collection", postId);
    const postSnapshot = await getDoc(postRef);
    return { id: postSnapshot.id, ...(postSnapshot.data() as PostDocument) };
};

const updatePost = async (
    postId: string,
    content: string,
    imageUrl?: string
) => {
    const postRef = doc(db, "posts_collection", postId);
    await updateDoc(postRef, {
        content,
        imageUrl,
        updatedAt: Timestamp.now().toDate(),
    });
    const updatedPostSnapshot = await getDoc(postRef);
    return {
        id: updatedPostSnapshot.id,
        ...(updatedPostSnapshot.data() as PostDocument),
    };
};

const deletePost = async (postId: string) => {
    const postRef = doc(db, "posts_collection", postId);
    await deleteDoc(postRef);
};

export {
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    fetchLikedPosts,
    uploadImage,
    createPost,
};

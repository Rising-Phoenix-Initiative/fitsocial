import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
    FC,
} from "react";
import * as postService from "../services/posts.service";

type PostsContextType = {
    newPostOpen: boolean;
    openNewPost: () => void;
    closeNewPost: () => void;
    posts: postService.PostDocument[];
    postsLoading: boolean;
    createPost: (userId: string, content: string, file?: File) => Promise<void>;
    submitting: boolean;
    fetchPostById: (postId: string) => Promise<void>;
    updatePost: (
        postId: string,
        postContent: postService.PostDocument
    ) => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
    addLikeToPost: (postId: string, userId: string) => Promise<void>;
    removeLikeFromPost: (postId: string, userId: string) => Promise<void>;
    error: string | null;
};

const initialContext: PostsContextType = {
    newPostOpen: false,
    openNewPost: () => {},
    closeNewPost: () => {},
    posts: [],
    postsLoading: true,
    createPost: async () => {},
    submitting: false,
    fetchPostById: async () => {},
    updatePost: async () => {},
    deletePost: async () => {},
    addLikeToPost: async () => {},
    removeLikeFromPost: async () => {},
    error: null,
};

export const PostsContext = createContext<PostsContextType>(initialContext);

type PostsProviderProps = {
    children: ReactNode;
};
const PostsProvider: FC<PostsProviderProps> = ({ children }) => {
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [posts, setPosts] = useState<postService.PostDocument[]>([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const openNewPost = () => {
        setNewPostOpen(true);
    };

    const closeNewPost = () => {
        setNewPostOpen(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const fetchedPosts = await postService.getPosts();
            setPosts(fetchedPosts);
            setPostsLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
            setPostsLoading(false);
        }
    };

    const createPost = async (userId: string, content: string, file?: File) => {
        setSubmitting(true);
        try {
            const newPost = await postService.createPost(userId, content, file);
            setSubmitting(false);
            setPosts([newPost, ...posts]);
        } catch (error) {
            setSubmitting(false);
            const err = error as Error;
            console.error("Create Post Error:", err.message);
            setError(err.message);
        }
    };

    const fetchPostById = async (postId: string) => {
        try {
            const fetchedPost = await postService.getPostById(postId);
            setPosts([fetchedPost]); // Assuming you want to replace the posts array with the single fetched post
        } catch (error) {
            const err = error as Error;
            console.error(err.message);
            setError(err.message);
        }
    };

    const updatePost = async (
        postId: string,
        postContent: postService.PostDocument
    ) => {
        try {
            const updatedPost = await postService.updatePost(
                postId,
                postContent.content,
                postContent.imageUrl
            );
            setPosts(
                posts.map((post) => (post.id === postId ? updatedPost : post))
            );
        } catch (error) {
            const err = error as Error;
            console.error(err.message);
            setError(err.message);
        }
    };

    const deletePost = async (postId: string) => {
        try {
            await postService.deletePost(postId);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            const err = error as Error;
            console.error(err.message);
            setError(err.message);
        }
    };

    const addLikeToPost = async (postId: string, userId: string) => {
        try {
            const updatedPost: any = await postService.likePost(postId, userId);
            if (updatedPost) {
                setPosts(
                    posts.map((post) =>
                        post.id === postId ? updatedPost : post
                    )
                );
            }
        } catch (error) {
            const err = error as Error;
            console.error(err.message);
            setError(err.message);
        }
    };

    const removeLikeFromPost = async (postId: string, userId: string) => {
        try {
            const updatedPost: any = await postService.unlikePost(
                postId,
                userId
            );
            if (updatedPost) {
                setPosts(
                    posts.map((post) =>
                        post.id === postId ? updatedPost : post
                    )
                );
            }
        } catch (error) {
            const err = error as Error;
            console.error(err.message);
            setError(err.message);
        }
    };

    return (
        <PostsContext.Provider
            value={{
                newPostOpen,
                openNewPost,
                closeNewPost,
                posts,
                postsLoading,
                createPost,
                submitting,
                fetchPostById,
                updatePost,
                deletePost,
                addLikeToPost,
                removeLikeFromPost,
                error,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);

export default PostsProvider;

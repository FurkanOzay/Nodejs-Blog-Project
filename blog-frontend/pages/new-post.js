import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';
import styles from './new-post.module.css';

// React Quill editörünü dinamik olarak yükler (SSR desteklenmez)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        console.log('Title:', title);
        console.log('Content:', content);

        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content, authorId: 1, categoryId: 1 }) // authorId ve categoryId örnek olarak verildi
            });
            console.log('Response status:', res.status);

            if (res.ok) {
                const data = await res.json();
                console.log('Post created successfully:', data);
                router.push('/');
            } else {
                console.error('Failed to create post:', res.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Create New Post</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="title" className={styles.label}>Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="content" className={styles.label}>Content:</label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        className={styles.qlContainer}
                    />
                </div>
                <button type="submit" className={styles.button}>Create Post</button>
            </form>
        </div>
    );
};

export default NewPost;
